
import './App.css';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Route } from 'react-router-dom';
import MyApplications from './screens/MyApplications/MyApplications';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import AdminLogin from './admin/adminComponents/adminLogin/adminLogin'
import AdminHeader from './admin/adminComponents/adminHeader/adminHeader';

import AdminHome from './admin/adminComponents/adminHome/AdminHome';
import ApplicationRecords from './admin/adminComponents/ApplicationRecords/ApplicationRecords';
import ViewApplicationform from './admin/adminComponents/viewApplication/ViewApplication';
import AdminSlots from './admin/adminComponents/AdminSlots/AdminSlots';
import AdminViewSlots from './admin/adminComponents/adminViewSlots/AdminViewSlots';







function App() {
  
  return (

    <div className="App">
      <BrowserRouter>
       
        
        <main>
          <Route path="/incub" exact component={LandingPage} />
          <Route path="/" exact component={MyApplications} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path='/apply' exact component={RegistrationForm} />
          <Route path="/admin/login" exact component={AdminLogin} />
          <Route path="/admin" exact component={AdminHome} />
          <Route path="/admin/viewApplications" exact component={AdminHome} />
          <Route path="/admin/ApplicationRecords" exact component={ApplicationRecords} />
          <Route path="/admin/viewApplication" exact component={ViewApplicationform} />
          <Route path="/admin/bookSlot" exact component={AdminSlots} />
          <Route path="/admin/viewSlots" exact component={AdminViewSlots} />
          

        </main>
          <Footer />
        
      </BrowserRouter >
    </div>

  );
}

export default App;
