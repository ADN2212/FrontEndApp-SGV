import React from 'react';
import { useState, useEffect} from 'react';
import OpcionesEliminar from './OpcionesEliminar.jsx';
import cambiarEstado from '../Funciones/cambiarEstado.js';
import FormaVehiculo from './FormaVehiculo.jsx';


function Vehiculo({jsonTipoVehiculo, deleteFunc, putFunc, arrayVehiculos}){
	/*
	Este componente resive un json con los datos de un vehiculo para poner ser mostrado
	en la Lista de Vehiculos.
	*/

	const [mostrarOpcionesEliminar, setMostrarOpcionesEliminar] = useState(false);
	const [mostrarForma, setMostrarForma] = useState(false);

	function renderObjects(mostrar, objetoAMostrar){

		if (mostrar === true){
			
			if (objetoAMostrar === 'OpcionesEliminar'){
			//return <h2> Hola Marola </h2>

			return <OpcionesEliminar 	id = {jsonTipoVehiculo['id_vehiculo']}
																deleteFunc = {deleteFunc}
			 													tipoObjeto = 'vehiculo' />
			}

			if (objetoAMostrar === 'FormaVehiculo'){
			return <FormaVehiculo	arrayVehiculos = {arrayVehiculos}
									jsonTipoVehiculo = {jsonTipoVehiculo}
									putFunc = {putFunc} />
			}
		}

		return;//No renderizar ningun componente.
	}

	return (
		<div>
			<h2>Omnibus Marca: {jsonTipoVehiculo['marca']}</h2>
			<ul>
				<li> ID: {jsonTipoVehiculo['id_vehiculo']} </li>
				<li> Placa No: {jsonTipoVehiculo['placa']} </li>
				<li> Peso: {jsonTipoVehiculo['peso_en_toneladas']} toneladas </li>
				<li> Tipo de Combustible: {jsonTipoVehiculo['tipo_de_comnustible']} </li>
				<li> Total de Kilometros Recorridos: {jsonTipoVehiculo['kms_recorridos']} </li>
				<li> Velocidad Máxima(km/h): {jsonTipoVehiculo['velocidad_maxima']} </li>
				<li> Años de Explotación: {jsonTipoVehiculo['agnos_explotacion']} años </li>
				<li> Tipo de Servicio: {jsonTipoVehiculo['tipo_servicio']} </li>
				<li> Cantidad de Asientos: {jsonTipoVehiculo['cantidad_asientos']} </li>
				<li> Cantidad de Viajes: {jsonTipoVehiculo['cantidad_viajes']} </li>
				<li> ¿Está disponible? { jsonTipoVehiculo['disponibilidad'] ? 'Si' : 'No'} </li>
				<li> ¿Tiene aíre acondicionado? { jsonTipoVehiculo['climatizacion'] ? 'Si' : 'No'} </li>				
				<li>
					<b>Opcines:</b>
					<ol>
						<li>
							<button onClick = {() => {cambiarEstado(mostrarForma, setMostrarForma)}}> 
								{!mostrarForma ? 'Editar': 'No Editar'}
							</button>
							{renderObjects(mostrarForma, 'FormaVehiculo')} 
						</li>	
						<li>
							<button onClick = {() => {cambiarEstado(mostrarOpcionesEliminar, setMostrarOpcionesEliminar)}}>
								{!mostrarOpcionesEliminar ? 'Eliminar' : 'No Eliminar'} 
							</button>
							{renderObjects(mostrarOpcionesEliminar, 'OpcionesEliminar')}							
						</li>
					</ol>
				</li>
			</ul>
		</div>
		);
}

export default Vehiculo;

























