import Navbar from "./navbar";
import Sidebar from "./sidebar";
import React, { useEffect,useState,useContext } from "react";
import Productdetails from "./productdetails";
import axios from "./axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom"
import userContext from './userContext';
import Errormessage from "./error";
import Cookies from "universal-cookie";
const cookies = new Cookies();
toast.configure();

export default function Invoiceentry(props){
  let cssName = useContext(userContext)
  cssName.setFocus('create')
  let useContextDetails = useContext(userContext)
  const session =  useContextDetails.sessionToken;
  const role = useContextDetails.role;
  const history = useHistory();
  let i=1;
  const [products, setProducts] = useState([{ description: "", price: "" ,quantity:"",tax:""}]);
  const [name,setClientname] = useState('')
  const [door,setstreetAddress] = useState('')
  const [city,setCity] = useState('');
  const [state,setState] = useState('');
  const [zip,setZip] = useState('')
  const [email,setEmail] = useState('');
  
  
  useEffect(()=>{
    if( useContextDetails.pathname==="/invoiceupdate" ){
      const updateData = cookies.get('aboutProps');
      setProducts(updateData.products);
      setClientname(updateData.client['name'])
      setstreetAddress(updateData.client.address.door);
      setCity(updateData.client.address.city);
      setState(updateData.client.address.state);
      setZip(updateData.client.address.zip);
      setEmail(updateData.email);
    }
    if(useContextDetails.pathname==="/invoiceentry"){
      setProducts([{ description: "", price: "" ,quantity:"",tax:""}]);
      setClientname("")
      setstreetAddress("");
      setCity("");
      setState("");
      setZip("");
      setEmail("");
    }
  },[useContextDetails.pathname])
  
  let productsEntry = (event) =>{
    event.preventDefault();
    let address = {door,city,state,zip}
    let client ={name,address}
    if (props.location.aboutProps) {
      const invoiceno = props.location.aboutProps.obj.invoiceno
      axios.post('/view/updateinvoice',{invoiceno,products,client,email},{session})
      .then((res)=>{
        if(res.data.message==="Authentication token missing"){
          history.push('/error')
         }else if(res.data.message==="Incorrect token"){
          history.push('/sessiontimeout')
         }else if(res.data.message==="Invoice Updated"){
          toast(`Product entry Updated -${invoiceno}`)
          history.push('/allinvoices')
        }
      })
    } else {
      axios.post('/view/createinvoice',{products,client,email},{session})
    .then((res)=>{
     if(res.data.message==="Invoice Created"){
       toast(`Product entry Created - ${res.data.data}`);
       history.push('/allinvoices')
     }
    })  
    }
  }
      return <>
      { (role ==='Manager' || role ==='Admin' || role ==='Employee') ? <>
    <Sidebar></Sidebar>
    <Navbar></Navbar>
    <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Invoice Creation</h1>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>

<section className="content">
  <div className="container-fluid">
    <div className="row">
      {/* left column */}
      <div className="col-md-12">
    {/* general form elements */}
<div className="card card-success">
  <div className="card-header">
    <h3 className="card-title">Enter Invoice Details</h3>
  </div>
  {/* /.card-header */}
  {/* form start */}
  <form onSubmit={productsEntry}>
    <div className="card-body">

      <Productdetails details={products} detailsUpdate={setProducts}></Productdetails>
        <div className="form-group">
        <div className="row">
        <div className="col-3">
        <label htmlFor="exampleInputEmail1">Client Name</label>
        <input class="form-control" type="text" placeholder="Enter the Customer Name" value={name} onChange={e => setClientname(e.target.value)} required />
        </div>
        <div className="col-3">
        <label htmlFor="exampleInputEmail1">Client Email</label>
        <input class="form-control" type="email" placeholder="Enter the Customer Email" value={email} onChange={e=>(setEmail(e.target.value))}required />
        </div>
        </div>
        </div>
     
      <div className="form-group">
        <div className="row">
        <div className="col-6">
        <label htmlFor="exampleInputEmail1">Street Address</label>
        <input class="form-control" type="text" placeholder="Enter the Customer Address" value={door} onChange={e => setstreetAddress(e.target.value)} required />
        </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
        <div className="col-2">
        <label htmlFor="exampleInputEmail1">City</label>
        <input class="form-control" type="text" placeholder=" Enter City Name" value={city} onChange={e => setCity(e.target.value)} required />
        </div>
        <div className="col-2">
        <label htmlFor="exampleInputEmail1">State</label>
        <input class="form-control" type="text" placeholder="Enter State Name" value={state} onChange={e => setState(e.target.value)} required />
        </div>
        <div className="col-2">
        <label htmlFor="exampleInputEmail1">Zip</label>
        <input class="form-control" type="text" placeholder="Enter Zip Code" value={zip} onChange={e => setZip(e.target.value)} required />
        </div>
        </div>
</div> 
    </div>
    {/* /.card-body */}
    <div className="card-footer">
      <button type="submit" className="btn btn-success">Submit</button>
    </div>
  </form>
</div>
</div></div></div></section>
</div>
</> : <Errormessage></Errormessage> 
}

{/* /.card */}

    </>
}