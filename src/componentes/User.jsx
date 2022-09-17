import React from 'react';
import { useState, useEffect} from 'react';
import OpcionesEliminar from './OpcionesEliminar.jsx';
import cambiarEstado from '../Funciones/cambiarEstado.js';
//import FormaChofer from './FormaChofer.jsx';
import FormarEditarUser from './FormaEditarUser.jsx';
import Aviso from './Aviso.jsx';

export default function User({jsonTipoUser, deleteFunc, activeUser, id, arrayUsuarios, putFunc}){
	
	const [mostrarOpcionesEliminar, setMostrarOpcionesEliminar] = useState(false);
	const [mostrarForma, setMostrarForma] = useState(false);
	
	//useEffect(() => {console.log(activeUser, id)})

	const renderObjects = (mostrar, objetoAMostrar) => {

		if (mostrar === true){

			if (!activeUser){
				return <Aviso rolActual = {null} rolCorrecto = {'Administrador'} />

			} else if (activeUser.rol != 'Administrador'){
				return <Aviso rolActual = {activeUser.rol} rolCorrecto = {'Administrador'} />
			}

			if (objetoAMostrar === 'OpcionesEliminar'){

				if (activeUser['id'] === id){
					return <p className = 'text-danger'> No puesde autoeliminarte </p>
				}

				return <OpcionesEliminar 
							tipoObjeto = {'sgv_user'}
							id = {jsonTipoUser['id']} 
							deleteFunc = {deleteFunc} />
			}

			if (objetoAMostrar === 'FormaEditarUser'){

				if (activeUser['id'] === id){
					return <p className = 'text-danger'> No puesde editarte </p>
				}

				return <FormarEditarUser 
							actualUser = {jsonTipoUser}
							arrayUsuarios = {arrayUsuarios}
							putFunc = {putFunc}
							cambiarEstado = {() => {cambiarEstado(mostrarForma, setMostrarForma)}}

				/>
			}

		return;//Retornar nada implica que no se muestre ningun componente.
		}
	}

	return(
		<div className = 'card m-3 mt-3 ps-5 pt-1 bg-dark border border-primary border-3 rounded-5'>
			<h2 className = 'display-6 text-primary'> Nombre: {jsonTipoUser['nombre_completo']} </h2>
			<ul className = 'list-unstyled text-body'>
				<li className = 'text-white'> ID: {jsonTipoUser['id']} </li>
				<li className = 'text-white'> Email: {jsonTipoUser['email']} </li>
				<li className = 'text-white'> Rol: {jsonTipoUser['rol']} </li>
				<li className = 'text-white'> Nombre de Usuario: {jsonTipoUser['username']} </li>
				<li className = 'text-white'>
					<b>Opcines:</b>
					<ol className = 'list-inline'>
						
						<li className = {!mostrarForma ? `list-inline-item` : ''} >
							<button type = 'button' className = {!mostrarForma ? 'btn btn-primary m-2' : 'btn btn-secondary m-2'} onClick = {(evento) => {cambiarEstado(mostrarForma, setMostrarForma, evento)}}>
						 		{!mostrarForma ? 'Editar': 'No Editar'}
						 	</button>
						 	{renderObjects(mostrarForma, 'FormaEditarUser')}
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



























