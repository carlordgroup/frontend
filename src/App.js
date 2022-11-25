import Home from './Home/Home'
import Bookings from './Bookings/Bookings'
import Account from './Account/Account'
import CarListing from './CarListing/carListing'
import Login from './Login/Login'
import CreateAccount from './Login/CreateAccount'
import ForgotPassword from './Login/ForgotPassword'
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
            <Route path="/CarListing" element={<CarListing />}/>
            <Route path="/Account" element={<Account />}/>
            <Route path="/bookings" element={<Bookings />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/login/create" element={<CreateAccount/>}/>
            <Route path="/login/reset" element={<ForgotPassword/>}/>
            <Route path="/" element={<Home />}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
