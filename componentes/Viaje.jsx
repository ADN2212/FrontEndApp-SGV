import React from 'react';
import parseFecha from '../Funciones/parseFecha.js';
import { useState, useEffect} from 'react';
import cambiarEstado from '../Funciones/cambiarEstado.js';
import OpcionesEliminar from './OpcionesEliminar.jsx';
import FormaViaje from './FormaViaje.jsx';


function Viaje({jsonTipoViaje, arrayViajes, arrayVehiculos, arrayChoferes, deleteFunc, putFunc}){
	/*
	Este componente resive un json con los datos de un Viaje para poner ser mostrado
	en la Lista de Viajees.
	*/

	//useEffect(() => console.log(jsonTipoViaje['chofer']));
	const [mostrarOpcionesEliminar, setMostrarOpcionesEliminar] = useState(false);
	const [mostrarForma, setMostrarForma] = useState(false);


	let chofer = jsonTipoViaje['chofer'];
	let vehiculo = jsonTipoViaje['vehiculo'];

	//useEffect(() => {console.log(mostrarOpcionesEliminar)});

	const renderObjects = (mostrar, objetoAMostrar) => {
			if (mostrar === true){
					if (objetoAMostrar === 'OpcionesEliminar'){
						return <OpcionesEliminar
											tipoObjeto = 'viaje'
											id = {jsonTipoViaje['id_viaje']}
											deleteFunc = {deleteFunc}
											cambiarEstado = {() => {cambiarEstado(mostrarOpcionesEliminar, setMostrarOpcionesEliminar)}} />
					}

					if (objetoAMostrar === 'FormaViaje'){
						if (jsonTipoViaje['estado_viaje'] === 'Cerrado'){
							//No debería permitirce que se edite un viaje que está en estado cerrado?
							return <p> <b> Los viajes que han sido cerrados no son editables </b> </p>
						}

						if (jsonTipoViaje['estado_viaje'] === 'En Proceso' && (!chofer || !vehiculo)){
							return <p>
												<small>
												<b> 
													El chofer o el vehiculo (o ambos) asiganado a este viaje ha sido borrado antes de que este se culminara,
													recomendamos que el viaje sea eliminado y que luego se cree uno nuevo con los mismos parametros del anterior
													pero con un chofer o viaje que todavia pertenezca a la Base de Datos del sistema. 
												</b>
												</small>
											</p>
						}

						return <FormaViaje
											jsonTipoViaje = {jsonTipoViaje} 
											arrayChoferes = {arrayChoferes}
											arrayVehiculos = {arrayVehiculos}
											arrayViajes = {arrayViajes}
											putFunc = {putFunc}
											esEditar = {true} />	
					}

					return;
				}
			}

	return (
		<div>
			<h2>Viaje de Tipo {jsonTipoViaje['tipo_viaje']}</h2>
			<ul>
					<li> ID: {jsonTipoViaje['id_viaje']} </li>
					<li> Fecha de Inicio: { parseFecha(jsonTipoViaje['inicio_viaje']) } </li>
					<li> Fecha de Termino: { parseFecha(jsonTipoViaje['fin_viaje']) } </li>
					<li> Costo: {jsonTipoViaje['costo_usd']} US$ </li>
					<li> Distancia Recorrida: {jsonTipoViaje['kms_recorridos']} Kilometros </li>
					<li> Estado: {jsonTipoViaje['estado_viaje']} </li>
					<li> 
						{chofer ? `Chofer de Nombre: ${chofer['nombre_completo']} y cedula: ${chofer['cedula']}`: 'Chofer Eliminado'}
					</li>
					<li> 
						{vehiculo ? `Vehiculo de Marca: ${vehiculo['marca']} y placa: ${vehiculo['placa']}`: 'Vehiculo Eliminado'}
					</li>
					<li> Comentario: {jsonTipoViaje['comentarios']} </li>
					<li>
						<b>Opcines:</b>
						<ol>
							<li>
								<button onClick = {() => {setMostrarForma(!mostrarForma)}}>
									{!mostrarForma ? 'Editar' : 'No Editar'} 
								</button>
								{renderObjects(mostrarForma, 'FormaViaje')}
							</li>
							<li>
								<button onClick= {() => {setMostrarOpcionesEliminar(!mostrarOpcionesEliminar)}}>
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


export default Viaje;

/*
Chofer Asignado: {jsonTipoViaje['chofer']['nombre_completo']} 
, de Cedula: {jsonTipoViaje['chofer']['cedula']}  
, e ID: {jsonTipoViaje['chofer']['id_chofer']}

Vehiculo Asignado: {jsonTipoViaje['vehiculo']['marca']} 
, de Placa: {jsonTipoViaje['vehiculo']['placa']}
, e ID: {jsonTipoViaje['vehiculo']['id_vehiculo']}

*/


//{new Date(jsonTipoViaje['inicio_viaje']).toLocaleDateString()}




























