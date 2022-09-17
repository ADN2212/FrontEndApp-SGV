import React from 'react';
import parseFecha from '../Funciones/parseFecha.js';
import { useState, useEffect} from 'react';
import cambiarEstado from '../Funciones/cambiarEstado.js';
import OpcionesEliminar from './OpcionesEliminar.jsx';
import FormaViaje from './FormaViaje.jsx';
import Aviso from './Aviso.jsx';

function Viaje({jsonTipoViaje, arrayViajes, arrayVehiculos, arrayChoferes, deleteFunc, putFunc, activeUser}){
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
						
						if (!activeUser){
							return <Aviso rolActual = {null} rolCorrecto = {'Administrador'} />
						
						} else if (activeUser.rol != 'Administrador'){
							return <Aviso rolActual = {activeUser.rol} rolCorrecto = {'Administrador'} />
						}

						return <OpcionesEliminar
											tipoObjeto = 'viaje'
											id = {jsonTipoViaje['id_viaje']}
											deleteFunc = {deleteFunc}
											cambiarEstado = {() => {cambiarEstado(mostrarOpcionesEliminar, setMostrarOpcionesEliminar)}} />
					}

					if (objetoAMostrar === 'FormaViaje'){

							if (!activeUser){
								return <Aviso rolActual = {null} rolCorrecto = {'Agente'} />
						
							} else if (activeUser.rol != 'Agente'){
								return <Aviso rolActual = {activeUser.rol} rolCorrecto = {'Agente'} />
							}

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
											esEditar = {true} 
											cambiarEstado = {() => {cambiarEstado(mostrarForma, setMostrarForma)}} />	
					}

					return;
				}
			}

	return (
		<div className = 'card m-3 mt-3 ps-5 pt-1 bg-dark border border-primary border-3 rounded-5'>
			<h2 className = 'display-6 text-primary'>Viaje de Tipo {jsonTipoViaje['tipo_viaje']}</h2>
			<ul  className = 'list-unstyled text-body'>
					<li className = 'text-white'> ID: {jsonTipoViaje['id_viaje']} </li>
					<li className = 'text-white'> Fecha de Inicio: { parseFecha(jsonTipoViaje['inicio_viaje']) } </li>
					<li className = 'text-white'> Fecha de Termino: { parseFecha(jsonTipoViaje['fin_viaje']) } </li>
					<li className = 'text-white'> Costo: {jsonTipoViaje['costo_usd']} US$ </li>
					<li className = 'text-white'> Distancia Recorrida: {jsonTipoViaje['kms_recorridos']} Kilometros </li>
					<li className = 'text-white'> Estado: {jsonTipoViaje['estado_viaje']} </li>
					<li className = {chofer ? 'text-white' : 'text-danger'} > 
						{chofer ? `Chofer de Nombre: ${chofer['nombre_completo']} y cedula: ${chofer['cedula']}`: 'Chofer Eliminado'}
					</li>
					<li className = {vehiculo ? 'text-white' : 'text-danger'} > 
						{vehiculo ? `Vehiculo de Marca: ${vehiculo['marca']} y placa: ${vehiculo['placa']}`: 'Vehiculo Eliminado'}
					</li>
					<li className = 'text-white'> Comentario: {jsonTipoViaje['comentarios']} </li>
					<li className = 'text-white'>
						<b>Opcines:</b>
						<ol className = 'list-inline'>
							<li className = {!mostrarForma ? `list-inline-item` : ''} >
								<button  type = 'button' className = {!mostrarForma ? 'btn btn-primary m-2' : 'btn btn-secondary m-2'} onClick = {() => {setMostrarForma(!mostrarForma)}}>
									{!mostrarForma ? 'Editar' : 'No Editar'} 
								</button>
								{renderObjects(mostrarForma, 'FormaViaje')}
							</li>
							<li className = {!mostrarOpcionesEliminar ? `list-inline-item` : ''} >
								<button type = 'button' className = {!mostrarOpcionesEliminar ? 'btn btn-danger m-2' : 'btn btn-secondary m-2'} onClick= {() => {setMostrarOpcionesEliminar(!mostrarOpcionesEliminar)}}>
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




























