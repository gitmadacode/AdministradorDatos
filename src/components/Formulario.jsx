import React, { Fragment, useState } from "react";
import uuid from "uuid/v4";

const Formulario = ({crearCita}) => { //llamamos a la funcion crearCita del componente padre
  //Crear State de citas
  const [cita, setCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  });
  //Crearemos un segundo state para los errores
  const [error, setError] = useState(false);

  //Funcion que se ejecuta cada que un user escribe en un input
  const actualizarState = e => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value
    });
  };

  //Extraer los valores, destructuring para acortar el codigo (para despues no usar cita.fecha,cita.sintomas etc)
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //Cuando el usuario presiona agregar cita
  const submitCita = e => {
    e.preventDefault();

    //Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      //siempre debes poner un return , por si hay un error no se siga ejecutando el codigo
      setError(true); //el state de error pasa a verdadero
      return;
    }
    //Eliminar el mensaje previo
    setError(false);
    //Asignar un ID
    cita.id = uuid();
    console.log(cita);
    //Crear la cita
    crearCita(cita);
    //Reiniciar el Form
    setCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: ""
    })
  };
  return (
    <Fragment>
      <h2>Realizar contrato</h2>
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre Chica</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Chica"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Kyubey Propietario</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Kyubey Propietario"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha de ingreso</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora de ingreso</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>El deseo de la chica</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          placeholder="Que es lo que deseo la chica?"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Crear contrato
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
