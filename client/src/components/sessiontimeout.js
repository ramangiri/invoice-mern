import { Link } from "react-router-dom";

export default function Sessiontimeout(){
    return <>
     <div className="hold-transition login-page">
    <div className="login-box">
    <div className="card card-outline card-success">
      <div className="card-header text-center">
        <h1 className="h1"><b>Invoice Generator</b></h1>
      </div>
      <div className="card-body">
        <p className="login-box-msg">You session has expired.Please Login with the link below.</p>
        <p className="mt-3 mb-1" style={{textAlign:"center"}}>
        <Link to="/">Login</Link>
        </p>
      </div>
      {/* /.login-card-body */}
    </div>
    </div>
    </div>
    </>
}