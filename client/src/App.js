import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Forgotpassword from './components/forgotpassword';
import Dashboard from './components/dashboard';
import Invoiceentry from './components/invoiceentry';
import Productdetails from './components/productdetails';
import Updateinvoice from './components/updateinvoice';
import Invoicesearch from './components/invoicesearch';
import Allinvoice from './components/allinvoice';
import Resetpassword from './components/resetpassword'
import Pdf from './components/pdf';
import Previewpdf from './components/previewpdf';
import {UserData} from './components/userContext';
import Errormessage from './components/error';
import Userupdate from './components/userupdate';
import Sessiontimeout from './components/sessiontimeout';

function App() {
  return <>

  <Router>
  <UserData>
  <Switch>
    console.log(encryptor);
    <Route path="/" component={Login} exact="true"></Route>
    <Route path="/register" component={Register} exact="true"></Route>
    <Route path="/forgotpassword" component={Forgotpassword} exact="true"></Route>
    <Route path="/invoiceentry" component={Invoiceentry} exact="true"></Route>
    <Route path="/invoiceupdate" component={Invoiceentry} exact="true"></Route>
    <Route path="/resetpassword/:token" component={Resetpassword} exact="true"></Route>
    <Route path="/dashboard" component={Dashboard} exact="true"></Route>
    <Route path="/table" component={Productdetails} exact="true"></Route>
    <Route path="/updateinvoice" component={Updateinvoice} exact="true"></Route>
    <Route path="/invoicesearch" component={Invoicesearch} exact="true"></Route>
    <Route path="/allinvoices" component={Allinvoice} exact="true"></Route>
    <Route path="/invoice" component={Pdf} exact="true"></Route>
    <Route path="/preview" component={Previewpdf} exact="true"></Route>
    <Route path="/error" component={Errormessage} exact="true"></Route>
    <Route path="/userupdate" component={Userupdate} exact="true"></Route>
    <Route path="/sessiontimeout" component={Sessiontimeout} exact="true"></Route>
    
  </Switch>
  </UserData>
  </Router>
  </>
}

export default App;
