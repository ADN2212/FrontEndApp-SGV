import React from 'react';
import parseFecha from '../Funciones/parseFecha.js';
import { useState, useEffect} from 'react';

function TablaResultados({viajesFiltrados, fechaInicio, fechaFin}){

// En este componete se mostraran los resultados de la busqueda en caso de que esta haya sido exitosa.	
	
	//Calcular las ganancias totales en el intervalo dado. 
	let totalGanancias = viajesFiltrados.map(
		(viaje) => { 
			return parseFloat(viaje['costo_usd']);
			} 
		).reduce(
			//Este metodo permite crear un acumulador para sumar los valores de un array.
			(costoAnterior, costoActual) => {
				return costoAnterior + costoActual;
			}
		);

	//useEffect(() => {console.log(totalGanancias)});

	return(
		<> 
		<table className = 'table table-hover table-bordered border border-secundary border-3 m-3'>
			<thead>
				<tr>
					<td colSpan = '10' className = 'table-dark'>
						<center> 
							<h4 className = 'text-primary'> {`Viajes hechos entre las fechas ${fechaInicio} y ${fechaFin}`} </h4> 
						</center>
					</td>
				</tr>
				<tr className = 'table-dark'>
					<th scope = 'col' className = 'text-center'>
						id viaje 
					</th>
					<th scope = 'col' className = 'text-center'>
						 Nombre Chofer 
					</th>
					<th scope = 'col' className = 'text-center'>
						 Cedula 
					</th>
					<th scope = 'col' className = 'text-center'>
						 Marca Vehiculo 
					</th>
					<th scope = 'col' className = 'text-center'>
						 Placa 
					</th>
					<th scope = 'col' className = 'text-center'>
						 Fecha Inicio 
					</th>
					<th scope = 'col' className = 'text-center'>
						 Hora Inicio 
					</th>
					<th scope = 'col' className = 'text-center'>
						 Fecha de Termino 
					</th>
					<th scope = 'col' className = 'text-center'>
						 Hora Termino 
					</th>
					<th scope = 'col' className = 'text-center'>
						Costo en USD$ 
					</th>	
				</tr>
			</thead>
			<tbody>
				{
				viajesFiltrados.map(
					(viaje) => {

						//Para ahorar potencia de computo:(?)
						let chofer = viaje['chofer'];
						let vehiculo = viaje['vehiculo']; 

						return (
							<tr>
								<td className = 'text-center'>
									{viaje['id_viaje']}
								</td>
								<td className = {chofer ? 'text-center' : 'text-danger text-center'} >
									{ chofer ? 
											`${chofer['nombre_completo']}` 
										: <> Borrado </>
									}
								</td>
								<td className = {chofer ? 'text-center' : 'text-danger text-center'}>
									{ chofer ? 
											`${chofer['cedula']}` 
										: <> Borrado </>
									}
								</td>
								
								<td className = {vehiculo ? 'text-center' : 'text-danger text-center'}>
									{ 
										vehiculo ? 
											`${vehiculo['marca']}` 
											: <> Borrado </>
									}									
								</td>

								<td  className = {vehiculo ? 'text-center' : 'text-danger text-center'}>
									{ 
										vehiculo ? 
											`${vehiculo['placa']}` 
											: <> Borrado </>
									}									
								</td>
								
								<td className = 'text-center'>
									{	parseFecha(viaje['inicio_viaje']).split(' ')[0]}
								</td>
								<td className = 'text-center'>
									{	parseFecha(viaje['inicio_viaje']).split(' ')[3]}
								</td>
								<td className = 'text-center'>
									{ parseFecha(viaje['fin_viaje']).split(' ')[0]}
								</td>
								<td className = 'text-center'>
									{ parseFecha(viaje['fin_viaje']).split(' ')[3]}
								</td>
								<td className = 'text-center'>
									{viaje['costo_usd']}
								</td>
							</tr>
							)
						}
					)
				}
					<td colspan = '5' className = 'table-dark'>
						<center>
					 		<h6> Ganancia Total </h6> 
					 	</center>
					 </td>
					<td colspan = '5' className = 'table-dark'>
						<center>
							<h6>
								{`${totalGanancias.toLocaleString('en')} US$`}
							</h6>
						</center>
					</td>
				</tbody>
			</table>
		</>		
	);
}

export default TablaResultados;	






































