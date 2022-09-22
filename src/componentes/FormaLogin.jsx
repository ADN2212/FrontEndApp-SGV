import '../estilos/estiloForma.css';
import React from 'react';
import {useState} from 'react';
import swal from 'sweetalert';
import alCambiar from '../Funciones/alCambiar.js';
import {useNavigate} from 'react-router-dom';

export default function FormaLogin({usuarios, setActiveUser}){
	
	const [usuario, setUsuario] = useState({})	
 	const navigate = useNavigate();
	
	async function getTokensAndLogIn(evento){
		//Esta funcion envia la requets a la API para obtener el Access Token y el Refresh Token. 
		evento.preventDefault();
		try{
			let response = await fetch('http://localhost:8000/api/token/',
					{
						method: 'POST',
						body: JSON.stringify(usuario),
						headers: {'Content-type': 'application/json; charset=UTF-8'}
					}
				)

			if (response.ok){
				let tokens = await response.json()
				//console.log(tokens);
				swal({
					title: 'Acceso Exitoso',
					icon: 'success',
					text: `El usuario de email: ${usuario.email} a iniciado sesión.`,
				});
				
				//Asignar el user que accedió al hook del usuario activo:
				let activeUser = usuarios.filter(
					(user) => {
						return user['email'] === usuario['email']
							})[0]//El indice es para obtener el primer y unico elemento que retornara filter.

				setActiveUser(activeUser);
				
				//Guardar los tokens en el localStorage:
				localStorage.setItem('access', tokens['access']);
				localStorage.setItem('refresh', tokens['refresh']);
				//Guardar el email y el id:
				localStorage.setItem('email', activeUser['email']);		
				localStorage.setItem('id', activeUser['id']);
				//Redireccionar:
				if (activeUser['rol'] === 'Supervisor'){
					navigate('/choferes');
				}

				if (activeUser['rol'] === 'Agente'){
					navigate('/viajes');
				}		

				if (activeUser['rol'] === 'Administrador'){
					navigate('/usuarios');
				}	

			} else {
				swal({
					title: 'Error Credenciales',
					icon: 'error',
					text: 'El email y la contraseña que ha ingresado no se corresponden.'
				})
			}
		} catch (error){
			swal({
				title: 'Error de Conexión',
				icon: 'error',
				text: 'No hemos podido conectarnos con el servidor, compruebe que este esté funcionado.'
			});
		}
	}

	return (
			<form onSubmit = {(evento) => {getTokensAndLogIn(evento)}} className = 'm-3 bg-dark AnchoForma p-3 border border-primary border-3 rounded-5'>
			<h2 className = 'display-6 text-primary'> Acceda a su Cuenta </h2>
				<label className = 'form-label text-white'>
				Correo Eléctronico:
				<input 
					type = 'email'
					name = 'email'
					value = {usuario.email || ""}
					className = 'form-control form-control-sm'
					required
					onChange = {(evento) => {alCambiar(evento, usuario, setUsuario)}} />														
			</label>
			<br></br>
			<label className = 'form-label text-white'>
				Asigne una Contraseña:
				<input 
					type = 'password'
					name = 'password'
					minLength = '8'
					value = {usuario.password || ""}
					className = 'form-control form-control-sm'
					onChange = {(evento) => {alCambiar(evento, usuario, setUsuario)}}
					required />														
			</label>
			<br></br>
			<input type = 'submit' value = 'LogIn' className = 'btn btn-success' />
			</form>			
	)
}



























