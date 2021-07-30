import { useEffect, useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "./axios";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import userContext from './userContext';

export default function Userupdate(){
    let id = 1;
    let history = useHistory();
    let [buttonCheck,setbuttonCheck] = useState("");
    let [selectCheck,setselectCheck] = useState('');
    let [userData,setUserdata] = useState([]);
    let useContextDetails = useContext(userContext)
    useContextDetails.setFocus('userupdate')
    const session =  useContextDetails.sessionToken;
    let roleUpdate = async (event,obj) =>{
        event.preventDefault();
        setbuttonCheck("") 
        let email = obj.email 
        let isRoleupdated = await axios.post('/getuser/roleupdate',{email, selectCheck},{session})
        if(isRoleupdated.data.message==="Authentication token missing"){
          history.push('/error')
        }else if(isRoleupdated.data.message==="Incorrect token"){
          history.push('/sessiontimeout')
         }
        else if(isRoleupdated.data.message==="Role update successful"){
            history.go(0);
        }
        
    }
    useEffect(async()=>{
        let userDetails = await axios.get('/getuser/userdata',{session})
        if(userDetails.data.message==="Authentication token missing"){
         history.push('/error')
        }else if(userDetails.data.message==="Incorrect token"){
          history.push('/sessiontimeout')
         }else if(userDetails.data.message==="User Data"){
         setUserdata([userDetails.data])
        }
     },[]);
    return <>
    <Sidebar></Sidebar>
    <Navbar></Navbar>
    <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content">
  <div className="container-fluid">
    <h2 className="text-center display-4">Update User Role</h2>
    <div className="row">
      <div className="col-md-8 offset-md-2">
      <section className="content">
   { userData.length === 0 ? <div><h1>Loading!</h1></div>
   :
  <div className="container-fluid">
    <table className="table table-striped table-bordered">
  <thead className="table-warning">
    <tr>
      <th scope="col">#</th>
      <th scope="col">User Name</th>
      <th scope="col">User Role</th>
      <th scope="col">Update Role</th>
      
    </tr>
  </thead>
  <tbody>
    {
     
      userData[0].userData.map((obj)=>{
        return <tr>
        <td>{id++}</td>
        <td>{obj.fullName}</td>
        <td>
        <select class="form-control" disabled={buttonCheck === obj._id ? null : true } onChange={e=>setselectCheck(e.target.value)} >
                          <option selected>{obj.role}</option>
                          <option>Admin</option>
                          <option>Manager</option>
                          <option>Employee</option>
        </select>
        </td>
        <td>
   
                         <div className="btn-group col-md-12">
                         <button className="btn btn-danger col-md-6" onClick={()=>setbuttonCheck(obj._id)}>Update</button>
                         { buttonCheck === obj._id  ? 
                         <>
                         <div className="col-md-1"></div>
                         <button className="btn btn-success col-md-4" onClick={(e)=>{roleUpdate(e,obj)}}>Submit</button>
                         </>  : <></>
                         }
        </div>
        </td>
      </tr>    
      })
    }
  </tbody>
</table>

</div>
}
</section>
      </div>
    </div>
  </div>
</section>
</div>
    </>
}