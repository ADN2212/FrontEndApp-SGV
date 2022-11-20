import '../estilos/estiloAviso.css';
import React from 'react';

export default function AvisoAcceso({ tipoUser }) {
	//Este aviso se muestra cuando un usuario intenta acceder a un recuerso que no le está permitido
	return (
		<div className='p-3'>
			<center>
				<div className='bg-dark border border-danger p-3 m-3 border-3 rounded-5 AvisoAcceso'>
					<h2 className='text-warning display-5'> Aviso </h2>
					{tipoUser ? (
						<p className='text-danger lead'>
							{`Para poder acceder a este recurso debe iniciar sesión con una cuenta de ${tipoUser}.`}
						</p>
					) : (
						<p className='text-danger lead'>
							Debe inicar sesión para acceder a este recurso.
						</p>
					)}
				</div>
			</center>
		</div>
	);
}