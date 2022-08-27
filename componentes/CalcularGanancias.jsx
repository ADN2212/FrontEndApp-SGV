import React from 'react';
import { useState, useEffect} from 'react';
import alCambiar from '../Funciones/alCambiar.js';
import TablaResultados from './TablaResultados.jsx';

function CalcularGanacias({arrayViajes}){

	//useEffect(() => {console.log(arrayViajes)});

	const [fechas, setFechas] = useState({});
	const [viajesFiltrados, setViajesFiltrados] = useState([]);

	function filtrarViajes(evento){
		//Filtra los viajes segun las fechas de inicio y fin que se den como parametro en la forma.
		evento.preventDefault();

		let inicioViaje = new Date(fechas['inicio_viaje']);
		let finViaje = new Date(fechas['fin_viaje']);
		let deltaTime = finViaje - inicioViaje;//Retorna el tiempo transcurrido en milisegundos:


		if (deltaTime <= 0){
			alert(`La fecha del finanal del intervalo de tiempo debe ser mayor que la del inicio.`);
			evento.preventDefault();
			return;//Si no se cumple esta condicion, no es nesesario seguir ejecutando esta función.
		}

		if (deltaTime < 604800000){//1 hora = 60 mins = 3,600 segs = 3,600,000 milisegs * 24  horos * 7 dias = una semana.
			alert(`Por favor defina un intervalo de tiempo que sea equivalente a una semana como minimo.`);
			evento.preventDefault();
			return;
		}

		//Hacer coincidir las fechas con el formato: '2022-06-06T23:30:00Z'

		inicioViaje = fechas['inicio_viaje'] + 'T00:00:00Z';//Inicio del primer dia.
		finViaje = fechas['fin_viaje'] + 'T23:59:59Z';//Final del ultimo dia.
		
		
		let resultado = arrayViajes.filter(
			(viaje) => {
				//Comprobar si las fechas del viaje estan dentro del intervalo definidos por el usuario.
				return	viaje['inicio_viaje'] >= inicioViaje && viaje['fin_viaje'] <= finViaje; 		
				}
			);

		//console.log(resultado);
		//Asignar el redultado del filtro al hook.
		setViajesFiltrados(resultado)
		//console.log(viajesFiltrados);
		
		if(resultado.length === 0){
			alert('No se ha hayado ningun viaje en este intervalo de tiempo.');
		}	
	}


	return (
		<div>
			<h2> Calculo de Ganacias </h2>
			<p>
				En este apartado usted podrá calcular las ganancias que ha generado la empresa en un intervalo de tiempo dado, 
				y le será retornada una tabla con la información referente a los viajes pertenecientes a dicho lapso de teimpo,
				ademas del total de ganacias generado en este.
			</p>
			<form onSubmit = {(evento) => {filtrarViajes(evento)}} >
				<label>
					Fecha Inicio:
						<input 
							type='date'
							name = 'inicio_viaje'
							value = {fechas.inicio_viaje || ""}
							onChange = {(evento) => {alCambiar(evento, fechas, setFechas)}}
							required />
				</label>

				<label>
					Fecha Termino:
						<input 
							type='date'
							name = 'fin_viaje'
							value = {fechas.fin_viaje|| ""}
							onChange = {(evento) => {alCambiar(evento, fechas, setFechas)}}
							required />
				</label>

				<input type='submit' />
			</form>
			<button onClick = {() => {setViajesFiltrados([])}}>
				Limpiar Pantalla
			</button>
			{ !(viajesFiltrados.length === 0) ? <TablaResultados viajesFiltrados = {viajesFiltrados} /> : <h3> No hay Viajes </h3> }
			</div>
		);
}


export default CalcularGanacias;




/*

				{
					viajesFilrados.map(
						(viaje) => {
							return (
								<tr>
									<td>{viaje['id_viaje']}</td>
								</tr>
							)
						}
					)
				}

*/

































