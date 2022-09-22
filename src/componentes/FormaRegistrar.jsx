import React from 'react';
import { useState, useEffect} from 'react';
//import postData from '../RequestFunctions/postData.js';
import alCambiar from '../Funciones/alCambiar.js';
import estaEnUso from '../Funciones/estaEnUso.js';
import swal from 'sweetalert';

export default function FormarRegistrar({arrayUsuarios, postFunc, cambiarEstado}){

	//Agrego el rol de 'Agente' por default.
	const [newUser, setNewUser] = useState({'rol' : 'Agente'})

	function EnviarData(evento){

		//console.log(newUser);

		evento.preventDefault();

		//Probar que el username y el email no esten en uso:
		//function estaEnUso(valorActual, arrayObjetos, esEditar, llaveAEvaluar, valorAnterior){
		if (estaEnUso(newUser['email'], arrayUsuarios, null, 'email', null)){
			swal({
				title: 'Email en Uso',
				icon: 'warning',
				text: `Ya hay un usuario con el email: '${newUser.email}' en la Base de Datos.`
			});
			//evento.preventDefault();
		} else if (estaEnUso(newUser['username'], arrayUsuarios, null, 'username')){
				swal({
				title: 'Nombre de Usuario en Uso',
				icon: 'warning',
				text: `Ya hay un usuario con el nombre de usuario: '${newUser.username}' en la Base de Datos.`
			});
		} else {
			//Hacer la post requets:
			//alert('Todo Good!');			
			postFunc(newUser, 'sgv_user');
			cambiarEstado();
		}	
	}

	return(

		<form onSubmit = {(evento) => { EnviarData(evento)}} className = ' AnchoForma m-3 bg-dark p-3 border border-primary border-3 rounded-5 text-white'>
			<h2 className = 'display-6 text-primary' > Regístrese Aqui </h2>
			<label className = 'form-label'>
				Nombre Completo:
				<input 
					type = 'text'
					name = 'nombre_completo'
					value = {newUser.nombre_completo || ""}
					title = 'El nombre completo de los usuarios solo puede contener letras tanto mayusculas como minisculas y la cantidad máxima de caractetres es = 100, ademas NO UTILICE LETRAS ACENTUADAS.'
					className = 'form-control form-control-sm'
					pattern = '[a-zA-Z ]{2,100}'
					onChange = {(evento) => {alCambiar(evento, newUser, setNewUser)}}
					required />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Nombre de Usuario:
				<input 
					type = 'text'
					name = 'username'
					minLength = '5' 
					maxLength = '50'
					value = {newUser.username || ""}
					title = 'El nombre de usuario solo permite letras y numeros con un minimo de 5 caracteres y un maximo de 50.'
					className = 'form-control form-control-sm'
					pattern = '[A-Za-z0-9]+'
					onChange = {(evento) => {alCambiar(evento, newUser, setNewUser)}}
					required />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Correo Eléctronico:
				<input 
					type = 'email'
					name = 'email'
					value = {newUser.email || ""}
					className = 'form-control form-control-sm'
					required
					onChange = {(evento) => {alCambiar(evento, newUser, setNewUser)}} />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Rol de Usuario:
				<select className = 'form-select form-select-sm' name = 'rol' value = {newUser.rol || ""} onChange = {(evento) => {alCambiar(evento, newUser, setNewUser)}}>
					<option value = 'Agente'> Agente </option>
					<option value = 'Administrador'> Administrador </option>
					<option value = 'Supervisor'> Supervisor </option>
				</select>
			</label>
			<br></br>
				<label className = 'form-label'>
				Asigne una Contraseña:
				<input 
					type = 'password'
					name = 'password'
					minLength = '8'
					value = {newUser.password || ""}
					className = 'form-control form-control-sm'
					onChange = {(evento) => {alCambiar(evento, newUser, setNewUser)}}
					required />														
			</label>
			<br></br>
			<input type = 'submit' value = 'Crear Usuario' className = 'btn btn-success' />
		</form>
		);
}




/*
			<label className = 'form-label'>
				Repita la Contraseña:
				<input 
					type = 'password'
					name = 'passwordPrueba'
					minLength = '8'
					value = {newUser.passwordPruaba || ""}
					className = 'form-control form-control-sm'
					onChange = {(evento) => {alCambiar(evento, newUser, setNewUser)}}
					required />														
			</label>
			<br></br>
*/

































