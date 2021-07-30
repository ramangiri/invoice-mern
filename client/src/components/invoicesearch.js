import Navbar from "./navbar";
import Sidebar from "./sidebar";
import React, { useContext,useState } from "react";
import axios from "./axios";
import { toast } from "react-toastify";
import Pdf from "./pdf";
import { Link, useHistory } from "react-router-dom";
import userContext from './userContext';
import Errormessage from "./error";
import Cookies from "universal-cookie";
const cookies = new Cookies();



toast.configure();
export default function Invoicesearch(){
  
  let [searchData,setSearchdata] = useState('');
  let [tableData, setTabledata] = useState([]);
  let history = useHistory();
  let name = useContext(userContext)
  name.setFocus('search')
  let useContextDetails = useContext(userContext)
  const session =  useContextDetails.sessionToken;
  const role = useContextDetails.role;

  let dataSearch = (event)=>{
    event.preventDefault();
    axios.post('/view/getinvoicebysearch',{searchData},{session})
    .then((res)=>{
      if(res.data.message==="Authentication token missing"){
        history.push('/error')
       }else if(res.data.message==="Incorrect token"){
        history.push('/sessiontimeout')
       }
      else if(res.data.data.length!==0){
          setTabledata(res.data.data)
      }else{
        toast('No Invoice Data found');
        setTabledata([])
      }
    })
  }
  let deleteInvoice = (e,invoiceno)=>{
    e.preventDefault();
    axios.post('/view/deleteinvoice',{invoiceno},{session})
    .then((res)=>{
      if(res.data.message==="Authentication token missing"){
        history.push('/error')
      }else if(res.data.message==="Incorrect token"){
        history.push('/sessiontimeout')
       }
      else if(res.data.message==="Invoice Deleted"){
        toast(`Invoice Deleted-${invoiceno}`)
        history.go(0)
      }
    })
  }
    return <>{
      (role ==='Manager' || role ==='Admin' || role ==='Employee')? <>
    <Sidebar></Sidebar>
    <Navbar></Navbar>
    <div className="content-wrapper">
  {/* Content Header (Page header) */}

  <section className="content">
  <div className="container-fluid">
    <h2 className="text-center display-4">Invoice Search</h2>
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <form onSubmit={dataSearch}>
          <div className="input-group">
            <input type="search" className="form-control form-control-lg" placeholder="Search using Invoice number or Client Name" value={searchData} onChange={e=>setSearchdata(e.target.value)} />
            <div className="input-group-append">
              <button type="submit" className="btn btn-lg btn-default">
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
<div class="row mt-3">
                <div class="col-md-10 offset-md-1">
 {tableData.length===0 ? <div></div>
 : 
<section className="content">
  <div className="container-fluid">
    <table className="table table-striped table-bordered">
  <thead className="table-warning">
      <tr>
      <th scope="col">Invoice number</th>
      <th scope="col">Client Name</th>
      <th scope="col">Date</th>
      <th scope="col" style={{textAlign:'center'}}>Download Invoice</th>
      <th scope="col" style={{textAlign:'center'}}>Preview Invoice</th>
      <th scope="col" style={{textAlign:'center'}}>Delete Invoice</th>
    </tr>
  </thead>
  <tbody>
    {tableData.map((obj)=>{
      return <tr>
      <th scope="row">{obj.invoiceno}</th>
      <td>{obj.client.name}</td>
      <td>{obj.date}</td>
      <td><Pdf invoiceData={obj}></Pdf></td>
        <td><button className="btn btn-warning"> <Link to={{
        pathname : `/preview`}} 
        target="_blank" onClick={()=>{cookies.set('displayData', JSON.stringify(obj))}}>Preview PDF</Link></button></td>
        <td><button className="btn btn-danger" onClick={(e)=>deleteInvoice(e,obj.invoiceno)}>Delete</button></td>
      </tr>
    })
}    
  </tbody>
</table>
</div>
</section>
}
</div>
</div>
</div>
</> : <Errormessage></Errormessage> }
    </>
}