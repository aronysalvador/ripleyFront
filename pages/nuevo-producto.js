import React from 'react';
import { css } from '@emotion/core';
import  { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubtmit, Error } from '../components/ui/Formulario';
import clienteAxios from '../config/axios';

//Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validaciones/validarCrearProducto';


const STATE_INICIAL = {
  nombre: '',
  descripcion: '',
  precio: 0,
  marca: '',
  imagen:''
}


const NuevoProducto = () => {

  const {
    valores,
    errores,
    handleChange,
    handleChangeImage,
    handleSubmit,
    handleBlur} = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

    const { nombre, descripcion, precio, marca, imagen } = valores;

     //Hook de routing para redireccionar
    const router = useRouter();

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);

    });

    async function crearProducto () {

      let imageBase64= await toBase64(valores.imagen)
 
        try {
            const response = await clienteAxios.post('/', {
              productoNombre: nombre,
              productoDescripcion: descripcion,
              productoPrecio: precio,
              productoMarca: marca,
              productoImagen: imageBase64
            });

            return router.push('/');
        } catch (error) {
            console.log('No se puedo guardar la data')
        }

    }
  return (
    <div>
      <Layout>      
          <>
          <h1
              css={css`
                  text-align:
                   center;
                  margin-top: 5rem;
              `}
          >Nuevo Producto</h1>
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
                  <label htmlFor="precio">precio</label>
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
                  <label htmlFor="marca">marca</label>
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
                      // value={imagen}
                      onChange={handleChangeImage}
                  />
              </Campo>

              {errores.imagen && <Error>{errores.imagen}</Error>}

            </fieldset>


            <InputSubtmit 
                type="submit"
                value="Crear Producto"
            />
          </Formulario>
        </>
    
      </Layout>
    </div>
  )
}

  
export default NuevoProducto