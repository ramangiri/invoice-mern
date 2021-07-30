import { useState } from "react"
import axios from "./axios";
import { toast } from "react-toastify";
import { Link,useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
export default function Resetpassword(props){
    let history = useHistory()
    const forgottoken =  props.match.params.token
    let [newPassword,setnewPassport] = useState('');
    let reset = event =>{
      event.preventDefault()
      const resetPassword = { forgottoken,newPassword}
      axios.post(`/access/resetpassword`,resetPassword)
      .then(res=>{if(res.data.message==="Password Reset successfully"){
        toast('Password Reset Successful');
        history.push('/');
      }else{
        toast('Incorrect or Expired Link');
        history.push('/forgotpassword')
      }
      })
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
        <form onSubmit={reset}>
          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="New Password" value={newPassword} onChange={e=>setnewPassport(e.target.value)} required />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-success btn-block">Reset password</button>
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