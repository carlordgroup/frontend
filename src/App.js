import Home from './Home/Home'
<<<<<<< HEAD
import Bookings from './Bookings/Bookings'
import Account from './Account/Account'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
=======
>>>>>>> 50054f03eacd20bf08a036abd1b9bbaa831ec305

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
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
            <Route path="/Account" element={<Account />}/>
            <Route path="/bookings" element={<Bookings />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
      </Router>
=======
      <Home/>
>>>>>>> 50054f03eacd20bf08a036abd1b9bbaa831ec305
    </div>
  );
}

export default App;
