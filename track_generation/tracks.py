from time import time
import datetime as datetime
import numpy as np
import pandas as pd
import folium, inflect


def create_hurricane_dict(file_name):

    df = pd.read_csv(file_name, usecols=list(range(0, 8)))
    df.index = list(range(0, len(df.index)))
    hur_dict = {}
    for row in df.index:
        dates = df.iloc[row, 0]
        if dates[0:2] in ["AL", "CP", "EP", "WP"]:
            year = dates[-4:]
            if year not in hur_dict:
                hur_dict[year] = []
            storm_duration = df.iloc[row, 2]
            hur_dict[year].append(df.iloc[row:row+int(storm_duration)+1, ])
    return hur_dict


def hurricane_tracks(region, hur_dict, year):

    if region == "westpacific":
        map_loc = [35.5, -210.5]
    if region == "eastpacific":
        map_loc = [35.5, -145.5]
    if region == "atlantic":
        map_loc = [40.5, -50.5]
 
    m = folium.Map(location=map_loc, tiles=None, zoom_start=4)
    folium.TileLayer("cartodbpositron", name="Map").add_to(m)
    folium.TileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                     attr="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, \
                     IGN, IGP, UPR-EGP, and the GIS User Community", name="Satellite").add_to(m)
    
    # For each storm in the requested year
    for storm in hur_dict[str(year)]:

        # Storm name information is stored on the first row of the storm block
        if storm.iloc[0, 1].strip() == "UNNAMED":
            id_string = storm.iloc[0, 0][2:4]
            if id_string[0] == "0":
                storm_name = ife.number_to_words(id_string[1]).upper().strip()
            else:
                storm_name = ife.number_to_words(id_string).upper().strip()
        else:
            storm_name = storm.iloc[0, 1].strip()
        storm_layer = folium.FeatureGroup(name=storm_name) # Each storm layer denotes a storm for a year

        # These lists will contain the data that will be plotted on the map
        points, markers = [], []

        # For each data point of the storm, collect various data that will be represented on the map
       
        for row in storm.index[1:]:
            # Latitude and longitude
            lat = float(storm.loc[row, "Latitude"][:-1].strip())
            if storm.loc[row, "Longitude"].strip()[-1] == "E":
                if float(storm.loc[row, "Longitude"].strip()[:-1]) > 50:
                    lng = (360-float(storm.loc[row, "Longitude"].strip()[:-1])) * -1
                else:
                    lng = float(storm.loc[row, "Longitude"].strip()[:-1])
            else:
                lng = float(storm.loc[row, "Longitude"].strip()[:-1]) * -1
            points.append((lat, lng))
            
            # Date, time, wind speed, minimum pressure, storm status
            date = datetime.datetime(int(storm.loc[row, "Date"][0:4]), int(
                storm.loc[row, "Date"][4:6]), int(storm.loc[row, "Date"][6:]))
            time = storm.loc[row, "Time (UTC)"]
            speed = int(storm.loc[row, "Wind Speed (kts)"])
            pressure = int(storm.loc[row, "Min Pressure (mbar)"])
            status = storm.loc[row, "Status"].strip()

            # Color of the point on the map corresponds to strength of the storm at that time
            if speed <= 33:  # TD
                dot_color = "#5EBAFF"
            if speed >= 34 and speed <= 63:  # TS
                dot_color = "#00FAF4"
            if speed >= 64 and speed <= 82:  # C1
                dot_color = "#41C732"
            if speed >= 83 and speed <= 95:  # C2
                dot_color = "#FFE775"
            if speed >= 96 and speed <= 112:  # C3
                dot_color = "#FFC140"
            if speed >= 113 and speed <= 136:  # C4
                dot_color = "#FF8F20"
            if speed >= 137:  # C5
                dot_color = "#FF6060"

            # Pressure data was marked as "-999" or "0" when it wasn't available
            if pressure == -999 or pressure == 0:
                pressure_str = "No pressure data"
            else:
                pressure_str = str(pressure) + " mbar"

            # These are the regular time intervals of the storm data points
            if time.strip() in ["0", "0000", "0600", "600", "1200", "1800"]:
                if time.strip() == "0000":
                    time = "0"
                if time.strip() == "0600":
                    time = "600"
                time_str = f"{time} UTC"
            # Sometimes, data points would be recorded at irregular times to denote a significant event (i.e. landfall)
            else:
                time_str = f"<i>{time} UTC</i>"
            
            # Information to be displayed on the tooltip
            tooltip = f"<b>{storm_name}:</b> {speed} kts, {pressure_str},\
                    {date.month}/{date.day}/{date.year} {time_str}"

            # Shape of the point on the map is determined by the storm status at the time
            if status in ["TD", "TS", "HU", "TY", "ST"]: # Tropical depression, tropical storm, hurricane, typhoon, super typhoon
                markers.append(folium.CircleMarker(location=(lat, lng), color=dot_color, tooltip=tooltip,
                                                   radius=3.5, fill=True, fill_opacity=1))
            elif status in ["SS", "SD"]: # Subtropical storm, subtropical depression
                markers.append(folium.RegularPolygonMarker(location=(lat, lng), color=dot_color, tooltip=tooltip,
                                                           number_of_sides=4, rotation=45, radius=3.5, fill=True, fill_opacity=1))
            else: # Anything else
                markers.append(folium.RegularPolygonMarker(location=(lat, lng), color=dot_color, tooltip=tooltip,
                                                           number_of_sides=3, rotation=-90, radius=3.5, fill=True, fill_opacity=1))     

        # Adding the line that will connect all the points together                                                                                     
        folium.PolyLine(locations=points, color="#B0B0B0",
                        weight=1, opacity=1).add_to(storm_layer)
        
        # Adding the points of the storm
        for marker in markers:
            marker.add_to(storm_layer)
        
        # Adding the completed storm's path to the map
        storm_layer.add_to(m)

    folium.LayerControl().add_to(m)
    
    # Saves the file as an HTML page
    url = f"hurricane_tracks_{region}_{str(year)}.html"
    m.save(url)
    print(f"File <{url}> created")


def check_input(user_input):
    
    if len(user_input) < 2 or len(user_input) > 3:
        return False
    if user_input[0].lower() not in ["a", "ep", "wp"]:
        return False
    if len(user_input) == 3:
        try:
            int(user_input[1]), int(user_input[2])
        except ValueError:
            return False
        if int(user_input[1]) >= int(user_input[2]):
            return False
    return True


def main():

    # Gets user input
    valid = False
    while not valid:
        user_input = input(">> ").split(",")
        valid = check_input(user_input)
        if not valid:
            print("Invalid input")
    if user_input[0].lower() == "a":
        hur_dict, region = create_hurricane_dict("atlantic.csv"), "atlantic"
    if user_input[0].lower() == "ep":
        hur_dict, region = create_hurricane_dict("eastpacific.csv"), "eastpacific"
    if user_input[0].lower() == "wp":
        hur_dict, region = create_hurricane_dict("westpacific.csv"), "westpacific"

    start = time()
    if len(user_input) == 2:
        hurricane_tracks(region, hur_dict, user_input[1])
    else:
        for year in range(int(user_input[1]), int(user_input[2])+1):
            hurricane_tracks(region, hur_dict, year)
    end = time()
    print(f"Finished. Process completed in {round(end-start, 2)} seconds.")


if __name__ == "__main__":
    ife = inflect.engine()
    main()
