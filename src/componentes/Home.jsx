import React from 'react';

export default function Home() {
	//Este componente muestra la pagina principal de la Web App
	//Que se encarga de explicarle a los usuarios de que trata y cuales son sus funcionalidades.

	return (
		<div className='bg-dark border border-primary border-3 rounded-5 justify-content-center p-3 m-3'>
			<center>
				<h2 className='display-5 text-primary'>Bienvenidos a Let’s Go Bus</h2>
				<p className='lead text-white'>
					<b> Let’s Go Bus </b> es una aplicación web que le ayudará a gestionar
					su empresa de transporte, permitiéndole almacenar información sobre
					los <b> choferes </b>, <b> vehículos </b> y <b> viajes </b>, además de
					saber las <b> ganancias </b> que se han generado en un intervalo de
					tiempo definido por usted mismo.
				</p>
			</center>

			<h2 className='h2 text-primary'>
				{' '}
				Este sistema admite tres tipos de usuarios:{' '}
			</h2>

			<ul>
				<li>
					<h2 className=' h3 text-success'>Administradores:</h2>
					<p className='lead text-white'>
						Estos son los únicos que pueden realizar acciones sobre los
						usuarios, además de ser los únicos que pueden eliminar choferes,
						ómnibus y viajes.
					</p>
				</li>
				<li>
					<h2 className=' h3 text-success'>Supervisores:</h2>
					<p className='lead text-white'>
						Estos son los únicos que pueden crear y editar la información sobre
						los ómnibus y choferes.
					</p>
				</li>
				<li>
					<h2 className=' h3 text-success'>Agentes:</h2>
					<p className='lead text-white'>
						Estos pueden listar la información de los ómnibus y choferes además
						de crear, editar y listar los viajes.
					</p>
				</li>
			</ul>
		</div>
	);
}

