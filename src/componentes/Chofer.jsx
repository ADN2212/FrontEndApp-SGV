import React from 'react';
import { useState, useEffect} from 'react';
import OpcionesEliminar from './OpcionesEliminar.jsx';
import cambiarEstado from '../Funciones/cambiarEstado.js';
import tieneViajesEnProceso from '../Funciones/tieneViajesEnProceso.js';
import FormaChofer from './FormaChofer.jsx';
import Aviso from './Aviso.jsx';

function Chofer({arrayChoferes, arrayViajes, jsonTipoChofer, deleteFunc, putFunc, activeUser}){
	/*
		Este componente resive un json con los datos de un chofer para poder ser mostrado
		en la Lista de Choferes.
	*/

	const [mostrarOpcionesEliminar, setMostrarOpcionesEliminar] = useState(false);
	const [mostrarForma, setMostrarForma] = useState(false);

	const renderObjects = (mostrar, objetoAMostrar) => {

		if (mostrar === true){
			if (objetoAMostrar === 'OpcionesEliminar'){

				if (!activeUser){
					return <Aviso rolActual = {null} rolCorrecto = {'Administrador'} />
				}
				else if (activeUser.rol != 'Administrador'){
					return <Aviso rolActual = {activeUser.rol} rolCorrecto = {'Administrador'} />
				}

				if (tieneViajesEnProceso(jsonTipoChofer, arrayViajes)){
					return	<div>
										<p className = 'text-danger'>
											Este chofer tiene viajes en proceso sin terminar, por lo tanto no puede ser eliminado.
										</p>
									</div>

				}

				return <OpcionesEliminar 
						tipoObjeto = {'chofer'}
						id = {jsonTipoChofer['id_chofer']} 
						deleteFunc = {deleteFunc}
						cambiarEstado = {() => {cambiarEstado(mostrarOpcionesEliminar, setMostrarOpcionesEliminar)}} />
			}

			if (objetoAMostrar === 'FormaChofer'){

				if (!activeUser){
					return <Aviso rolActual = {null} rolCorrecto = {'Supervisor'} />
				}
				else if (activeUser.rol != 'Supervisor'){
					return <Aviso rolActual = {activeUser.rol} rolCorrecto = {'Supervisor'} />
				}

				return <FormaChofer
									jsonTipoChofer = {jsonTipoChofer}
									putFunc = {putFunc}
									arrayChoferes = {arrayChoferes}
									cambiarEstado = { () => { cambiarEstado(mostrarForma, setMostrarForma) } } />
									
			}
		}

		return;//Retornar nada implica que no se muestre ningun componente.
	}


	return (
		<div className = 'card m-3 mt-3 ps-5 pt-1 bg-dark border border-primary border-3 rounded-5'>
			<h2 className = 'display-6 text-primary'>Nombre: {jsonTipoChofer['nombre_completo']}</h2>
			<ul className = 'list-unstyled text-body'>
				<li className = 'text-white'> ID: {jsonTipoChofer['id_chofer']} </li>
				<li className = 'text-white'> Edad: {jsonTipoChofer['edad']} </li>
				<li className = 'text-white'> Cedula: {jsonTipoChofer['cedula']} </li>
				<li className = 'text-white'> Número de Telefono: {jsonTipoChofer['numero_telefono']} </li>
				<li className = 'text-white'> Dirección: {jsonTipoChofer['direccion_particular']} </li>
				<li className = 'text-white'> Email: {jsonTipoChofer['email']} </li>
				<li className = 'text-white'> Nivel Escolar: {jsonTipoChofer['nivel_escolar']} </li>
				<li className = 'text-white'> Sexo: {jsonTipoChofer['sexo']} </li>
				<li className = 'text-white'> Años de Experiencia: {jsonTipoChofer['agnos_experiencia']} </li>
				<li className = 'text-white'> Cantidad de Multas: {jsonTipoChofer['cantidad_de_multas']} </li>
				<li className = 'text-white'> Cantidad de Viajes: {jsonTipoChofer['cantidad_viajes']}</li>	
				<li className = 'text-white'> Clasificación: {jsonTipoChofer['clasificacion']} </li>
				<li className = 'text-white'>
					<b>Opcines:</b>
					<ol className = 'list-inline'>
						<li className = {!mostrarForma ? `list-inline-item` : ''} >
							<button type = 'button' className = {!mostrarForma ? 'btn btn-primary m-2' : 'btn btn-secondary m-2'} onClick = {(evento) => {cambiarEstado(mostrarForma, setMostrarForma, evento)}}>
						 		{!mostrarForma ? 'Editar': 'No Editar'}
						 	</button>
						 	{renderObjects(mostrarForma, 'FormaChofer')}
						</li>
						<li className = {!mostrarOpcionesEliminar ? `list-inline-item` : ''} >
							<button type = 'button' className = {!mostrarOpcionesEliminar ? 'btn btn-danger m-2' : 'btn btn-secondary m-2'} onClick={() => {cambiarEstado(mostrarOpcionesEliminar, setMostrarOpcionesEliminar)}}>
						 		{ !mostrarOpcionesEliminar ? 'Eliminar' : 'No Eliminar'}
						 	</button>
						 	{renderObjects(mostrarOpcionesEliminar, 'OpcionesEliminar')}
						 </li>
					</ol>
				</li>
			</ul>
		</div>
		);
}

export default Chofer;
























