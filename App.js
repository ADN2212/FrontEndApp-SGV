import './App.css';
//Funciones para hacer las peticiones a la API:
//import getAllData from './RequestFunctions/getAllData.js';

//Componentes Compuestos:
import ListaObjetos from './componentes/ListaObjetos.jsx';
import BarraNavegacion from './componentes/BarraNavegacion.jsx';

//Hooks:
import React, { useState, useEffect} from 'react';

//Paquetes Extras:
import {  BrowserRouter as Router,
          Switch,
          Route,
          Link,
          Routes } from "react-router-dom";

function App() {
  /*
    Este es el componente principal, sobre el cual se renderizarán los demas.
  */

  const [choferes, setChoferes] = useState([]);//Lo que esta dentro es un valor inicial.
  const [vehiculos, setVehiculos] = useState([]);
  const [viajes, setViajes] = useState([]);

  async function getAllData(tipoObjeto, setterFunc){
  /*
  Esta función hace la request de todos los datos a la API para objetos de tipo chofer, vehiculo o viaje.
  El parametro setterFunc es la funcion que actualiza el estado del Hook.  
  */

  if (tipoObjeto === 'chofere' || tipoObjeto === 'vehiculo' || tipoObjeto === 'viaje'){  
    //alert(`Creando ${tipoObjeto} ...`);
    console.log(`Trayendo ${tipoObjeto}s ...`);
  } else  {

    alert(`Opcion no valida: ${tipoObjeto}`);
    return;//fin de la ejecución.
  }  

  let url = `http://localhost:8000/get_${tipoObjeto}s/all`

    try {
      
      let response = await fetch(url);
      let data = await response.json();
      //console.log(data);
      setterFunc(data);
      return;//Esto termina la ejecucion de la función.

    } catch (error) {
      alert(`Ha ocurrido un error: ${error}, cumpruebe que el servidor este funcionado.`);

    }
  }

  async function postData(json, tipoObjeto){
    /*
      Se encarga de hacer la POST request sobre el Endpoint de la API que corresponda al tipo de objeto (type).
      Es pasada como argumento a travez de los componente ListaObjetos y Forma/Chofer/Vehiculo/Viaje.
    */
    //alert('Working...');
    //console.log(choferes);

    //Endpoint de la API para crear un chofer, vehiculo o viaje:
    let url = `http://localhost:8000/post_${tipoObjeto}`;
    let jsonStr = JSON.stringify(json);//Transforma el json en una cadena de texto.

    if (tipoObjeto === 'chofer' || tipoObjeto === 'vehiculo' || tipoObjeto === 'viaje'){  
      alert(`Creando ${tipoObjeto} ...`);
      } else  {
        alert('Opcion no valida :(');
        return;//fin de la ejecución.
      }

    try {  
        let response = await fetch(url, {
          method: 'POST',
          body: jsonStr,
          headers: {'Content-type': 'application/json; charset=UTF-8'}
          })

        if (response.ok){
          //setChoferes([...choferes, json]);//Actualizar el array de choferes.
          alert(`Un nuevo ${tipoObjeto} ha sido agregado con exito!`);
          return;
        }
      
      } catch(error) {
        alert(`Ha ocurrido un error: ${error}, cumpruebe que el servidor este funcionado`);
        //console.log('Something Whent Wrong :(');
        return;
      }    
    }

  async function deleteData(id, tipoObjeto, evento){
    /*
      Se encarga de hacer la petición a la API para borrar el objeto.
    */
    let url = `http://localhost:8000/delete_${tipoObjeto}/${id}`

    if (tipoObjeto === 'chofer' || tipoObjeto === 'vehiculo' || tipoObjeto === 'viaje'){
      alert(`Borrando ${tipoObjeto}`);
      //setTimeOut()
    
    } else  {
      alert(`Tipo de objeto no valido: ${tipoObjeto}`);
      return;
    }

    try {

      let response = await fetch(url, {method: 'DELETE'});
      if (response.ok){
        //Este alert aparecera o no dependinedo de que tan rapido responda la API ¿?
        alert(`El chofer de id = ${id} ha sido borrado exitosamente.`);
        return;        
      }     
    } catch (error){
      //evento.preventDefault();
      alert(`Ha ocurrido un error: ${error}`);
    }    
  }


  async function putData(id, tipoObjeto, json){
    //Función que sirve para hacer una PUT request, es decir, actualizar los objetos de tipo chofer, vehiculo y viaje.

    let url = `http://localhost:8000/put_${tipoObjeto}/${id}`;

    //Transforma el JSON a una cadena de texto para poder ser enviado al Enpoint de la API.
    let jsonStr = JSON.stringify(json);
    console.log(jsonStr);
    
    if (tipoObjeto === 'chofer' || tipoObjeto === 'vehiculo' || tipoObjeto === 'viaje'){  
      alert(`Actualizando ${tipoObjeto} ...`);
      } else  {
        alert('Opcion no valida :(');
        return;//fin de la ejecución.
      }

      try {
        //En caso de que falle la request.
        let response = await fetch(url, 
          {   
            method: 'PUT',
            body: jsonStr,
            headers: {'Content-type': 'application/json; charset=UTF-8'}
          })

          if (response.ok){
            //Este alert aparecerá a no, dependindo de la rapidez con la que responda la API¿?
            alert(`El ${tipoObjeto} de id = ${id} ha sido editado con exito.`);
            return;
          }
      } catch (error){
        //Mostrar el error:        
        alert(`A ocurrido un error ${error}, cumpruebe que el servidor este funcionado.`);
        return;
      }                   
    }


  //Cada useEfect hará la peticion a la API de forma individual y asincrona cada vez que el componente principal (App.js) sea renderizado.
  useEffect(() => {getAllData('vehiculo', setVehiculos)}, []);
  //useEffect(() => {getAllData('chofere', setChoferes)}, []);
  //useEffect(() => {getAllData('viaje', setViajes)}, []);
  //useEffect(() => {console.log('<App /> ha sido renderizado ...')});

  return (
    <div>
      <Router>
        <h1> Welcome to the SGV </h1>
        <BarraNavegacion />
        <Routes>
          <Route path='/' element = {<h1> Home </h1>}/>
          
          <Route path = '/choferes' element = { <ListaObjetos  arrayObjetos = {choferes} tipoObjeto = {'chofer'} 
                                                              postFunc = {postData}     deleteFunc = {deleteData} 
                                                              putFunc = {putData}
                                                              /> } 
          />

          <Route path = '/vehiculos' element = {<ListaObjetos arrayObjetos = {vehiculos} tipoObjeto = {'vehiculo'} 
                                                              postFunc = {postData} deleteFunc = {deleteData} 
                                                              putFunc = {putData}
                                                              />} 


          />

          <Route path = '/viajes' element = {<ListaObjetos arrayObjetos = {viajes} tipoObjeto = {'viaje'} />} />
        </Routes>
    </Router>
    </div>      
    );  
}

export default App;
















