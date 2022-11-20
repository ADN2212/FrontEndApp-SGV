import React from 'react';
import alCambiar from '../Funciones/alCambiar.js';
import swal from 'sweetalert';
import { useState, useEffect } from 'react';

export default function FormaFiltrar({
	tipoObjeto,
	setterFunc,
	cambiarEstado,
}) {
	//Muestra una forma que servirá para filtrar los objetos por sus campos de seleción.

	const [valorFiltrar, setValorFiltrar] = useState({});

	function cambiarValorFiltrar(evento, tipoObjeto) {
		//Cambia el valor del hook en base al cual se filtan los objetos:
		evento.preventDefault();

		if (tipoObjeto === 'usuario') {
			if (Object.keys(valorFiltrar).length === 0) {
				setterFunc({ rol: null });
				cambiarEstado();
				return;
			}

			if (valorFiltrar.rol === 'Todos') {
				setterFunc({ rol: null }); //Ver filtrarObjetos.js
			} else {
				setterFunc({ rol: valorFiltrar.rol });
				swal({
					title: 'Usuarios Filtrados',
					icon: 'success',
					text: `A continuanción se muestran solo los usuarios de rol: ${valorFiltrar.rol}.`,
				});
			}
		}

		if (tipoObjeto === 'chofer') {
			if (Object.keys(valorFiltrar).length === 0) {
				setterFunc({ clasificacion: null });
				cambiarEstado();
				return;
			}

			if (valorFiltrar.rol === 'Todos') {
				setterFunc({ clasificacion: null }); //Ver filtrarObjetos.js
			} else {
				setterFunc({ clasificacion: valorFiltrar.clasificacion });
				swal({
					title: 'Choferes Filtrados',
					icon: 'success',
					text: `A continuanción se muestran solo los choferes de clasificacion: ${valorFiltrar.clasificacion}.`,
				});
			}
		}

		if (tipoObjeto === 'vehiculo') {
			if (Object.keys(valorFiltrar).length === 0) {
				setterFunc({ tipo_servicio: null });
				cambiarEstado();
				return;
			}

			if (valorFiltrar.rol === 'Todos') {
				setterFunc({ tipo_servicio: null }); //Ver filtrarObjetos.js
			} else {
				setterFunc({ tipo_servicio: valorFiltrar.tipo_servicio });
				swal({
					title: 'Vehiculos Filtrados',
					icon: 'success',
					text: `A continuanción se muestran solo los vehiculos que ofrecen servicio ${valorFiltrar.tipo_servicio}.`,
				});
			}
		}

		if (tipoObjeto === 'viaje') {
			if (Object.keys(valorFiltrar).length === 0) {
				setterFunc({ estado_viaje: null });
				cambiarEstado();
				return;
			}

			if (valorFiltrar.rol === 'Todos') {
				setterFunc({ estado_viaje: null }); //Ver filtrarObjetos.js
			} else {
				setterFunc({ estado_viaje: valorFiltrar.estado_viaje });
				swal({
					title: 'Viajes Filtrados',
					icon: 'success',
					text: `A continuanción se muestran solo los viajes con estado: '${valorFiltrar.estado_viaje}'.`,
				});
			}
		}

		cambiarEstado(); //Para que se cierre (oculte) la forma.
	}

	let plural;

	if (tipoObjeto === 'chofer') {
		plural = 'Choferes';
	}
	if (tipoObjeto === 'vehiculo') {
		plural = 'Vehiculos';
	}
	if (tipoObjeto === 'viaje') {
		plural = 'Viajes';
	}
	if (tipoObjeto === 'usuario') {
		plural = 'Usuarios';
	}

	return (
		<form
			onSubmit={(evento) => {
				cambiarValorFiltrar(evento, tipoObjeto);
			}}
			className='AnchoForma m-3 bg-dark p-3 border border-primary border-3 rounded-5 text-white'>
			<h1 className='display-6 text-primary'> {`Filtar ${plural}`} </h1>
			{tipoObjeto === 'usuario' ? (
				<label className='form-label'>
					Selecione Tipo de Usuario:
					<select
						className='form-select form-select-sm'
						name='rol'
						value={valorFiltrar.rol || ''}
						onChange={(evento) => {
							alCambiar(evento, valorFiltrar, setValorFiltrar);
						}}>
						<option value='Todos'> Todos </option>
						<option value='Administrador'> Administrador </option>
						<option value='Supervisor'> Supervisor </option>
						<option value='Agente'> Agente </option>
					</select>
				</label>
			) : tipoObjeto === 'chofer' ? (
				<label className='form-label'>
					Selecione Clafisicación:
					<select
						className='form-select form-select-sm'
						name='clasificacion'
						value={valorFiltrar.clasificacion || ''}
						onChange={(evento) => {
							alCambiar(evento, valorFiltrar, setValorFiltrar);
						}}>
						<option value='Todos'> Todos </option>
						<option value='A'> A </option>
						<option value='B'> B </option>
					</select>
				</label>
			) : tipoObjeto === 'vehiculo' ? (
				<label className='form-label'>
					Seleccione Tipo de Servicio:
					<select
						className='form-select form-select-sm'
						name='tipo_servicio'
						value={valorFiltrar.tipo_servicio || ''}
						onChange={(evento) => {
							alCambiar(evento, valorFiltrar, setValorFiltrar);
						}}>
						<option value='Todos'> Todos </option>
						<option value='Regular'> Regular </option>
						<option value='Especial'> Especial </option>
						<option value='VIP'> VIP </option>
					</select>
				</label>
			) : tipoObjeto === 'viaje' ? (
				<label className='form-label'>
					Selecione el Estado de los Viajes:
					<select
						className='form-select form-select-sm'
						name='estado_viaje'
						value={valorFiltrar.estado_viaje || ''}
						onChange={(evento) => {
							alCambiar(evento, valorFiltrar, setValorFiltrar);
						}}>
						<option value='Todos'> Todos </option>
						<option value='Creado'> Creado </option>
						<option value='En Proceso'> En Proceso </option>
						<option value='Cerrado'> Cerrado </option>
					</select>
				</label>
			) : (
				<> :/ </>
			)}

			<br></br>
			<input type='submit' value='Filtrar' className='btn btn-success' />
		</form>
	);
}