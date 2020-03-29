import React, { Fragment, useState, useEffect} from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
import PropTypes from "prop-types";

function App() {

  //Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de citas,para guardar de cita a citas
  const [citas,setCitas] = useState(citasIniciales);

  //useEffect para realizar ciertas operaciones cuando el state cambia
 useEffect(() => {
  

  if(citasIniciales){
     localStorage.setItem('citas',JSON.stringify(citas))
   } else {
     localStorage.setItem('citas', JSON.stringify([]));
   }
 }, [citas,citasIniciales]);

  //Funcion que tome citas actuales y agrege la nueva
  const crearCita = cita => {
    setCitas([
      ...citas,
      cita
    ]);
  }
//Funcion que elimine una cita por su ID
const eliminarCita = id => {
  const nuevasCitas = citas.filter(cita => cita.id !== id);
  setCitas(nuevasCitas);
}
//Mensaje condicional
const titulo = citas.length === 0 ? 'No hay chicas magicas'  : 'Elimina a una chica magica';


  return (
    <Fragment>
      <h1>Administrador de chicas magicas</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
            //le pasamos la funcion al componente mediante props, no es necesario poner ()
            crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
              //tenemos que pasarle la info de la cita, en react cuando listas siempre debes pasarle un key
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
     
    </Fragment>
  );
}
//Siempre debes documentar al final con propTypes
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default App;
