import React from 'react';
import { useState, useEffect} from 'react';
import alCambiar from '../Funciones/alCambiar.js';
import estaEnUso from '../Funciones/estaEnUso.js';


export default function FormaVehiculo({arrayVehiculos, postFunc, putFunc, jsonTipoVehiculo}){

	//Se sigue la misma logica que en el componente FormaChofer.

	let defaultVehiculo = {'tipo_de_comnustible' : 'Gasolina', 'tipo_servicio' : 'Regular', 'disponibilidad' : true, 'climatizacion': false };
	let titulo = 'Nuevo Vehiculo:';
	let esEditar = jsonTipoVehiculo && putFunc && !postFunc;
	let placaAnterior;
	

	if (esEditar){
		defaultVehiculo = jsonTipoVehiculo;
		titulo = 'Editar Vehiculo:';
		placaAnterior = defaultVehiculo['placa'];
	}

	const [disponible, setDisponible] = useState(defaultVehiculo['disponibilidad']);
	const [climatizacion, setClimatizacion] = useState(defaultVehiculo['climatizacion']);
	const [vehiculoData, setVehiculoData] = useState(defaultVehiculo);
	
	//useEffect(() => {console.log(vehiculoData['disponibilidad'])});
	//useEffect(() => {console.log(disponible)}, [disponible]);

	function EnviarData(evento){

		//evento.preventDefault();
		//alert(`Peso en Toneladas = ${vehiculoData.peso_en_toneladas}`);
		//console.log('Hola');
		
		//function estaEnUso(valorActual, arrayObjetos, esEditar, llaveAEvaluar, valorAnterior)

		//console.log(vehiculoData['placa']);
		//console.log(arrayVehiculos);
		//console.log(esEditar);
		//console.log(placaAnterior);

		if (estaEnUso(vehiculoData['placa'], arrayVehiculos, esEditar, 'placa', placaAnterior)){
			alert(`El numero de placa ${vehiculoData['placa']} ya esta en uso.`);
			evento.preventDefault();
			return;
		}

		//Tranformar los valores que deben ser de tipo númerico:
		vehiculoData['agnos_explotacion'] = parseInt(vehiculoData['agnos_explotacion']);
		vehiculoData['cantidad_asientos'] = parseInt(vehiculoData['cantidad_asientos']);
		vehiculoData['kms_recorridos'] = parseInt(vehiculoData['kms_recorridos']);
		vehiculoData['peso_en_toneladas'] = parseFloat(vehiculoData['peso_en_toneladas']);
		vehiculoData['velocidad_maxima'] = parseInt(vehiculoData['velocidad_maxima']);
		//Asiganar valores de los otros hooks al SJON princiapal:
		vehiculoData['disponibilidad'] = disponible;		
		vehiculoData['climatizacion'] = climatizacion;

		if (!vehiculoData['peso_en_toneladas']){
		//Si el user no mueve la barra del peso el valor queda = null;
		vehiculoData['peso_en_toneladas'] = 25;//Asignar el valor medio entre 20 y 30;
		}

		console.log('Sendding Data ...');

		if (esEditar){			
			//alert('Editando ...');
			console.log('Editando');
			putFunc(vehiculoData['id_vehiculo'], 'vehiculo', vehiculoData);
			//evento.preventDefault();
			//console.log(JSON.stringify(vehiculoData));
			//console.log(vehiculoData);
			return;
		}

		//evento.preventDefault();
		//console.log(vehiculoData);
		postFunc(vehiculoData, 'vehiculo');
		//setVehiculoData({});
		//console.log(vehiculoData);
		return;
	}



	//--------------------------------------------------------------------------------------------------------------------------------

	return(

		<form onSubmit = {EnviarData}>
			<h4> {titulo} </h4>
			<label>
				Marca:
				<input 
					type = 'text'
					name = 'marca'
					value = {vehiculoData.marca || ""}
					required
					onChange = {(evento) => { alCambiar(evento, vehiculoData, setVehiculoData) }} />														
			</label>
			<br></br>
			<label>
				Placa:
				<input 
					type = 'text'
					name = 'placa'
					value = {vehiculoData.placa || ""}
					pattern = '(D|I|P|R)[0-9]{6}'
					title = 'Las placas de los Omnibus (Autobuses) en RD empiezan por letra mayuscula como D, I, P o R que a su vez es seguida por un número entero de 6 digitos.'
					required
					onChange = {(evento) => { alCambiar(evento, vehiculoData, setVehiculoData) }} />														
			</label>
			<br></br>
			<label>
				Peso en Toneladas (min = 20, max = 30):
				<input 
					type = 'range'
					min = '20'
					max = '30'
					step = '0.01'
					name = 'peso_en_toneladas'
					value = {vehiculoData.peso_en_toneladas || ""}
					required
					onChange = {(evento) => {alCambiar(evento, vehiculoData, setVehiculoData)}} />														
			</label>
			<br></br>
			<label>
				Tipo de Combustible:
				<select name = 'tipo_de_comnustible' value = {vehiculoData.tipo_de_comnustible || ""} onChange = {(evento) => {alCambiar(evento, vehiculoData, setVehiculoData)}}>
					<option value = 'Gasolina'> Gasolina </option>
					<option value = 'Diesel'> Diesel </option>
					<option value = 'Petroleo'> Petroleo </option>

				</select>	
			</label>
			<br></br>
			<label>
				Total de Kilometros Recorridos:
				<input 
					type = 'number'
					min = {esEditar ? `${defaultVehiculo['kms_recorridos']}` : '5'}
					name = 'kms_recorridos'
					value = {vehiculoData.kms_recorridos || ""}
					required
					onChange = {(evento) => {alCambiar(evento, vehiculoData, setVehiculoData)}} />														
			</label>
			<br></br>
			<label>
				Velocidad Máxima(Km/h):
				<input 
					type = 'number'
					min = '60'
					max = '150'
					name = 'velocidad_maxima'
					value = {vehiculoData.velocidad_maxima || ""}
					required
					onChange = {(evento) => {alCambiar(evento, vehiculoData, setVehiculoData)}} />														
			</label>
			<br></br>
			<label>
				Años de Explotación:
				<input 
					type = 'number'
					min = {esEditar ? `${defaultVehiculo['agnos_explotacion']}` : '0'}
					max = '50'
					name = 'agnos_explotacion'
					value = {vehiculoData.agnos_explotacion || ""}
					required
					onChange = {(evento) => {alCambiar(evento, vehiculoData, setVehiculoData)}} />														
			</label>
			<br></br>
			<label>
				Tipo de Servicio:
				<select name = 'tipo_servicio' value = {vehiculoData.tipo_servicio || ""} onChange = {(evento) => {alCambiar(evento, vehiculoData, setVehiculoData)}}>
					<option value = 'Regular'> Regular </option>
					<option value = 'Especial'> Especial </option>
					<option value = 'VIP'> VIP </option>
				</select>	
			</label>
			<br></br>
			<label>
				Cantidad de Asientos:
				<input 
					type = 'number'
					min = '30'
					max = '120'
					name = 'cantidad_asientos'
					value = {vehiculoData.cantidad_asientos || ""}
					required
					onChange = {(evento) => {alCambiar(evento, vehiculoData, setVehiculoData)}} />														
			</label>
			<br></br>
			<label>
				Cantidad de Viajes:
				<input
					type = 'number'
					min = {esEditar ? `${defaultVehiculo['cantidad_viajes']}` : '0'}
					name = 'cantidad_viajes'
					value = {vehiculoData.cantidad_viajes || ""}
					required
					onChange = {(evento) => {alCambiar(evento, vehiculoData, setVehiculoData)}} />		 
			</label>
			<br></br>
			<label>
				¿Está disponible?
				<input	type = 'checkbox' 
								name = 'disponibilidad'  
								defaultChecked = {disponible}
								onChange = {() => {setDisponible(!disponible)}} />
			
			</label>
			<br></br>
			<label>
				¿Tiene aire acondicionado?
				<input	type = 'checkbox'	
								name = 'climatizacion'
								defaultChecked = {climatizacion}
								onChange = {() => {setClimatizacion(!climatizacion)}} />
			</label>
			<br></br>
			<input type='submit' />			
		</form>
		)

}



/*	
<select name = 'disponibilidad' value = {vehiculoData.disponibilidad || ""} onChange = {(evento) => {alCambiar(evento, vehiculoData, setVehiculoData)}}>
	<option value = {true}> Si </option>
	<option value = {false}> No </option>
</select>
*/	

/*
<select name = 'climatizacion' value = { vehiculoData.climatizacion || "" } onChange = {(evento) => {alCambiar(evento, vehiculoData, setVehiculoData)}}>
	<option value = {false}> No </option>
	<option value = {true}> Si </option>					
</select>	
*/







































