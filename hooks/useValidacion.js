import React, { useState, useEffect} from 'react';

const usesValidacion = (stateInicial, validar, fn) => {

    const [ valores, guardarValores ] = useState(stateInicial);
    const [ errores, guardarErrores ] = useState({});
    const [ submitForm, guardarSubmitForm ] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrores = Object.keys(errores).length === 0;

            if(noErrores) {
                fn(); // fn = Funcion que se ejecuta en el componente
            }

            guardarSubmitForm(false);
        }

    }, [errores]);

    //Funcion que se ejecuta conforme el usuario escribe algo.
    const handleChange = e => {       
        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    } 

    //Funcion que se ejecuta conforme el usuario escribe algo.
    const handleChangeImage = e => {     
        guardarValores({
            ...valores,
            [e.target.name] : e.target.files[0]
        })
    } 


    //Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    }
 
    //Cuando serealiza el evento de Blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleChange,
        handleChangeImage,
        handleSubmit,
        handleBlur
    };
}
 
export default usesValidacion;