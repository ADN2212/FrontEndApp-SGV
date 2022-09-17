import React from 'react';
//import { useState} from 'react';
import swal from 'sweetalert';
//import alCambiar from '../Funciones/alCambiar.js';
import blackListToken from '../Funciones/blackListToken.js';

export default function FomaLogout({activeUser, setActiveUser}){
	//Muestra el usuario que esta logeado actualmente y pregunta si se quire cerrar sesinón.

	function logOutAndBlacklistTokens(evento){
		
		//Esta funcion hace la requets para eviar los tokens a la lista negra.
		//Y ademas elimina la informacion del user del hook activeUser.
		
		evento.preventDefault();

		//hacer la request al el Endpoint del la lista negra de tokens
		blackListToken();
		
		swal({
			title: 'Sesion Cerrada',
			icon: 'success',
			text: 'La sesión ha sido cerrada con exito!'
		})

		//Elinar el contenido del hook del user.
		setActiveUser({});

		//Eliminar los tokens:
		localStorage.clear();

	}


	return (
		<form onSubmit = {(evento) => {logOutAndBlacklistTokens(evento)}}>
			<center>
				<h3 className = 'display-6 text-primary'> {`Actualmente está logeado como el/la ${activeUser.rol}/a de nombre ${activeUser.nombre_completo}.`} </h3>
				<h3 className = 'display-6 text-danger'> ¿Desea cerrar sesión? </h3>
				<input type='submit' value = 'Si, cerrar sesión' className = 'btn btn-danger p-2' />
			</center>
		</form>
		)

}




















