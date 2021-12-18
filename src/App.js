import './App.css';
import {
    HashRouter as Router,
    Route,
    Routes
} from "react-router-dom";

import Home from './components/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
