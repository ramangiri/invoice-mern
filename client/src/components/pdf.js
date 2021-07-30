import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const easyinvoice = require('easyinvoice');

toast.configure();
 export default function Pdf(props){
    const invoiceDetails = props.invoiceData
    var data = {
        //"documentTitle": "RECEIPT", //Defaults to INVOICE
        //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
        "currency": "USD", //See documentation 'Locales and Currency' for more info
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://i.ibb.co/8gjZnmp/invoice.png", //or base64
        "sender": {
<<<<<<< HEAD
            "company":"Invoice Generator",
=======
           "company":"Invoice Generator",
>>>>>>> 0c8da7b90dfad3b7aa63886629fad0b46a6c4da9
            "address": "$No:49 Pillaiyar Kovil Street,Potheri",
            "zip": "603203",
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
  
let invoice = () => {
    
    //Create your invoice! Easy!
    easyinvoice.createInvoice(data, async function (result) {
        easyinvoice.download(`${invoiceDetails.invoiceno}.pdf`);
    });
    toast(`Invoice downloading for - ${invoiceDetails.invoiceno}`);

}

return <>
<div>
    <button className="btn btn-success" onClick={invoice}>Download Invoice</button>
</div>
</>

}
