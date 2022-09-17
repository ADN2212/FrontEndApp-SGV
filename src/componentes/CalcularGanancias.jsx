import React from 'react';
import { useState, useEffect} from 'react';
import alCambiar from '../Funciones/alCambiar.js';
import TablaResultados from './TablaResultados.jsx';
import swal from 'sweetalert';


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
			//alert(`La fecha del finanal del intervalo de tiempo debe ser mayor que la del inicio.`);
			swal({
				icon: 'error',
				title: 'Error Fechas',
				text: 'Procure que la fecha de inicio del viaje sea anterior a la del final de este.'
			});
			evento.preventDefault();
			return;//Si no se cumple esta condicion, no es nesesario seguir ejecutando esta función.
		}

		if (deltaTime < 604800000){//1 hora = 60 mins = 3,600 segs = 3,600,000 milisegs * 24  horos * 7 dias = una semana.
			//alert(`Por favor defina un intervalo de tiempo que sea equivalente a una semana como minimo.`);			
			swal({
				icon: 'error',
				title: 'Tiempo Minimo',
				text: 'Por favor defina un intervalo de tiempo de almenos una semana de duración.'
			});
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
			//alert('No se ha hayado ningun viaje en este intervalo de tiempo.');
			swal({
				title: 'No Encontrado',
				icon: 'warning',
				text: `No se realizó ningun viaje entre las fechas ${fechas['inicio_viaje']} y ${fechas['fin_viaje']}`
			});
		}	
	}


	return (
		<div>
			<div className = 'bg-dark border border-primary border-3 rounded-5 justify-content-center p-3 m-3'>
				<center>
					<h2 className = 'display-4 text-primary'> Cálculo de Ganancias </h2>
					<p className = 'lead text-white'>
						En este apartado usted podrá calcular las ganancias que ha generado la empresa en un intervalo de tiempo dado, 
						y le será retornada una tabla con la informació n referente a los viajes pertenecientes a dicho lapso de teimpo,
						ademas del total de ganacias generado en este.
					</p>
				</center>
			</div>
			{ /* Mostrar la forma solo si no hay viajes filtrados, es decir, si no se ha calculado nada */
				(viajesFiltrados.length === 0) ?
				<form onSubmit = {(evento) => {filtrarViajes(evento)}} className = 'm-3'>
					<h6 className = 'display-6 text-primary'> Definir Intervalo de Tiempo </h6>
					<label className = 'form-label'>
						Fecha Inicio:
							<input
								className = 'form-control form-control-sm' 
								type='date'
								name = 'inicio_viaje'
								value = {fechas.inicio_viaje || ""}
								onChange = {(evento) => {alCambiar(evento, fechas, setFechas)}}
								required />
					</label>
					<br></br>
					<label className = 'form-label'>
						Fecha Termino:
							<input
								className = 'form-control form-control-sm' 
								type='date'
								name = 'fin_viaje'
								value = {fechas.fin_viaje|| ""}
								onChange = {(evento) => {alCambiar(evento, fechas, setFechas)}}
								required />
					</label>
					<br></br>
					<input type='submit' className = 'btn btn-success m-2' value = 'Calcular' />
				</form>

			:
				/* Este boton aparecera cundo haya viajes filtrados */
				<button type = 'button' className = 'btn btn-danger m-2' onClick = {() => {setViajesFiltrados([])}}>
					Limpiar Pantalla
				</button>
			}

			{ !(viajesFiltrados.length === 0) ? 
					<TablaResultados	viajesFiltrados = {viajesFiltrados} 
														fechaInicio = {fechas['inicio_viaje']}
														fechaFin = {fechas['fin_viaje']} />

													: <h4 className = 'text-danger m-3'> No se han filtrado viajes. </h4> }
			</div>
		);
}


export default CalcularGanacias;

//type = 'button' className = 'btn btn-success' value = 'Calcular'


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

































