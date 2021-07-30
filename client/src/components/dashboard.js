import Navbar from "./navbar";
import Sidebar from "./sidebar";
import axios from "./axios";
import { useEffect, useState , useContext} from "react";
import { useHistory } from "react-router-dom"
import userContext from './userContext';
import Errormessage from "./error";

const apiUrl = 'https://rg-invoice-server.herokuapp.com'

axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.baseURL);
    console.log(config);
    const allowedOrigins = [apiUrl];
    if (config.session && allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${config.session}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default function Dashboard(props){
  let [retrievedData,setRetrieveddata] = useState([]);
  let useContextDetails = useContext(userContext)
  const session =  useContextDetails.sessionToken;
  const role = useContextDetails.role;
  const history = useHistory();

   useEffect(async()=>{   
  
   let data = await axios.get('/getdata/statistics',{session})
     if(data.data.message==="Authentication token missing"){
      history.push('/error')
     }else if(data.data.message==="Statistics"){
     setRetrieveddata([data.data]) 
      }else if(data.data.message==="Incorrect token"){
        history.push('/sessiontimeout')
       }
  },[]);
 
    let id = 1;
    return <> {
      (role ==='Manager' || role ==='Admin' || role ==='Employee')? <>
    <Sidebar ></Sidebar>
    <Navbar></Navbar>
    <div className="content-wrapper">
    <div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0">Dashboard</h1>
      </div>{/* /.col */}
      {/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>
  {retrievedData.length===0 ? <div><h1>Loading!</h1></div>
  :
    <div className="content">
    <div className="container-fluid">
    
  {/* Small boxes (Stat box) */}
  <div className="row">
    <div className="col-lg-3 col-6">
      {/* small box */}
      <div className="small-box bg-info">
        <div className="inner">
          <h3>{retrievedData[0].totalinvoiceCount}</h3>
          <p>Total Invoices</p>
        </div>
        <div className="icon">
          <i className="ion ion-ios-paper-outline" />
        </div>
      </div>
    </div>
    {/* ./col */}
    <div className="col-lg-3 col-6">
      {/* small box */}
      <div className="small-box bg-success">
        <div className="inner">
          <h3>{retrievedData[0].todayinvoiceCount}</h3>
          <p>Today's Invoice</p>
        </div>
        <div className="icon">
          <i className="ion ion-ios-paper" />
        </div>
      </div>
    </div>
    {/* ./col */}
    <div className="col-lg-3 col-6">
      {/* small box */}
      <div className="small-box bg-warning">
        <div className="inner">
          <h3>{retrievedData[0].userCount}</h3>
          <p>Users Registered</p>
        </div>
        <div className="icon">
          <i className="ion ion-person-add" />
        </div>
      </div>
    </div>
    {/* ./col */}
    <div className="col-lg-3 col-6">
      {/* small box */}
      <div className="small-box bg-danger">
        <div className="inner">
          <h3>{retrievedData[0].totalinvoiceCount}</h3>
          <p>Client Count</p>
        </div>
        <div className="icon">
          <i className="ion ion-happy-outline" />
        </div>
      </div>
    </div>
  </div>
  </div>
  {
    (retrievedData[0].todayinvoiceCount===0) ?
      
      <div className="row">
      <div className="col-12">
      <div className="card">
        <div className="card-body">
            <h1 style={{textAlign:'center'}}>No Invoices Generated for Today!</h1>
        </div>
      </div>
      </div>
      </div>   
         
    :

  <div className="row">
  <div className="col-12">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Invoice Generated Today</h3>
      </div>
      {/* /.card-header */}
      <div className="card-body table-responsive p-0">
        <table className="table table-head-fixed text-nowrap">
          <thead>
            <tr>
              <th>#</th>
              <th>Invoice Number</th>
              <th>Date</th>
              <th>Client Name</th>
            </tr>
          </thead>
          <tbody>
            { 
              retrievedData[0].invoiceDetails.map((obj)=>{
                return <tr>
                <td>{id++}</td>
                <td>{obj.invoiceno}</td>
                <td>{obj.date}</td>
                <td><span className="tag tag-success">{obj.client['name']}</span></td>
              </tr>
              })
            }
            
          </tbody>
        </table>
      </div>
      {/* /.card-body */}
    </div>
    {/* /.card */}
  </div>
</div>
  }
  </div>
  
}
  </div>
</> : <Errormessage></Errormessage> }
    </>
}