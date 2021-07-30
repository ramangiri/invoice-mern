import { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function Register(){
    let history = useHistory();
    let [fullName,setFullname] = useState('');
    let [email,setEmail] = useState('');
    let [password,setpassword] = useState('')
    let [role,setrole] = useState('');
    let register = (event)=>{
        event.preventDefault();
        axios.post('/access/register',{fullName,email,password,role})
        .then(res => {if(res.data.message==="User Created"){
            toast("User Registered");
        setFullname('')
        setEmail('')
        setpassword('')
        setrole('')
        history.push('/')
        }else{
            if(res.data.message==="User Already exists"){
                toast("User Already Registered")
            }
        }
        
     } )}
    return <>
    <div className="hold-transition register-page">
    <div className="register-box">
    <div className="card card-outline card-success">
    <div className="card-header text-center">
      <h1 className="h1"><b>Invoice Generator</b></h1>
    </div>
    <div className="card-body">
      <p className="login-box-msg">Register a new membership</p>
      <form onSubmit={register}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Full name" value={fullName} onChange={(e)=>setFullname(e.target.value)} required />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)} required/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
        <div className="col-lg-12">
             <label className="col-md-12" style={{textAlign:'center'}}>Choose Role</label>
             <select className="form-control  col-md-12" value={role} onChange={(e)=>setrole(e.target.value)}>
             <option>Admin</option>
             <option>Manager</option>
             <option>Employee</option>
        </select>
        </div>

        </div>
        <div className="row">
          <div className="col-8">
            <div className="icheck-success">
              <input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" required/>
              <label htmlFor="agreeTerms">
                I agree to the <a href="#">terms</a>
              </label>
            </div>
          </div>
          {/* /.col */}
          <div className="col-4">
            <button type="submit" className="btn btn-success btn-block">Register</button>
          </div>
          {/* /.col */}
        </div>
      </form>
      <Link to="/" className="text-center">I already have a membership</Link>
    </div>
    {/* /.form-box */}
  </div>{/* /.card */}
</div>
</div>
    </>
}