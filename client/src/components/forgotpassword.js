import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react"
import axios from "./axios";
toast.configure();
export default function Forgotpassword(){
    let history = useHistory();
    let [email,setEmail] = useState('');
    let forgotPassword = (event) =>{
      event.preventDefault();
      axios.post('/access/forgotpassword',{email})
      .then(res=>{
        if(res.data.message==="User not found"){
            toast("Enter Valid Email address");
        }else{
            toast(res.data.message)
            history.push('/')
        }})
    }
    return<>
    <div className="hold-transition login-page">
    <div className="login-box">
    <div className="card card-outline card-success">
      <div className="card-header text-center">
        <h1 className="h1"><b>Invoice Generator</b></h1>
      </div>
      <div className="card-body">
        <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
        <form onSubmit={forgotPassword}>
          <div className="input-group mb-3">
            <input type="email" className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-success btn-block">Request new password</button>
            </div>
            {/* /.col */}
          </div>
        </form>
        <p className="mt-3 mb-1">
          <Link to="/">Login</Link>
        </p>
      </div>
      {/* /.login-card-body */}
    </div>
  </div>
</div>

    </>
}