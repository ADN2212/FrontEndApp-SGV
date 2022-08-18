import React from 'react';
import { useState, useEffect} from 'react';

export default function FormaViaje(){

	const [viajeData, setViajeData] = useState({});

	function EnviarData(evento){

		//alert(`Peso en Toneladas = ${vehiculoData.peso_en_toneladas}`);
		console.log('Sendding Data ...');
		evento.preventDefault();
		console.log(viajeData);
		setViajeData({});
	}

	function alCambiar(evento){
		const nombre = evento.target.name//llave
		const valor = evento.target.value//valor
		setViajeData({...viajeData, [nombre]: valor })
		console.log(viajeData);
	}

	return (
		<form onSubmit = {EnviarData}>
			<h4>Nuevo Viaje: </h4>
			<label>
				Tipo de Viaje:
				<select name = 'tipo_viaje' value = {viajeData.tipo_viaje || ""} onChange = {alCambiar}>
					<option value = 'Local'> Local </option>
					<option value = 'Municipal'> Municipal </option>
					<option value = 'Provincial'> Provincial </option>
					<option value = 'Turismo'> Turismo </option>
					<option value = 'Arrendado'> Arrendado </option>
				</select>
			</label>
			<br></br>
			<label>
			Fecha de Inicio:
			<input 
				type='datetime-local'
				name = 'inicio_viaje'
				value = {viajeData.inicio_viaje || ""}
				onChange = {alCambiar}
				required />
			</label>
			<br></br>
			<label>
			Fecha de Inicio:
			<input 
				type='datetime-local'
				name = 'fin_viaje'
				value = {viajeData.fin_viaje || ""}
				onChange = {alCambiar}
				required />
			</label>
			<br></br>
			<label>
			Kilometros a Recorrer:
			<input 
				type='number'
				name = 'kms_recorridos'
				min = '1'
				max = '10000'
				value = {viajeData.kms_recorridos || ""}
				onChange = {alCambiar}
				required />
			</label>
			<br></br>
			<label>
				Estado del Viaje:
				<select name = 'estado_viaje' value = {viajeData.estado_viaje || ""} onChange = {alCambiar}>
					<option value = 'Creado'> Creado </option>
					<option value = 'En Proceso'> En Proceso </option>
					<option value = 'Cerrado'> Cerrado </option>
				</select>
			</label>
			<br></br>
			<label>
				Asignar Chofer:
				-Iterear Sobre los Choferes Disponibles-
			</label>
			<br></br>
			<label>
				Asignar Vehiclo:
				-Iterear Sobre los Vehiculos Disponibles-
			</label>
			<br></br>
			<label>
				Agrege Comentario:
				<br></br>
				<textarea name ='comentarios' value = {viajeData.comentarios || ""} onChange = {alCambiar}>
					...
				</textarea>
			</label>
			<br></br>
			<input type='submit' />
		</form>
		);
}













































