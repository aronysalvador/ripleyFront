import React, { useState} from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Formulario, Campo, InputSubtmit, Error } from '../ui/Formulario';
import Link from 'next/link';
import clienteAxios from '../../config/axios';


const Producto = styled.li`
    padding: 4rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
`;

const DescripcionProducto = styled.div`
    flex:0 1 600px;
    display:grid;
    grid-template-columns: 6fr 1fr;
    column-gap: 2rem;
`;

const Titulo = styled.a`
    font-size: rem;
    font-weight:bold;
    margin: 0;
    vertical-align: top;
    :hover {
        cursor: pointer;
    }
`
const TextoDescripcion = styled.p`
    font-size:1.6rem;
    margin:0;
    color: #888;
`

const Nombre = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;

    div {
        font-size: 2rem;
    }

    p {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`

 const InputSubtmit2 = styled.input`
    background-color: gray;
    width: auto;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight:700;

    &:hover {
        cursor:pointer;
    }
`;

    const InputSubtmit3 = styled.input`
    background-color: var(--naranja);
    width: auto;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight:700;


    &:hover {
        cursor:pointer;
    }
    `;

const DetallesProducto = ({producto ,obtenerProductos}) => {
    const router = useRouter();
 
    const { _id, productoNombre, productoDescripcion, productoPrecio, productoMarca, productoImagen  } = producto;

    //Eliminar un producto
    const handleEliminar = e => {
        e.preventDefault();
        const idEliminar = _id;
        eliminarProductos(idEliminar);
        
    }

    const eliminarProductos = async (idEliminar) => {
        try {        
             await clienteAxios.delete(`/${idEliminar}`); 
             obtenerProductos()        
        } catch (error) {
            console.log('No se pudo eliminar la data')
        }
    }
      

    return (  
        <Producto>
            <DescripcionProducto>
                <div>
                    <Nombre>
                        <Titulo> {productoNombre}</Titulo>
                    </Nombre>

                    <Titulo>Descripcion</Titulo>
                    <TextoDescripcion>{productoDescripcion}</TextoDescripcion>

                    <Titulo>Precio</Titulo>
                    <TextoDescripcion> {productoPrecio}</TextoDescripcion>

                    <Titulo>Marca</Titulo>
                    <TextoDescripcion>{productoMarca}</TextoDescripcion>
                    {productoImagen&& <><Titulo>Imagen:  &nbsp;  &nbsp;  &nbsp;</Titulo> <img src={productoImagen}  style={{width: "250px", height: "100px"}} alt="Imagen" /></>}
                    

                </div>
            </DescripcionProducto>
            <form>
                <Link href='/editar-producto/[id]' as={`/editar-producto/${_id}`}>
                    <InputSubtmit2 
                        type="submit"              
                        value="Editar"
                    />    
                </Link>   
                      
            </form>         
            <form onSubmit={handleEliminar}>
                <InputSubtmit3
                    type="submit"
                    value="Eliminar Producto"
                />
            </form>
        </Producto>       
    );
}
 
export default DetallesProducto;