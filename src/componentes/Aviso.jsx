import React from 'react';

export default function Aviso({ rolActual, rolCorrecto }) {
	//Este componente se muestra cuando un user intente acceder a un recurso que lo concierne.
	return (
		<div>
			<br></br>
			<p className='text-warning'>
				Debe iniciar sesión con una cuenta de <b> {rolCorrecto} </b> para poder
				realizar esta acción
				{rolActual ? (
					<>
						, actualmente está logeado como un <b>{rolActual}</b>.
					</>
				) : (
					<>.</>
				)}
			</p>
		</div>
	);
}