import React from 'react';
import { useState, useEffect } from 'react';
import alCambiar from '../Funciones/alCambiar.js';
import TablaResultados from './TablaResultados.jsx';
import swal from 'sweetalert';
import '../estilos/estiloAviso.css';

function CalcularGanacias({ arrayViajes }) {
	const [fechas, setFechas] = useState({});
	const [viajesFiltrados, setViajesFiltrados] = useState([]);

	function filtrarViajes(evento) {
		//Filtra los viajes segun las fechas de inicio y fin que se den como parametro en la forma.
		evento.preventDefault();

		let inicioViaje = new Date(fechas['inicio_viaje']);
		let finViaje = new Date(fechas['fin_viaje']);
		let deltaTime = finViaje - inicioViaje; //Retorna el tiempo transcurrido en milisegundos:

		if (deltaTime <= 0) {
			swal({
				icon: 'error',
				title: 'Error Fechas',
				text: 'Procure que la fecha de inicio del viaje sea anterior a la del final de este.',
			});
			evento.preventDefault();
			return; //Si no se cumple esta condicion, no es nesesario seguir ejecutando esta función.
		}

		if (deltaTime < 604800000) {
			//1 hora = 60 mins = 3,600 segs = 3,600,000 milisegs * 24  horos * 7 dias = una semana.
			swal({
				icon: 'error',
				title: 'Tiempo Minimo',
				text: 'Por favor defina un intervalo de tiempo de almenos una semana de duración.',
			});
			evento.preventDefault();
			return;
		}

		//Hacer coincidir las fechas con el formato: '2022-06-06T23:30:00Z'
		inicioViaje = fechas['inicio_viaje'] + 'T00:00:00Z'; //Inicio del primer dia.
		finViaje = fechas['fin_viaje'] + 'T23:59:59Z'; //Final del ultimo dia.

		let resultado = arrayViajes.filter((viaje) => {
			//Comprobar si las fechas del viaje estan dentro del intervalo definidos por el usuario.
			return (
				viaje['inicio_viaje'] >= inicioViaje && viaje['fin_viaje'] <= finViaje
			);
		});

		//Asignar el resultado del filtro al hook.
		setViajesFiltrados(resultado);

		if (resultado.length === 0) {
			swal({
				title: 'No Encontrado',
				icon: 'warning',
				text: `No se realizó ningun viaje entre las fechas ${fechas['inicio_viaje']} y ${fechas['fin_viaje']}`,
			});
		}
	}

	function todosLosViajes(evento) {
		//Hace que los viajes filtados sean todos los viajes para calcular las Ganancias Globales de la Empresa.
		evento.preventDefault();
		setViajesFiltrados(arrayViajes);
	}

	return (
		<div>
			<div>
				<center>
					<div className='bg-dark AnchoCalcGan border border-primary border-3 rounded-5 justify-content-center p-3 m-3'>
						<h2 className='display-5 text-primary'> Cálculo de Ganancias </h2>
						<p className='lead text-white'>
							En este apartado usted podrá calcular las ganancias que ha
							generado la empresa en un intervalo de tiempo dado, y le será
							retornada una tabla con la información referente a los viajes
							pertenecientes a dicho lapso de teimpo, ademas del total de
							ganacias generado en este.
						</p>
					</div>
				</center>
			</div>

			{
				/* Mostrar la forma solo si no hay viajes filtrados, es decir, si no se ha calculado nada */
				viajesFiltrados.length === 0 ? (
					<div className='container-fluid'>
						<div className='row'>
							<div className='col m-3 bg-dark AnchoForma p-3 border border-primary border-3 rounded-5 text-white'>
								<form
									onSubmit={(evento) => {
										filtrarViajes(evento);
									}}>
									<h6 className='display-6 text-primary'>
										{' '}
										Definir Intervalo de Tiempo{' '}
									</h6>
									<label className='form-label'>
										Fecha Inicio:
										<input
											className='form-control form-control-sm'
											type='date'
											name='inicio_viaje'
											value={fechas.inicio_viaje || ''}
											onChange={(evento) => {
												alCambiar(evento, fechas, setFechas);
											}}
											required
										/>
									</label>
									<br></br>
									<label className='form-label'>
										Fecha Termino:
										<input
											className='form-control form-control-sm'
											type='date'
											name='fin_viaje'
											value={fechas.fin_viaje || ''}
											onChange={(evento) => {
												alCambiar(evento, fechas, setFechas);
											}}
											required
										/>
									</label>
									<br></br>
									<input
										type='submit'
										className='btn btn-success m-2'
										value='Calcular'
									/>
								</form>
							</div>

							<div className='col m-3 bg-dark AnchoForma p-3 border border-primary border-3 rounded-5 text-white '>
								<form
									onSubmit={(evento) => {
										todosLosViajes(evento);
									}}>
									<h6 className='display-6 text-primary'>
										{' '}
										Haga click aqui si desea ver las ganancias globales{' '}
									</h6>
									<br></br>
									<input
										type='submit'
										className='btn btn-success m-2'
										value='Calcular Ganancias Globales'
									/>
								</form>
							</div>
						</div>
					</div>
				) : (
					/* Este boton aparecera cundo haya viajes filtrados */
					<button
						type='button'
						className='btn btn-danger m-2'
						onClick={() => {
							setViajesFiltrados([]);
						}}>
						Limpiar Pantalla
					</button>
				)
			}

			{!(viajesFiltrados.length === 0) ? (
				<TablaResultados
					viajesFiltrados={viajesFiltrados}
					fechaInicio={fechas['inicio_viaje']}
					fechaFin={fechas['fin_viaje']}
				/>
			) : (
				<div>
					<center>
						<h4 className='text-danger m-3'> No se han filtrado viajes. </h4>
					</center>
				</div>
			)}
		</div>
	);
}

export default CalcularGanacias;

//type = 'button' className = 'btn btn-success' value = 'Calcular'
//className = 'm-3 bg-dark AnchoForma p-3 border border-primary border-3 rounded-5 text-white'

