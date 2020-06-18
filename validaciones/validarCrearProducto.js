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

    //Validar la cantidad del producto
    if(!valores.cantidad){
        errores.cantidad = "La cantidad  del producto es obligatorio";
    }else if(valores.cantidad.value < 1){
        errores.descripcion = "La cantidad del producto debe ser al menos 1";
    }

    //Validar la ubicacion del producto
    if(!valores.ubicacion){
        errores.ubicacion = "La ubicacion es obligatoria";
    }else if(valores.ubicacion.length < 5){
        errores.ubicacion = "La descripcion debe ser mas especifica";
    }

    return errores;
}