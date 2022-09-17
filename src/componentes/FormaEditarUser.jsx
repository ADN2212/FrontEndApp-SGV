import React from 'react';
import { useState, useEffect} from 'react';
//import postData from '../RequestFunctions/postData.js';
import alCambiar from '../Funciones/alCambiar.js';
import estaEnUso from '../Funciones/estaEnUso.js';
import swal from 'sweetalert';


export default function FormarEditarUser({actualUser, arrayUsuarios, putFunc, cambiarEstado}){
	
	//Copiar el user a editar:
	let userActual = actualUser
	
	//Borrar la contraseña antigua:
	delete userActual['password'];
	
	//Agregar al Hoook:
	const [toEditUser, settoEditUser] = useState(actualUser);

	//Guardar valores para pruebas posteriores:
	let emailAnterior = userActual['email'];
	let userNameAnterior = userActual['username'];

	function EnviarData(evento){
		
		//console.log(toEditUser);
		
		//alert('Por Aqui pasó');

		evento.preventDefault();

		//Probar que el username y el email no esten en uso:
		//function estaEnUso(valorActual, arrayObjetos, esEditar, llaveAEvaluar, valorAnterior){
		if (estaEnUso(toEditUser['email'], arrayUsuarios, true, 'email', emailAnterior)){
			swal({
				title: 'Email en Uso',
				icon: 'warning',
				text: `Ya hay un usuario con el email: '${toEditUser.email}' en la Base de Datos.`
			});
			//evento.preventDefault();
		} else if (estaEnUso(toEditUser['username'], arrayUsuarios, true, 'username', userNameAnterior)){
				swal({
				title: 'Nombre de Usuario en Uso',
				icon: 'warning',
				text: `Ya hay un usuario con el nombre de usuario: '${toEditUser.username}' en la Base de Datos.`
			});
		} else {
			//Hacer la post requets:
			//console.log(toEditUser);			
			putFunc(toEditUser['id'], 'sgv_user', toEditUser);
			cambiarEstado();
		}	
	}

	return(

		<form onSubmit = {(evento) => { EnviarData(evento)}} >
			<h2 className = 'display-6 text-primary' > Editar Usuario </h2>
			<label className = 'form-label'>
				Nombre Completo:
				<input 
					type = 'text'
					name = 'nombre_completo'
					value = {toEditUser.nombre_completo || ""}
					title = 'El nombre completo de los usuarios solo puede contener letras tanto mayusculas como minisculas y la cantidad máxima de caractetres es = 100, ademas NO UTILICE LETRAS ACENTUADAS.'
					className = 'form-control form-control-sm'
					pattern = '[a-zA-Z ]{2,100}'
					onChange = {(evento) => {alCambiar(evento, toEditUser, settoEditUser)}}
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
					value = {toEditUser.username || ""}
					title = 'El nombre de usuario solo permite letras y numeros con un minimo de 5 caracteres y un maximo de 50.'
					className = 'form-control form-control-sm'
					pattern = '[A-Za-z0-9]+'
					onChange = {(evento) => {alCambiar(evento, toEditUser, settoEditUser)}}
					required />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Correo Eléctronico:
				<input 
					type = 'email'
					name = 'email'
					value = {toEditUser.email || ""}
					className = 'form-control form-control-sm'
					required
					onChange = {(evento) => {alCambiar(evento, toEditUser, settoEditUser)}} />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Rol de Usuario:
				<select className = 'form-select form-select-sm' name = 'rol' value = {toEditUser.rol || ""} onChange = {(evento) => {alCambiar(evento, toEditUser, settoEditUser)}}>
					<option value = 'Agente'> Agente </option>
					<option value = 'Administrador'> Administrador </option>
					<option value = 'Supervisor'> Supervisor </option>
				</select>
			</label>
			<br></br>
				<label className = 'form-label'>
				Asigne la Nueva Contraseña:
				<input 
					type = 'password'
					name = 'password'
					minLength = '8'
					value = {toEditUser.password || ""}
					className = 'form-control form-control-sm'
					onChange = {(evento) => {alCambiar(evento, toEditUser, settoEditUser)}}
					required />														
			</label>
			<br></br>
			<input type = 'submit' value = 'Crear Usuario' className = 'btn btn-success' />
		</form>
		);
}






































