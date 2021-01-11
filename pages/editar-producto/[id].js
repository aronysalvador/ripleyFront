

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
  precio: 0,
  marca: '',
  imagen:''
}

const EditarProducto = (producto) => {

  //Routing para obtener el id actual
  const router = useRouter();
  const { query: {id} } = router;

  //const tareaContext = useContext(productoContext);

  const [ dataEditar , setDataEditar ] = useState({
    nombre: '',
    descripcion:' ',
    precio: 0,
    marca: ''
    });

  const [paso, guardarPaso] = useState(true);

  const [ submitForm, guardarSubmitForm ] = useState(false);

  const [ errores, guardarErrores ] = useState({});

  useEffect(()=>{
    
    if(id){
      const obtenerProductos = async () => {
        try {
          const response = await clienteAxios.put(`/${id}`);
          const data = response.data;

            setDataEditar({
              nombre : data.producto.productoNombre,
              descripcion: data.producto.productoDescripcion,
              precio: data.producto.productoPrecio, 
              marca: data.producto.productoMarca,
              imagen: data.producto.productoImagen
  
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

const handleChangeImage = e => {     
  setDataEditar({
      ...dataEditar,
      [e.target.name] : e.target.files[0]
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
  const { nombre, descripcion, precio,marca } = dataEditar; 
  const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
 
    async function crearProducto () {

        let imageBase64= await toBase64(dataEditar.imagen)
      
        try {
            const response = await clienteAxios.put(`/${id}`, {
              productoNombre: nombre,
              productoDescripcion: descripcion,
              productoPrecio: precio,
              productoMarca: marca,
              productoImagen: imageBase64
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
            {dataEditar.nombre && <fieldset>
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
                  <label htmlFor="precio">Precio</label>
                  <input 
                      type="number"
                      id="precio"
                      placeholder="precio del Producto"
                      name="precio"
                      value={precio}
                       onChange={handleChange}
                     onBlur={handleBlur}
                  />
              </Campo>
              {errores.precio && <Error>{errores.precio}</Error>}

              <Campo>
                  <label htmlFor="marca">Marca</label>
                  <input 
                      type="text"
                      id="marca"
                      placeholder="marca del Producto"
                      name="marca"
                      value={marca}
                        onChange={handleChange}
                       onBlur={handleBlur}
                  />
              </Campo>
              {errores.marca && <Error>{errores.marca}</Error>}
              <Campo>
                  <label htmlFor="marca">Imagen</label>
                  <input 
                      type="file"
                      id="imagen"
                      name="imagen"
                      
                      onChange={handleChangeImage}
                  />
              </Campo>
              {errores.imagen && <Error>{errores.imagen}</Error>}
            </fieldset>}
 
            <InputSubtmit 
                type="submit"
                value="Editar Producto"
            />
          </Formulario>
        </>

      </Layout>
    </div>
  )
}
  
export default EditarProducto