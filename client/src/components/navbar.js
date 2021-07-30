import userContext from './userContext';
import { useContext } from "react";
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';

const cookies = new Cookies();

export default function Navbar(){
  let history = useHistory();
    let useContextDetails = useContext(userContext)
    let logout = (event) =>{
      event.preventDefault();
      cookies.remove("Name");
      cookies.remove("Login")
      cookies.remove("Role");
      cookies.remove("aboutProps");
      cookies.remove("pathname");
      cookies.remove("displayData")
      history.push('/')
    }
    return <>
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  
  <ul className="navbar-nav ml-auto">
  <div className="user-panel mt-3 pb-3 mb-3 d-flex">
       
        <div className="info">
          <a href="#" class="d-block">{useContextDetails.userName}</a>
        </div>
        <div className="image" data-toggle="tooltip" data-placement="bottom" title="Click here to Log Out" onClick={logout}>
          <img src="dist/img/user.png" class="img-circle elevation-2" alt="User Image"/>
        </div>
  </div>
  </ul>
</nav>
    </>
}