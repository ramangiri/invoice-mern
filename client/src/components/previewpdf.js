import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const easyinvoice = require('easyinvoice');

toast.configure();
 export default function Previewpdf(props){
     let history = useHistory();
    if(cookies.get('displayData')){
        let invoiceDetails = cookies.get('displayData')

        var data = {
            //"documentTitle": "RECEIPT", //Defaults to INVOICE
            //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
            "currency": "USD", //See documentation 'Locales and Currency' for more info
            "taxNotation": "vat", //or gst
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 15,
            "logo": "https://i.ibb.co/8gjZnmp/invoice.png", //or base64
            "sender": {
                "company":"Invoice Generator",
                "address": "135 East Street",
                "zip": "600001",
                "city": "Chennai",
                "country": "Tamilnadu",
                
            },
            "client": {
                   "company": invoiceDetails.client.name,
                   "address": invoiceDetails.client.address.door,
                   "zip": invoiceDetails.client.address.zip,
                   "city": invoiceDetails.client.address.city,
                   "country": invoiceDetails.client.address.state
            },
            "invoiceNumber": invoiceDetails.invoiceno,
            "invoiceDate": invoiceDetails.date,
            "products": invoiceDetails.products   
            ,
            "bottomNotice": "Thank you for your purchase!!!",
        };
    }else{
        history.push('/error')
    }
   
  
useEffect(async()=>{
    document.getElementById("pdf").innerHTML = "loading...";
    const result = await easyinvoice.createInvoice(data);      
    easyinvoice.render('pdf', result.pdf);
},[])


return <>
<div>
    
    <div id="pdf"></div>
</div>
</>

}
