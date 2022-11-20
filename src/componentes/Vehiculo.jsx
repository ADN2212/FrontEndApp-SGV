import React from 'react';
import { useState, useEffect } from 'react';
import OpcionesEliminar from './OpcionesEliminar.jsx';
import cambiarEstado from '../Funciones/cambiarEstado.js';
import FormaVehiculo from './FormaVehiculo.jsx';
import Aviso from './Aviso.jsx';
import tieneViajesEnProceso from '../Funciones/tieneViajesEnProceso.js';

function Vehiculo({
	jsonTipoVehiculo,
	arrayViajes,
	deleteFunc,
	putFunc,
	arrayVehiculos,
	activeUser,
}) {
	/*
	Este componente resive un json con los datos de un vehiculo para poner ser mostrado
	en la Lista de Vehiculos.
	*/

	const [mostrarOpcionesEliminar, setMostrarOpcionesEliminar] = useState(false);
	const [mostrarForma, setMostrarForma] = useState(false);

	function renderObjects(mostrar, objetoAMostrar) {
		if (mostrar === true) {
			if (objetoAMostrar === 'OpcionesEliminar') {
				if (!activeUser) {
					return <Aviso rolActual={null} rolCorrecto={'Administrador'} />;
				} else if (activeUser.rol != 'Administrador') {
					return (
						<Aviso rolActual={activeUser.rol} rolCorrecto={'Administrador'} />
					);
				}

				if (tieneViajesEnProceso(null, jsonTipoVehiculo, arrayViajes)) {
					return (
						<div>
							<p className='text-warning'>
								<b>
									Este vehiculo tiene viajes en proceso sin terminar, por lo
									tanto no puede ser eliminado.
								</b>
							</p>
						</div>
					);
				}

				return (
					<OpcionesEliminar
						id={jsonTipoVehiculo['id_vehiculo']}
						deleteFunc={deleteFunc}
						tipoObjeto='vehiculo'
					/>
				);
			}

			if (objetoAMostrar === 'FormaVehiculo') {
				if (!activeUser) {
					return <Aviso rolActual={null} rolCorrecto={'Supervisor'} />;
				} else if (activeUser.rol != 'Supervisor') {
					return (
						<Aviso rolActual={activeUser.rol} rolCorrecto={'Supervisor'} />
					);
				}

				return (
					<FormaVehiculo
						arrayVehiculos={arrayVehiculos}
						jsonTipoVehiculo={jsonTipoVehiculo}
						putFunc={putFunc}
						cambiarEstado={() => {
							cambiarEstado(mostrarForma, setMostrarForma);
						}}
					/>
				);
			}
		}

		return; //No renderizar ningun componente.
	}

	return (
		<div className='card m-3 mt-3 ps-5 pt-1 bg-dark border border-primary border-3 rounded-5'>
			<h2 className='display-6 text-primary'>
				Omnibus Marca: {jsonTipoVehiculo['marca']}
			</h2>
			<ul className='list-unstyled text-body'>
				<li className='text-white'> ID: {jsonTipoVehiculo['id_vehiculo']} </li>
				<li className='text-white'> Placa No: {jsonTipoVehiculo['placa']} </li>
				<li className='text-white'>
					{' '}
					Peso: {jsonTipoVehiculo['peso_en_toneladas']} toneladas{' '}
				</li>
				<li className='text-white'>
					{' '}
					Tipo de Combustible: {jsonTipoVehiculo['tipo_de_comnustible']}{' '}
				</li>
				<li className='text-white'>
					{' '}
					Total de Kilometros Recorridos: {
						jsonTipoVehiculo['kms_recorridos']
					}{' '}
				</li>
				<li className='text-white'>
					{' '}
					Velocidad Máxima(km/h): {jsonTipoVehiculo['velocidad_maxima']}{' '}
				</li>
				<li className='text-white'>
					{' '}
					Años de Explotación: {jsonTipoVehiculo['agnos_explotacion']} años{' '}
				</li>
				<li className='text-white'>
					{' '}
					Tipo de Servicio: {jsonTipoVehiculo['tipo_servicio']}{' '}
				</li>
				<li className='text-white'>
					{' '}
					Cantidad de Asientos: {jsonTipoVehiculo['cantidad_asientos']}{' '}
				</li>
				<li className='text-white'>
					{' '}
					Cantidad de Viajes: {jsonTipoVehiculo['cantidad_viajes']}{' '}
				</li>
				<li className='text-white'>
					{' '}
					¿Está disponible? {jsonTipoVehiculo['disponibilidad']
						? 'Si'
						: 'No'}{' '}
				</li>
				<li className='text-white'>
					{' '}
					¿Tiene aíre acondicionado?{' '}
					{jsonTipoVehiculo['climatizacion'] ? 'Si' : 'No'}{' '}
				</li>
				<li className='text-white'>
					<b>Opcines:</b>
					<ol className='list-inline'>
						<li className={!mostrarForma ? `list-inline-item` : ''}>
							<button
								type='button'
								className={
									!mostrarForma
										? 'btn btn-primary m-2'
										: 'btn btn-secondary m-2'
								}
								onClick={() => {
									cambiarEstado(mostrarForma, setMostrarForma);
								}}>
								{!mostrarForma ? 'Editar' : 'No Editar'}
							</button>
							{renderObjects(mostrarForma, 'FormaVehiculo')}
						</li>
						<li className={!mostrarOpcionesEliminar ? `list-inline-item` : ''}>
							<button
								type='button'
								className={
									!mostrarOpcionesEliminar
										? 'btn btn-danger m-2'
										: 'btn btn-secondary m-2'
								}
								onClick={() => {
									cambiarEstado(
										mostrarOpcionesEliminar,
										setMostrarOpcionesEliminar,
									);
								}}>
								{!mostrarOpcionesEliminar ? 'Eliminar' : 'No Eliminar'}
							</button>
							{renderObjects(mostrarOpcionesEliminar, 'OpcionesEliminar')}
						</li>
					</ol>
				</li>
			</ul>
		</div>
	);
}

export default Vehiculo;
