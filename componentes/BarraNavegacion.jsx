import React from 'react';
import {Link} from "react-router-dom";

export default function BarraNavegacion(){

	return (
				<nav>
					<ul>
						<Link to = '/choferes'>
							<li> Ver Choferes </li>
						</Link>

						<Link to ='/vehiculos'>
							<li> Ver Vehiculos </li>
						</Link>

						<Link to = '/viajes'>
							<li> Ver Viajes </li>
						</Link>
						
						<Link to = '/calcular_ganacias'>
							<li> Calcular Ganancias </li>
						</Link>
					</ul>
				</nav>
		)
}

//Observese como al pulsar estos links el componente principal <App /> no se vuleve a renderizar.



























