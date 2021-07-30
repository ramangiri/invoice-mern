
  
import React, { useState } from "react";


export default function Productdetails(props) {
  let  inputList =  props.details
  let setInputList = props.detailsUpdate

   
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { description: "", price: "" ,quantity:"",tax:""}]);
  };

  return <>
    
      {inputList.map((x, i) => {
        return (
            <div className="form-group">
            <div className="row">
                        <div className="col-3">
                        <label htmlFor="exampleInputPassword1">Product Name</label>
                          <input type="text"  name="description" className="form-control" value={x.description} onChange={e => handleInputChange(e, i)} placeholder="Enter Product Name" required />
                        </div>
                        <div className="col-2">
                        <label htmlfor="exampleInputPassword1">Price</label>
                          <div className="input-group">
                          <div className="input-group-prepend">
                          <span className="input-group-text">$</span>
                           </div>
                          <input type="number"  name="price" className="form-control"   value={x.price}  onChange={e => handleInputChange(e, i)} placeholder="Enter Product Price" required/>
                          <div className="input-group-append">
                          <span className="input-group-text">.00</span>
                        </div>
                        </div>
                        </div>
                        <div className="col-2">
                        <label htmlFor="exampleInputPassword1">Quantity</label>
                          <input type="number"  name="quantity" className="form-control"  value={x.quantity} onChange={e => handleInputChange(e, i)} placeholder="Enter Quantity" required/>
                        </div>
                        <div className="col-2">
                        <label htmlfor="exampleInputPassword1">Tax</label>
                          <div className="input-group">
                          <input type="number"   name="tax" className="form-control" value={x.tax}  onChange={e => handleInputChange(e, i)} placeholder="Enter Tax" required/>
                          <div className="input-group-append">
                          <span className="input-group-text">%</span>
                        </div>
                        </div>
                        </div>
                        <div className="col-2">
                            <label className="col-12" style={{textAlign: 'center'}}>Add next item</label>
                            <div className="btn-group col-md-12">
                         {inputList.length !== 1 && <button className="btn btn-danger col-md-6" onClick={() => handleRemoveClick(i)}>Remove</button>}
                         <div className="col-md-1"></div>
                         {inputList.length - 1 === i && <button className="btn btn-success col-md-4" onClick={handleAddClick}>Add</button>}
                         
                        </div> 
                        </div>     
                      </div>  
            
          </div>
        );
      })}
  </>
}
