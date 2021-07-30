import Navbar from "./navbar";
import Sidebar from "./sidebar";
import axios from "./axios";
import { useEffect, useState,useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Pdf from "./pdf";
import { toast } from "react-toastify";
import userContext from './userContext';
import Errormessage from "./error";
import Cookies from "universal-cookie";
const cookies = new Cookies();

toast.configure();

export default function Allinvoice(){
 
  let useContextDetails = useContext(userContext)
  useContextDetails.setFocus('all')
  const session =  useContextDetails.sessionToken;
  const role = useContextDetails.role;
  let history = useHistory();
  let id = 1;
  let [allData,setAlldata] = useState([]);
  useEffect(async()=>{
     let data = await axios.get('/view/getallinvoice',{session})
     if(data.data.message==="Authentication token missing"){
      history.push('/error')
     }else if(data.data.message==="Incorrect token"){
      history.push('/sessiontimeout')
     }else if(data.data.message==="All Data"){
      setAlldata([data.data.data])
     }
  },[]);
    return<>
    {
    (role ==='Manager' || role ==='Admin' || role ==='Employee') ? <>
    <Sidebar></Sidebar>
    <Navbar></Navbar>
    <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Invoice list</h1>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>

<section className="content">
  <div className="container-fluid">
    {allData.length===0 ? <div><h1>Loading Invoices!</h1></div>
    :
    <table className="table table-striped table-bordered">
  <thead className="table-warning">
    <tr>
      <th scope="col">Invoice number</th>
      <th scope="col">Client Name</th>
      <th scope="col">Date</th>
      <th scope="col">Download Invoice</th>
      <th scope="col">Preview Invoice</th>
    
    </tr>
  </thead>
  <tbody>
    {
      allData[0].map((obj)=>{
        return <tr>
        <td>{obj.invoiceno}</td>
        <td>{obj.client.name}</td>
        <td>{obj.date}</td>
        <td><Pdf invoiceData={obj}></Pdf></td>
        <td><button className="btn btn-warning"> <Link to={{
        pathname : `/preview`}} 
        target="_blank" onClick={()=>{cookies.set('displayData', JSON.stringify(obj))}} style={{color: "white"}}>Preview PDF</Link></button></td>
        
      </tr>    
      })
    }
    
  </tbody>
</table>
}
</div>
</section>
</div>
   </>  : <Errormessage></Errormessage>
}
    </>
}