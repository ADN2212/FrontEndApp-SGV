import React from 'react';
import '../estilos/estiloForma.css';
import swal from 'sweetalert';
import blackListToken from '../Funciones/blackListToken.js';

export default function FomaLogout({ activeUser, setActiveUser }) {
	//Muestra el usuario que esta logeado actualmente y pregunta si se quire cerrar sesinón.

	function logOutAndBlacklistTokens(evento) {
		//Esta funcion hace la requets para eviar los tokens a la lista negra.
		//Y ademas elimina la informacion del user del hook activeUser.

		evento.preventDefault();

		//hacer la request al el Endpoint del la lista negra de tokens
		blackListToken();

		swal({
			title: 'Sesion Cerrada',
			icon: 'success',
			text: 'La sesión ha sido cerrada con exito!',
		});

		//Eliminar el contenido del hook del user.
		setActiveUser({});

		//Eliminar los tokens y el email:
		localStorage.clear();
	}

	return (
		<div className='p-3'>
			<center>
				<form
					onSubmit={(evento) => {
						logOutAndBlacklistTokens(evento);
					}}
					className='m-3 bg-dark AnchoForma p-3 border border-primary border-3 rounded-5'>
					<h2 className='text-warning display-5'> Logout </h2>
					<h3 className='lead text-primary'>
						{' '}
						{`Actualmente está logeado como el/la ${activeUser.rol}/a de nombre ${activeUser.nombre_completo}.`}{' '}
					</h3>
					<h3 className='lead text-danger'> ¿Desea cerrar sesión? </h3>
					<input
						type='submit'
						value='Si, cerrar sesión'
						className='btn btn-danger p-2'
					/>
				</form>
			</center>
		</div>
	);
}