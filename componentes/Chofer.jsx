import React from 'react';
import { useState, useEffect} from 'react';
import OpcionesEliminar from './OpcionesEliminar.jsx';
import cambiarEstado from '../Funciones/cambiarEstado.js';
import FormaChofer from './FormaChofer.jsx';

function Chofer({arrayChoferes, jsonTipoChofer, deleteFunc, putFunc}){
	/*
		Este componente resive un json con los datos de un chofer para poder ser mostrado
		en la Lista de Choferes.
	*/

	const [mostrarOpcionesEliminar, setMostrarOpcionesEliminar] = useState(false);
	const [mostrarForma, setMostrarForma] = useState(false);

	const renderObjects = (mostrar, objetoAMostrar) => {

		if (mostrar === true){
			if (objetoAMostrar === 'OpcionesEliminar'){
				return <OpcionesEliminar 
						tipoObjeto = {'chofer'}
						id = {jsonTipoChofer['id_chofer']} 
						deleteFunc = {deleteFunc}
						cambiarEstado = {() => {cambiarEstado(mostrarOpcionesEliminar, setMostrarOpcionesEliminar)}} />
			}

			if (objetoAMostrar === 'FormaChofer'){

				return <FormaChofer
									jsonTipoChofer = {jsonTipoChofer}
									putFunc = {putFunc}
									arrayChoferes = {arrayChoferes} />
			}
		}

		return;//Retornar nada implica que no se muestre ningun componente.
	}


	return (
		<div>
			<h2>Nombre: {jsonTipoChofer['nombre_completo']}</h2>
			<ul>
				<li> ID: {jsonTipoChofer['id_chofer']} </li>
				<li> Edad: {jsonTipoChofer['edad']} </li>
				<li> Cedula: {jsonTipoChofer['cedula']} </li>
				<li> Número de Telefono: {jsonTipoChofer['numero_telefono']} </li>
				<li> Dirección: {jsonTipoChofer['direccion_particular']} </li>
				<li> Email: {jsonTipoChofer['email']} </li>
				<li> Nivel Escolar: {jsonTipoChofer['nivel_escolar']} </li>
				<li> Sexo: {jsonTipoChofer['sexo']} </li>
				<li> Años de Experiencia: {jsonTipoChofer['agnos_experiencia']} </li>
				<li> Cantidad de Multas: {jsonTipoChofer['cantidad_de_multas']} </li>
				<li> Clasificación: {jsonTipoChofer['clasificacion']} </li>
				<li>
					<b>Opcines:</b>
					<ol>
						<li>
							<button onClick = {(evento) => {cambiarEstado(mostrarForma, setMostrarForma, evento)}}>
						 		{!mostrarForma ? 'Editar': 'No Editar'}
						 	</button>
						 	{renderObjects(mostrarForma, 'FormaChofer')}
						</li>
						<li>
							<button onClick={() => {cambiarEstado(mostrarOpcionesEliminar, setMostrarOpcionesEliminar)}}>
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
























