import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Movie from "./Pages/Movie";

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/random">Random Movie</Link>
                    <Link to="/search">Search</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<Movie />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
