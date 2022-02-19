import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Favroute from "./components/Favroute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Movie_Info from "./components/Movie_Info";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <Banner />
                <Movies />
              </>
            }
          />
          <Route path="/" element={<Movies />} />
          <Route path="/movie" element={<Movie_Info />} />
          ;
          <Route path="/Favroute" exact element={<Favroute />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
