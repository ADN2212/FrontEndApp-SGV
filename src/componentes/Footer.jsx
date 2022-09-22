import React from 'react';

export default function Footer(){
	//Este componente es el pie de pagina de la App.

	return(
		<div className = 'container-fluid bg-dark border border-primary border-3 rounded-5 justify-content-center mt-3'>
			<div className = 'row'>	
				<div className = 'fs-4 col text-primary'>
					<center>
						<p className = 'p-4 h4'>
							Let's Go Bus
						</p>
					</center>
				</div>
				<div className = 'fs-4 col text-primary'>
					<center>
						<p className = 'pt-2 h5'>	
							Autor:
						</p>
					</center>
					<center>
						<p className = 'fs-6 text-white'>
					 		Juan A. Núñez C.
						</p>
					</center> 
				</div>
				<div className = 'fs-4 col text-primary'>
					<center>
						<p className = 'pt-2 h5'>
							Contacto:
						</p>
					</center>
					<center>
						<p className = 'fs-6 text-white'>
							adn221294@gmail.com 
						</p>
					</center> 
				</div>
			</div>	
		</div>
	)
}







































