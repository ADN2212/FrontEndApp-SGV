import React from 'react';
import { Link } from 'react-router-dom';

export default function BarraNavegacion({ activeUser }) {
	return (
		<nav className='navbar navbar-expand-lg bg-dark border border-primary border-3 rounded-4 m-3 mb-3 justify-content-center'>
			<div className='container-fluid'>
				<h6 className='text-center display-6 text-success ms-4'>Go to:</h6>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='collapse navbar-collapse justify-content-center'
					id='navbarSupportedContent'>
					<ul className='navbar-nav mb-2 mb-lg-0'>
						<li>
							<Link to='/' className='fs-4 nav-link text-primary'>
								Home
							</Link>
						</li>
						<li>
							<Link
								to='/login'
								className={
									activeUser
										? 'fs-4 nav-link text-danger'
										: 'fs-4 nav-link text-primary'
								}>
								{activeUser ? 'Logout' : 'Login'}
							</Link>
						</li>
						<li>
							<Link to='/usuarios' className='fs-4 nav-link text-primary'>
								Ver Usuarios
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/choferes' className='fs-4 nav-link text-primary'>
								Ver Choferes
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/vehiculos' className='fs-4 nav-link text-primary'>
								Ver Vehiculos
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/viajes' className='fs-4 nav-link text-primary'>
								Ver Viajes
							</Link>
						</li>
						<li>
							<Link
								to='/calcular_ganacias'
								className='fs-4 nav-link text-primary'>
								Calcular Ganancias
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
//Observese como al pulsar estos links el componente principal <App /> no se vuleve a renderizar.
