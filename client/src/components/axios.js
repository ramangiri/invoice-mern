import axios from "axios";

const instance = axios.create({

  baseURL:'https://rg-invoice-server.herokuapp.com'
});

export default instance;