

import React, {  useState, useEffect} from 'react';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { Formulario, Campo, InputSubtmit, Error } from '../../components/ui/Formulario';
import clienteAxios from '../../config/axios';
import validarCrearProducto from '../../validaciones/validarCrearProducto';
 
 const STATE_INICIAL = {
  nombre: '',
  descripcion:' ',
  cantidad: 0,
  ubicacion: ''
}


const EditarProducto = (producto) => {

  //Routing para obtener el id actual
  const router = useRouter();
  const { query: {id} } = router;

  //const tareaContext = useContext(productoContext);

  const [ dataEditar , setDataEditar ] = useState({
    nombre: '',
    descripcion:' ',
    cantidad: 0,
    ubicacion: ''
    });

  const [paso, guardarPaso] = useState(true);

  const [ submitForm, guardarSubmitForm ] = useState(false);

  const [ errores, guardarErrores ] = useState({});

  useEffect(()=>{
    
    if(id){
      const obtenerProductos = async () => {
        try {
          const response = await clienteAxios.put(`http://localhost:5000/api/productos/${id}`);
          const data = response.data;

            setDataEditar({
              nombre : data.producto.productoNombre,
              descripcion: data.producto.productoDescripcion,
              cantidad: data.producto.productoCantidad, 
              ubicacion: data.producto.productoUbicacion
  
            })  

            guardarPaso(false);
          
        } catch (error) {
          console.log(error);
        }  
        
      }   
      if(paso){   
        obtenerProductos();
      }
                
   } 

    if(submitForm) {
      const noErrores = Object.keys(errores).length === 0;

      if(noErrores) {
        crearProducto(); // fn = Funcion que se ejecuta en el componente
      }
      guardarSubmitForm(false);
   }

  }, [id, errores]);

const handleChange = e => {
  setDataEditar({
      ...dataEditar,
      [e.target.name] : e.target.value


  })
} 

//Funcion que se ejecuta cuando el usuario hace submit
const handleSubmit = e => {
  e.preventDefault();
  const erroresValidacion = validarCrearProducto(dataEditar);
  guardarErrores(erroresValidacion);
  guardarSubmitForm(true);
}

 //Cuando serealiza el evento de Blur
 const handleBlur = () => {
  const erroresValidacion = validarCrearProducto(dataEditar);
  guardarErrores(erroresValidacion);
}

 //Extraer el nombre del Proyecto
  const { nombre, descripcion, cantidad,ubicacion } = dataEditar; 
 
    async function crearProducto () {
        try {
            const response = await clienteAxios.put(`http://localhost:5000/api/productos/${id}`, {
              productoNombre: nombre,
              productoDescripcion: descripcion,
              productoCantidad: cantidad,
              productoUbicacion: ubicacion
            });
            return router.push('/');
        } catch (error) {
            console.log('No se puedo traer la data')
        }

    }

  return (
    <div>
      <Layout>      
          <>
          <h1
              css={css`
                  text-align: center;
                  margin-top: 5rem;
              `}
          >Editar Producto</h1>
          <Formulario
            onSubmit={handleSubmit}
            // noValidate
          >

            <fieldset>
              <legend>Informacion General</legend>

              <Campo>
                  <label htmlFor="nombre">Nombre</label>
                  <input 
                      type="text"
                      id="nombre"
                      placeholder="Nombre del Producto"
                      name="nombre"
                      value={nombre}
                       onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Campo>
          
              {errores.nombre && <Error>{errores.nombre}</Error>}
              <Campo>
                  <label htmlFor="descripcion">Descripcion</label>
                  <textarea 
                      id="descripcion"
                      name="descripcion"
                      value={descripcion}
                       onChange={handleChange}
                       onBlur={handleBlur}
                  />
              </Campo>
              {errores.descripcion && <Error>{errores.descripcion}</Error>}

              <Campo>
                  <label htmlFor="cantidad">Cantidad</label>
                  <input 
                      type="number"
                      id="cantidad"
                      placeholder="Cantidad del Producto"
                      name="cantidad"
                      value={cantidad}
                       onChange={handleChange}
                     onBlur={handleBlur}
                  />
              </Campo>
              {errores.cantidad && <Error>{errores.cantidad}</Error>}

              <Campo>
                  <label htmlFor="ubicacion">Ubicacion</label>
                  <input 
                      type="text"
                      id="ubicacion"
                      placeholder="Ubicacion del Producto"
                      name="ubicacion"
                      value={ubicacion}
                        onChange={handleChange}
                       onBlur={handleBlur}
                  />
              </Campo>
              {errores.ubicacion && <Error>{errores.ubicacion}</Error>}
            </fieldset>

            <InputSubtmit 
                type="submit"
                value="Editar Producto"
            />
          </Formulario>
        </>
        }
        
      </Layout>
    </div>
  )
}
  
export default EditarProducto