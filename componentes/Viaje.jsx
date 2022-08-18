import React from 'react';

function Viaje({jsonTipoViaje}){
	/*
	Este componente resive un json con los datos de un Viaje para poner ser mostrado
	en la Lista de Viajees.
	*/

	return (
		<div>
			<h2>Viaje de Tipo {jsonTipoViaje['tipo_viaje']}</h2>
			<ul>
					<li> ID: {jsonTipoViaje['id_viaje']} </li>
					<li> Fecha de Inicio: {jsonTipoViaje['inicio_viaje']} </li>
					<li> Fecha de Termino: {jsonTipoViaje['fin_viaje']} </li>
					<li> Costo: {jsonTipoViaje['costo_usd']} US$ </li>
					<li> Distancia Recorrida: {jsonTipoViaje['kms_recorridos']} Kilometros </li>
					<li> Estado: {jsonTipoViaje['estado_viaje']} </li>
					<li> 
							Chofer Asignado: {jsonTipoViaje['chofer']['nombre_completo']} 
							 , de Cedula: {jsonTipoViaje['chofer']['cedula']}  
							 , e ID: {jsonTipoViaje['chofer']['id_chofer']} 
					</li>
					<li> 
							Vehiculo Asignado: {jsonTipoViaje['vehiculo']['marca']} 
							, de Placa: {jsonTipoViaje['vehiculo']['placa']}
							, e ID: {jsonTipoViaje['vehiculo']['id_vehiculo']}
					</li>
					<li> Comentario: {jsonTipoViaje['comentarios']} </li>
					<li>
						<b>Opcines:</b>
						<ol>
							<li> Editar </li>
							<li> Eliminar </li>
						</ol>
					</li>
			</ul>
		</div>
		);
}


export default Viaje;

































