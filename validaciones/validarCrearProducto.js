export default function validarCrearProducto(valores) {
    
    let errores = {};

    //Validar el nombre del producto
    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio";
    }

    //Validar la descripcion del producto
    if(!valores.descripcion){
        errores.descripcion = "La descripcion es obligatoria";
    }else if(valores.descripcion.length < 10){
        errores.descripcion = "La descripcion debe tener al menos 10 caracteres";
    }

    //Validar la precio del producto
    if(!valores.precio){
        errores.precio = "La precio  del producto es obligatorio";
    }else if(valores.precio.value < 1){
        errores.descripcion = "La precio del producto debe ser al menos 1";
    }

    //Validar la marca del producto
    if(!valores.marca){
        errores.marca = "La marca es obligatoria";
    }else if(valores.marca.length < 5){
        errores.marca = "La descripcion debe ser mas especifica";
    }

    //Validar el nombre del producto
    if(!valores.imagen || valores.imagen.length){
        errores.imagen = "La imagen es obligatoria";
    }

    return errores;
}