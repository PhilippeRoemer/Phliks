import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Movie from "./Pages/Movie";
import TV from "./Pages/TV";
import Random from "./Pages/Random";
import Search from "./Pages/Search";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/random">Random Movie</Link>
                    <Link to="/search">Search</Link>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<Movie />} />
                    <Route path="/tv/:id" element={<TV />} />
                    <Route path="/random" element={<Random />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
