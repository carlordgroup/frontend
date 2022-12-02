import Home from './Home/Home'
import Bookings from './Bookings/Bookings'
import Account from './Account/Account'
import CarListing from './CarListing/carListing'
import Login from './Login/Login'
import CreateAccount from './Login/CreateAccount'
import ForgotPassword from './Login/ForgotPassword'
import Contact from './Contact/Contact'
import ContactSubmit from './Contact/ContactSubmit'
import ConfirmPayment from './CarListing/confirmPayment'
import Management from './Management/Management'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { AppProvider } from './appContext';
import LocationList from "./Management/LocationList";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Router>

            <Routes>
              <Route path="/CarListing" element={<CarListing />}/>
              <Route path="/Account" element={<Account />}/>
              <Route path="/bookings" element={<Bookings />}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/login/create" element={<CreateAccount/>}/>
              <Route path="/login/reset" element={<ForgotPassword/>}/>
              <Route path="/contact/contactsubmit" element={<ContactSubmit/>}/>
              <Route path="/carlisting/confirmpayment/:id" element={<ConfirmPayment/>}/>
              <Route path="/management/location" element={<LocationList/>}/>
              <Route path="/management" element={<Management/>}/>
              <Route path="/" element={<Home />}/>
            </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
