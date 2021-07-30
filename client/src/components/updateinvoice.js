import { useEffect, useState,useContext } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import axios from "./axios";
import { Link, useHistory } from "react-router-dom";
import userContext from './userContext'
import Errormessage from "./error";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Updateinvoice(){
  let history = useHistory()
  let name = useContext(userContext)
  name.setFocus('update')
  let useContextDetails = useContext(userContext)
  const session =  useContextDetails.sessionToken;
  const role = useContextDetails.role;
  let [updateData,setUpdatedata] = useState([]);  
  useEffect(async ()=>{
      await axios.get('/view/getallinvoice',{session})
      .then(res=>{
      if(res.data.message==="Authentication token missing"){
          history.push('/error')
      }else if(res.data.message==="Incorrect token"){
        history.push('/sessiontimeout')
       }
      else if(res.data.message==="All Data"){ 
      const allData = res.data.data;
      setUpdatedata(allData)  
    }
      })
    },[])
    
    return <>{
      (role ==='Manager' || role ==='Admin' || role ==='Employee')? <>
    <Sidebar></Sidebar>
    <Navbar></Navbar>
    <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Invoice Updation</h1>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {updateData.length===0 ?
    <div><h1>Page Loading..!</h1></div>
  :    
  <section className="content">
  <div className="container-fluid">
    
    <table className="table table-striped table-bordered">
  <thead className="table-warning">
    <tr>
      <th scope="col">Invoice number</th>
      <th scope="col">Client Name</th>
      <th scope="col">Date</th>
      <th scope="col">Update Invoice</th>
    </tr>
  </thead>
  <tbody>
  {  updateData.map((obj)=>{
       return <> 
       <tr>
        <th scope="row">{obj.invoiceno}</th>
        <td>{obj.client['name']}</td>
        <td>{obj.date}</td>
        <td><button className="btn btn-success" onClick={()=>{
          useContextDetails.setPathName('/invoiceupdate')
          cookies.set("aboutProps",obj)
          cookies.set("pathname","/invoiceupdate")
          }}><Link to={{
          pathname:'/invoiceupdate', 
          aboutProps:{obj}
          }} style={{ color: "white"}} >Update</Link></button></td>
      </tr>
      </>
    })
  }
  </tbody>
</table>
</div>
</section>
}
</div>
</> : <Errormessage></Errormessage>
}
    </>
}