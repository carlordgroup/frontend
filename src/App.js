import Home from './Home/Home'
import Bookings from './Bookings/Bookings'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/bookings">About</Link>
              </li>
            </ul>
          </nav> */}

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/bookings" element={<Bookings />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
