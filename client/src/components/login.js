import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom"
import userContext from './userContext';
import "./login.css"
import Cookies from 'universal-cookie';
const cookies = new Cookies();


toast.configure();

export default function Login(){
    let history = useHistory();
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let useContextDetails = useContext(userContext)
    let userlogin = (event) =>{
      event.preventDefault();
      const loginDetails ={
        email,
        password
    }
    axios.post(`/access/login`,loginDetails)
    .then(res =>{ if(res.data.message === "Login Successful"){
        if(res.data.token){
          cookies.set('Login', res.data.token, { path: '/' });
          cookies.set('Role',res.data.data.role, { path: '/' });
          cookies.set('Name', res.data.data.name, { path: '/' });
          useContextDetails.setSessionToken(cookies.get('Login'));
          useContextDetails.setRole(cookies.get('Role')); 
          useContextDetails.setuserName(cookies.get('Name'));
        }
        history.push('/dashboard')
    }
    else if(res.data.message==="Invalid Credentials"){
        toast("Your email or password is incorrect");
    }
})
    setEmail('')
    setPassword('')
    }
    return <>
    <div className="hold-transition login-page">
    <div className="login-box">
  {/* /.login-logo */}
  <div className="card card-outline card-success">
    <div className="card-header text-center">
      <h1 className="h1"><b>RG Invoice Generator</b></h1>
    </div>
    <div className="card-body">
      <p className="login-box-msg">Sign in to start your session</p>
      <form onSubmit={userlogin}>
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
          <div className="input-group-append">
          <div className="input-group-text">
              <span className="fas fa-lock" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* /.col */}
          <div className="col-12">
            <button type="submit" className="btn btn-success btn-block">Sign In</button>
          </div>
          {/* /.col */}
        </div>
      </form>
      {/* /.social-auth-links */}
      <p className="mb-1">
        <Link to="/forgotpassword">I forgot my password</Link>
      </p>
      <p className="mb-0">
        <Link to="/register" className="text-center">Register a new membership</Link>
      </p>
    </div>
    {/* /.card-body */}
  </div>
  {/* /.card */}
</div>
</div>
    </>
}