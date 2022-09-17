import React from 'react';
import { useState, useEffect} from 'react';
import alCambiar from '../Funciones/alCambiar.js';
//import estaEnUso from '../Funciones/estaEnUso.js';
import intersecTemp from '../Funciones/intersecTemp.js';
import parseFecha from '../Funciones/parseFecha.js';
import swal from 'sweetalert';

export default function FormaViaje({jsonTipoViaje, arrayChoferes, arrayVehiculos, arrayViajes, postFunc, putFunc, esEditar, cambiarEstado}){

	//useEffect(() => {console.log(arrayVehiculos)})
	//useEffect (() => {console.log(arrayChoferes)})

	let defaultViaje = {'tipo_viaje': 'Local', 'estado_viaje': 'Creado'};
	let titulo = 'Nuevo Viaje:';

	if (esEditar){
		//console.log('Editar ...');
		defaultViaje = jsonTipoViaje;

		if (jsonTipoViaje['chofer']){
			defaultViaje['id_chofer'] = jsonTipoViaje['chofer']['id_chofer'];
		}

		if(jsonTipoViaje['vehiculo']){
			defaultViaje['id_vehiculo'] = jsonTipoViaje['vehiculo']['id_vehiculo'];
		}	

		defaultViaje['inicio_viaje'] = defaultViaje['inicio_viaje'].slice(0, 16);
		defaultViaje['fin_viaje'] = defaultViaje['fin_viaje'].slice(0, 16);
		//delete defaultViaje['chofer'];
		//delete defaultViaje['vehiculo'];
		//console.log(defaultViaje['inicio_viaje']);
		//console.log(defaultViaje['fin_viaje']);
		titulo = 'Editar Viaje:';
	}

	const [viajeData, setViajeData] = useState(defaultViaje);

	//useEffect(()=> {console.log( esEditar, viajeData['estado_viaje'] === 'Cerrado', viajeData['estado_viaje'] === 'En Proceso' )}); 
	//useEffect(()=> {console.log( esEditar && viajeData['estado_viaje'] === 'Cerrado' || viajeData['estado_viaje'] === 'En Proceso' )}); 

	function EnviarData(evento){

		//alert(`Peso en Toneladas = ${vehiculoData.peso_en_toneladas}`);

		//Crear una copia del JSON del viaje para poder manipularla:
		let viajeToSend = viajeData;	


		//Analizar los fechas de inicio y fin del viaje:

		let inicioViaje = new Date(viajeToSend['inicio_viaje']);
		let finViaje = new Date(viajeToSend['fin_viaje']);
		let deltaTime = finViaje - inicioViaje;//Retorna el tiempo transcurrido en milisegundos:


		if (deltaTime <= 0){
			//alert(`La fecha del fin del viaje debe ser mayor que la del inicio.`);			
			swal({
				icon: 'error',
				title: 'Error Fechas',
				text: 'Procure que la fecha de inicio del viaje sea anterior a la del final de este.'
			});

			evento.preventDefault();
			return;//Si no se cumple esta condicion, no es nesesario seguir ejecutando esta función.
		}

		if (deltaTime < 3600000){//1 hora = 60 mins = 3,600 segs = 3,600,000 milisegs.
			//alert(`Todo viaje debe durar al menos una hora.`);
			swal({
				title: 'Duración del Viaje',
				icon: 'error',
				text: 'Todo viaje debe durar al menos una hora.'
			});
			evento.preventDefault();
			return;
		}

		if (!viajeToSend['id_chofer']){
			//alert('No ha seleccionado ningun chofer');
			swal({
				title: 'Chofer no Seleccionado',
				icon: 'warning',
				text: 'No ha seleccionado ningun chofer.'
			});
			evento.preventDefault();
			return;
		}

		if (!viajeToSend['id_vehiculo']){
			//alert('No ha seleccionado ningun vehiculo');
			swal({
				title: 'Vehiculo no Seleccionado',
				icon: 'warning',
				text: 'No ha seleccionado ningun vehiculo.'
			});
			evento.preventDefault();
			return;
		}
		//Parcear Algunos Campos:
		viajeToSend['chofer'] = {'id_chofer' : parseInt(viajeData['id_chofer'])}//El servidor debe resivir un diccionario obligatoriamente.
		viajeToSend['vehiculo'] = {'id_vehiculo': parseInt(viajeData['id_vehiculo'])}
		viajeToSend['kms_recorridos'] = parseInt(viajeToSend['kms_recorridos']);
		
		//Ponerle un comentario por default 
		if (!viajeToSend['comentarios']){
			viajeToSend['comentarios'] = '...';
		}

		//Adaptar las fechas al formato de la API:(No lo pude hacer aqui porque salta un error en la consola).
		//viajeToSend['inicio_viaje'] += ':00Z';//Esto lo puedo hacer antes de enviarlo.
		//viajeToSend['fin_viaje'] += ':00Z';

		let viajesIntesectados = (intersecTemp(viajeToSend, arrayViajes))

		if(viajesIntesectados){
			//Todo esto será presentado de una manera mas amigable a usuario:
			let ids = viajesIntesectados.map((viaje) => { 
				return `Viaje de id: ${viaje.id_viaje}`;
				}
			)

			swal({
				title: 'Conflictos con las Fechas',
				icon: 'error',
				text: 
				`Las fechas de inicio y fin de este viaje generan conflictos con las de los siguientes viajes: ${ids}.`
			});

			evento.preventDefault();
			return;//Termina la ejecución de la funcion para que no se haga la POST o PUT request al servidor.
		}

		//evento.preventDefault();
		//console.log('Bien');

		if (esEditar){
			evento.preventDefault();
			putFunc(viajeToSend['id_viaje'], 'viaje', viajeToSend);
			cambiarEstado();

		} else {
			evento.preventDefault();
			postFunc(viajeToSend, 'viaje');
			cambiarEstado();
		}
		
		
		if (viajeToSend['estado_viaje'] === 'Cerrado'){
			//evento.preventDefault();

			//Aumentar la cantidad de viajes y los kilometros recorridos del viaje al vehiculo si este ya está culminado:
			let vehiculoActualizar = arrayVehiculos.filter(
					(vehiculo) => { 
						return vehiculo['id_vehiculo'] === viajeToSend['vehiculo']['id_vehiculo'];
				}
			)[0];//El subindice es porque filter retorna un array.

			vehiculoActualizar['kms_recorridos'] += viajeToSend['kms_recorridos'];
			vehiculoActualizar['cantidad_viajes'] += 1;	
			//console.log(vehiculoActualizar);

			putFunc(vehiculoActualizar['id_vehiculo'], 'vehiculo', vehiculoActualizar, true);
			
			//Tambien sumarle uno a la cantidad de viajes que ha realizado el chofer:
			let choferActualizar = arrayChoferes.filter(
				(chofer) => {
						return chofer['id_chofer'] === viajeToSend['chofer']['id_chofer'];
					}
				)[0];

			choferActualizar['cantidad_viajes'] += 1;

			putFunc(choferActualizar['id_chofer'], 'chofer', choferActualizar, true);

			//document.location.reload();//Hace que se recargue la pagina(No fue nesesario usarla).
		}

	}

	return (
		<form onSubmit = {EnviarData}>
			<h4 className = 'display-6 text-primary'> {titulo} </h4>
			<label className = 'form-label'>
				Tipo de Viaje:
				{
					!(esEditar && (viajeData['estado_viaje'] === 'Cerrado' || viajeData['estado_viaje'] === 'En Proceso')) ?

					<select className = 'form-select form-select-sm' name = 'tipo_viaje' value = {viajeData.tipo_viaje || ""} onChange = {(evento) => {alCambiar(evento, viajeData, setViajeData)}}>
						<option value = 'Local'> Local </option>
						<option value = 'Municipal'> Municipal </option>
						<option value = 'Provincial'> Provincial </option>
						<option value = 'Turismo'> Turismo </option>
						<option value = 'Arrendado'> Arrendado </option>
					</select>
				
					: <>{` ${viajeData['tipo_viaje']}`}</>
				}	
			</label>
			<br></br>
			<label className = 'form-label'>
			Fecha de Inicio:
			{	
				!(esEditar && (viajeData['estado_viaje'] === 'En Proceso' || viajeData['estado_viaje'] === 'Cerrado')) ?
					<input 
						className = 'form-control form-control-sm'
						type='datetime-local'
						name = 'inicio_viaje'
						value = {viajeData.inicio_viaje || ""}
						onChange = {(evento) => {alCambiar(evento, viajeData, setViajeData)}}
						required />
					
					: <>{ ' ' + parseFecha(viajeData.inicio_viaje) }</>
			}
			
			</label>
			<br></br>
			<label className = 'form-label'>
			Fecha de Termino:
				{
					!(esEditar && viajeData['estado_viaje'] === 'Cerrado')?
						<input
							className = 'form-control form-control-sm' 
							type='datetime-local'
							name = 'fin_viaje'
							value = {viajeData.fin_viaje || ""}
							onChange = {(evento) => {alCambiar(evento, viajeData, setViajeData)}}
							required />

					: <>{ ' ' + parseFecha(viajeData.inicio_viaje) }</>
				}				
			</label>
			<br></br>
			<label className = 'form-label'>
			Kilometros a Recorrer:
				{ 
					!(esEditar && viajeData['estado_viaje'] === 'Cerrado')?
						<input
							className = 'form-control form-control-sm' 
							type='number'
							name = 'kms_recorridos'
							min = '1'
							max = '10000'
							value = {viajeData.kms_recorridos || ""}
							onChange = {(evento) => {alCambiar(evento, viajeData, setViajeData)}}
							required />

					: <>{` ${viajeData['kms_recorridos']}`}</>
				}
			</label>
			<br></br>
			<label className = 'form-label'>
				Estado del Viaje:
				<select className = 'form-select form-select-sm' name = 'estado_viaje' value = {viajeData.estado_viaje || ""} onChange = {(evento) => {alCambiar(evento, viajeData, setViajeData)}}>
					{!(esEditar && (viajeData['estado_viaje'] === 'En Proceso' || viajeData['estado_viaje'] === 'Cerrado')) ? <option value = 'Creado'> Creado </option> : ''}						
						<option value = 'En Proceso'> En Proceso </option>
						<option value = 'Cerrado'> Cerrado </option>				
				</select>
			</label>
			<br></br>
			<label className = 'form-label'>
				Asignar Chofer:
					{
						!(esEditar && (viajeData['estado_viaje'] === 'En Proceso' || viajeData['estado_viaje'] === 'Cerrado')) ?
							!(arrayChoferes.length === 0) ?
								<select className = 'form-select form-select-sm' name = 'id_chofer' value = {viajeData.id_chofer || "" } onChange ={(evento) => {alCambiar(evento, viajeData, setViajeData)}}>
									<option> --Despliegue para seleccionar chofer--</option>
									{								
											arrayChoferes.map((chofer) => {
												return <option key = {chofer.id_chofer} value = {chofer.id_chofer}>{`Nombre:${chofer.nombre_completo}, Cedula:${chofer.cedula}`}</option>
											}
										)
									} 
								</select> : <b> No hay choferes, por favor agregue uno para poder crear viajes. </b>
						: <>{ viajeData['chofer'] ? ` Nombre: ${viajeData['chofer']['nombre_completo']} y cedula: ${viajeData['chofer']['cedula']}` : ' El chofer ha sido eliminado.'}</>
					}
			</label>
			<br></br>
			<label className = 'form-label'>
				Asignar Vehiculo:
				{ 
					!(esEditar && (viajeData['estado_viaje'] === 'En Proceso' || viajeData['estado_viaje'] === 'Cerrado')) ?
						!(arrayVehiculos.length === 0) ?
							<select className = 'form-select form-select-sm' name = 'id_vehiculo' value = {viajeData.id_vehiculo || ""} onChange = {(evento) => {alCambiar(evento, viajeData, setViajeData)}}> 
								<option> --Despliegue para seleccionar vehiculo-- </option>
								{
									arrayVehiculos.map((vehiculo) => {
										return <option key = {vehiculo.id_vehiculo} value = {vehiculo.id_vehiculo}> {`Vehiculo de Marca: ${vehiculo.marca} y Placa: ${vehiculo.placa}`} </option>
										}
									)
								}
							</select> : <b> No hay vehiculos disponibles, por favor agregue uno, o espere que uno esté disponible para poder crear viajes. </b>
					:<>{ viajeData['vehiculo'] ? ` Vehiculo de Marca: ${viajeData['vehiculo']['marca']} y Placa: ${viajeData['vehiculo']['placa']}` : ' El vehiculo a sido borrado.'}</>
				}
			</label>
			<br></br>
			<label className = 'form-label'>
				Agrege un Comentario:
				<br></br>
				<textarea className = 'form-control' name ='comentarios' value = {viajeData.comentarios || ""} onChange = {(evento) => {alCambiar(evento, viajeData, setViajeData)}}>
					...
				</textarea>
			</label>
			<br></br>
			<input type='submit' value = {esEditar ? 'Editar Viaje' : 'Crear Viaje'} className = 'btn btn-success' />
		</form>
		);
}










































