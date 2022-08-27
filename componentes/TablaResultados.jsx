import React from 'react';
import parseFecha from '../Funciones/parseFecha.js';
import { useState, useEffect} from 'react';

function TablaResultados({viajesFiltrados}){

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
			<tr> <h4> Resultados </h4> </tr>
			<tr>
				<th>
					<b> id viaje </b>
				</th>
				<th>
					<b> Nombre Chofer </b>
				</th>
				<th>
					<b> Cedula </b>
				</th>
				<th>
					<b> Marca Vehiculo </b>
				</th>
				<th>
					<b> Placa </b>
				</th>
				<th>
					<b> Fecha Inicio </b>
				</th>
				<th>
					<b> Hora Inicio </b>
				</th>
				<th>
					<b> Fecha de Termino </b>
				</th>
				<th>
					<b> Hora Termino </b>
				</th>
				<th>
					<b> Costo en USD$ </b>
				</th>	
			</tr>
			{
				viajesFiltrados.map(
					(viaje) => {
						return (
							<tr>
								<td>
									{viaje['id_viaje']}
								</td>
								<td>
									{ viaje['chofer'] ? 
											`${viaje['chofer']['nombre_completo']}` 
										: <> Borrado </>
									}
								</td>
								<td>
									{ viaje['chofer'] ? 
											`${viaje['chofer']['cedula']}` 
										: <> Borrado </>
									}
								</td>
								
								<td>
									{ 
										viaje['vehiculo'] ? 
											`${viaje['vehiculo']['marca']}` 
											: <> Borrado </>
									}									
								</td>

								<td>
									{ 
										viaje['vehiculo'] ? 
											`${viaje['vehiculo']['placa']}` 
											: <> Borrado </>
									}									
								</td>
								
								<td>
									{	parseFecha(viaje['inicio_viaje']).split(' ')[0]}
								</td>
								<td>
									{	parseFecha(viaje['inicio_viaje']).split(' ')[3]}
								</td>
								<td>
									{ parseFecha(viaje['fin_viaje']).split(' ')[0]}
								</td>
								<td>
									{ parseFecha(viaje['fin_viaje']).split(' ')[3]}
								</td>
								<td>
									{viaje['costo_usd']}
								</td>
							</tr>
						)
					}
				)
			}
			<h3>{`Ganancia Total  = ${totalGanancias.toLocaleString('en')} US$`}</h3>
		</>		
	);
}

export default TablaResultados;	






































