import React from 'react';
import parseFecha from '../Funciones/parseFecha.js';
import { useState, useEffect } from 'react';

function TablaResultados({ viajesFiltrados, fechaInicio, fechaFin }) {
	// En este componete se mostraran los resultados de la busqueda en caso de que esta haya sido exitosa.

	//Calcular las ganancias totales en el intervalo dado.
	let totalGanancias = viajesFiltrados
		.map((viaje) => {
			return parseFloat(viaje['costo_usd']);
		})
		.reduce(
			//Este metodo permite crear un acumulador para sumar los valores de un array.
			(costoAnterior, costoActual) => {
				return costoAnterior + costoActual;
			},
		);

	return (
		<div className='p-3 justify-content-center m-3'>
			<table className='table table-dark table-hover table-bordered border border-dark text-white'>
				<thead>
					<tr>
						<td colSpan='10' className='table-dark'>
							<center>
								{fechaInicio && fechaFin ? (
									<h4 className='text-primary'>
										{' '}
										{`Viajes hechos entre las fechas ${fechaInicio} y ${fechaFin}`}{' '}
									</h4>
								) : (
									<h4 className='text-primary'>
										{' '}
										Todos los Viajes Realizados{' '}
									</h4>
								)}
							</center>
						</td>
					</tr>
					<tr className='table-dark'>
						<th scope='col' className='text-center text-primary'>
							id viaje
						</th>
						<th scope='col' className='text-center text-primary'>
							Nombre Chofer
						</th>
						<th scope='col' className='text-center text-primary'>
							Cedula
						</th>
						<th scope='col' className='text-center text-primary'>
							Marca Vehiculo
						</th>
						<th scope='col' className='text-center text-primary'>
							Placa
						</th>
						<th scope='col' className='text-center text-primary'>
							Fecha Inicio
						</th>
						<th scope='col' className='text-center text-primary'>
							Hora Inicio
						</th>
						<th scope='col' className='text-center text-primary'>
							Fecha de Termino
						</th>
						<th scope='col' className='text-center text-primary'>
							Hora Termino
						</th>
						<th scope='col' className='text-center text-primary'>
							Costo en USD$
						</th>
					</tr>
				</thead>
				<tbody>
					{viajesFiltrados.map((viaje) => {
						//Para ahorar potencia de computo:(?)
						let chofer = viaje['chofer'];
						let vehiculo = viaje['vehiculo'];

						return (
							<tr>
								<td className='text-center'>{viaje['id_viaje']}</td>
								<td
									className={
										chofer ? 'text-center' : 'text-danger text-center'
									}>
									{chofer ? `${chofer['nombre_completo']}` : <> Eliminado </>}
								</td>
								<td
									className={
										chofer ? 'text-center' : 'text-danger text-center'
									}>
									{chofer ? `${chofer['cedula']}` : <> Eliminado </>}
								</td>

								<td
									className={
										vehiculo ? 'text-center' : 'text-danger text-center'
									}>
									{vehiculo ? `${vehiculo['marca']}` : <> Eliminado </>}
								</td>

								<td
									className={
										vehiculo ? 'text-center' : 'text-danger text-center'
									}>
									{vehiculo ? `${vehiculo['placa']}` : <> Eliminado </>}
								</td>

								<td className='text-center'>
									{parseFecha(viaje['inicio_viaje']).split(' ')[0]}
								</td>
								<td className='text-center'>
									{parseFecha(viaje['inicio_viaje']).split(' ')[3]}
								</td>
								<td className='text-center'>
									{parseFecha(viaje['fin_viaje']).split(' ')[0]}
								</td>
								<td className='text-center'>
									{parseFecha(viaje['fin_viaje']).split(' ')[3]}
								</td>
								<td className='text-center'>{viaje['costo_usd']}</td>
							</tr>
						);
					})}
					<td colSpan='5' className='table-dark'>
						<center>
							<h5 className='text-primary'> Ganancia Total </h5>
						</center>
					</td>
					<td colSpan='5' className='table-dark'>
						<center>
							<h5 className='text-primary'>
								{`${totalGanancias.toLocaleString('en')} US$`}
							</h5>
						</center>
					</td>
				</tbody>
			</table>
		</div>
	);
}

export default TablaResultados;
