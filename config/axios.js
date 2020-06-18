import axios from 'axios';

const  clienteAxios = axios.create({

    baseURL:  process.env.API_BACK,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json; charset=UTF-8"
      }

  });

export default clienteAxios;
