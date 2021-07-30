import { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from './userContext';

export default function Sidebar(){
    let cssUpdate = useContext(userContext);

    return <>
    <aside className="main-sidebar sidebar-dark-success elevation-4 sidenav">
    <Link to="/dashboard" className="brand-link">
    <img src="dist/img/invoice.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">Invoice Generator</span>
    </Link>
    <nav className="mt-2">
  <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
    {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
    {
        cssUpdate.role === 'Admin' ||   cssUpdate.role === 'Manager' ||   cssUpdate.role === 'Employee' ?
        <>
      <li className="nav-item">
      <Link to='/dashboard'
        className={`nav-link ${(cssUpdate.focus==='dashboard') ? "active" : ""}`} onClick={()=>cssUpdate.setFocus('dashboard')}>
        <i className="nav-icon fas fa-tachometer-alt" />
        <p>
          Dashboard
        </p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/invoiceentry"className={`nav-link ${(cssUpdate.focus==='create') ? "active" : ""}`} onClick={()=>{
      cssUpdate.setFocus('create')
      cssUpdate.setPathName('/invoiceentry')}}>
        <i className="nav-icon fas fa-edit" />
        <p>
          Create Invoice
        </p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to='/allinvoices' className={`nav-link ${(cssUpdate.focus==='all') ? "active" : ""}`} onClick={()=>cssUpdate.setFocus('all')}>
        <i className="nav-icon fas fa-book" />
        <p>
          All Invoices
        </p>
      </Link>
    </li>
    </> : <></>
    }
    {
        cssUpdate.role === 'Admin' ||   cssUpdate.role === 'Manager' ?
        <>
    <li className="nav-item">
      <Link to='/updateinvoice' className={`nav-link ${(cssUpdate.focus==='update') ? "active" : ""}`} onClick={()=>cssUpdate.setFocus('update')}>
        <i className="nav-icon fas fa-edit" />
        <p>
          Update Invoice
        </p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to='/invoicesearch' className={`nav-link ${(cssUpdate.focus==='search') ? "active" : ""}`} onClick={()=>cssUpdate.setFocus('search')}>
        <i className="nav-icon fas fa-search" />
        <p>
          Search Invoice
        </p>
      </Link>
    </li>
    </> : <></>
    }

    {
        cssUpdate.role === 'Admin' ?
      <li className="nav-item">
      <Link to='/userupdate' className={`nav-link ${(cssUpdate.focus==='userupdate') ? "active" : ""}`} onClick={()=>cssUpdate.setFocus('userupdate')}>
        <i className="nav-icon fas fa-search" />
        <p>
          User Details Update
        </p>
      </Link>
    </li>
    : <></>
    }
 
  </ul>
</nav>
</aside>
{/* /.sidebar-menu */}

    </>
}