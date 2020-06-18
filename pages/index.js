import React, {useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import DetallesProducto from '../components/layout/DetallesProducto';
import clienteAxios from '../config/axios';
import { Formulario, Campo, InputSubtmit, Error } from '../components/ui/Formulario';




const Home = () => {

  const [productos, guardarProductos] = useState([]);

  useEffect(()=>{
    const obtenerProductos = async () => {
      try {
        const response = await clienteAxios.get('http://localhost:5000/api/productos/');
        const data = response.data;
        actualizarData(data);
        
      } catch (error) {
          console.log('No se puedo traer la data')
      }
    }
    obtenerProductos();
    
  }, [productos]);
   
  function actualizarData (data) {
    const productos2 = data;
    guardarProductos(productos2.productos);
  }

    return(
      <div>
        <Layout>
          <div className="listado-productos">
              <div className="contenedor">
                <ul className="bg-white">
                {productos.map(productos => (                  
                      <DetallesProducto
                          key={productos._id}
                          producto={productos}
                      />
                      
                  ))}
                </ul>
              </div>
          </div>
        </Layout>
      </div>
    )
}

export default Home