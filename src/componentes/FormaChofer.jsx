import React from 'react';
import { useState, useEffect} from 'react';
//import postData from '../RequestFunctions/postData.js';
import alCambiar from '../Funciones/alCambiar.js';
import estaEnUso from '../Funciones/estaEnUso.js';
import swal from 'sweetalert';

export default function FormaChofer({arrayChoferes, postFunc, putFunc, jsonTipoChofer, cambiarEstado}) {
	//Este componente renderiza el formulario para crear un chofer.
	
	//useEffect(() => { console.log(putFunc, jsonTipoChofer)} );

	//Los valores iniciales definidos de partida son referentes a los entrys de selección.
	let defaultChofer = {'nivel_escolar': 'Inicial', 'sexo': 'Masculino', 'clasificacion' : 'B'};	
	let titulo = 'Nuevo Chofer';
	let cedulaAnteiror;
	let emailAnterior;
	let numeroTelefonoAnterior;

	//Si se pasan como argumentos un JSON tipo chofer y la funcion para actualizar, 
	//y ademas de que no se pase la funcion para crear, entoces se va a hacer una actualizacion PUT = UPDATE.
	let esEditar = jsonTipoChofer && putFunc && !postFunc;
	
	//console.log(esEditar);
	
	if (esEditar){
		//putFunc();		
		defaultChofer = jsonTipoChofer;
		titulo = 'Editar Chofer';
		cedulaAnteiror = defaultChofer['cedula'];
		emailAnterior = defaultChofer['email'];
		numeroTelefonoAnterior = defaultChofer['numero_telefono'];
	}

	const [data, setData] = useState(defaultChofer);


	//Funciones:		
	function EnvirarData(evento){
		//Se encarga de procesar la info de la forma y enviarla al Enpoint de la API correspondiente.

		//evento.preventDefault();//Evita que se recargue la pagina, al no usar este metodo se eteran evitando varios problemas.

		//console.log(data.cedula);

		if (estaEnUso(data.cedula, arrayChoferes, esEditar, 'cedula', cedulaAnteiror)) {//Ademas de esta se pueden probar que se complan otras condiciones antes de que se haga la llamada a la API.
			//Esto se puede hacer con una ventana modal.
			//alert(`Ya hay un chofer de cedula ${data.cedula} en la Base de Datos`);
			swal({
				title: 'Cedula en Uso',
				icon: 'warning',
				text: `Ya hay un chofer con la cedula: '${data.cedula}' en la Base de Datos.`
			});
			evento.preventDefault();//para que no se borre la info que hay en la forma.			
		} else if (estaEnUso(data.email, arrayChoferes, esEditar, 'email', emailAnterior)){
			//alert(`Ya hay un chofer con el email ${data.email} en la Base de Datos`)
			swal({
				title: 'Email en Uso',
				icon: 'warning',
				text: `Ya hay un chofer con el email: '${data.email}' en la Base de Datos.`
			});
			evento.preventDefault();
		} else if (estaEnUso(data.numero_telefono, arrayChoferes, esEditar, 'numero_telefono', numeroTelefonoAnterior)){
			swal({
				title: 'Numero de Telefono en Uso',
				icon: 'warning',
				text: `Ya hay un chofer con el numero de telefono: '${data.numero_telefono}' en la Base de Datos.`
			});
			evento.preventDefault();
		} else {
			//De aqui en adelante empieza la logica para hacer el POST o PUT en la API.
			//Transformar los datos a los que les corresponde ser numericos.			
			data['agnos_experiencia'] = parseInt(data['agnos_experiencia']);
			data['cantidad_de_multas'] = parseInt(data['cantidad_de_multas']);
			data['edad'] = parseInt(data['edad']);
			data['cantidad_viajes'] = parseInt(data['cantidad_viajes']);

			//Luego llamar a la funcion que hace la request a la API.
			if (esEditar){
				evento.preventDefault();
				putFunc(data['id_chofer'], 'chofer', data);
				cambiarEstado();
				//alert('Editando ...');
				//console.log('Editando ...');
			} else {
				evento.preventDefault();
				postFunc(data, 'chofer');
				//console.log(JSON.stringify(data));
				cambiarEstado();
			}			
			//if (postFunc(data, 'chofer')){
				//Si la request ha sido exitosa, borrar la info de la forma:
				//setData(defaultChofer);//No es nesesario hacerlo si voy a permitir que se recargue la pagina.			
			//}

		}
	}

	
	//let defaultChofer = {'nivel_escolar': 'Inicial', 'sexo': 'Masculino', 'clasificacion' : 'B'};
	//setData(defaultChofer);	
	//useEffect(() => {setData(defaultChofer)}, []);

	return (

		<form onSubmit = {EnvirarData} >
			<h4 className = 'display-6 text-primary'> {titulo}: </h4>
			<label className = 'form-label'>
				Nombre:
				<input 
					type = 'text'
					name = 'nombre_completo'
					value = {data.nombre_completo || ""}
					pattern = '[a-zA-Z ]{2,100}'
					title = 'El nombre del chofer solo puede contener letras tanto mayusculas como minisculas y la cantidad máxima de caractetres es = 100, ademas NO UTILICE LETRAS ACENTUADAS.'
					className = 'form-control form-control-sm'
					required
					onChange = {(evento) => {alCambiar(evento, data, setData)}} />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Edad:
				<input 
					type = 'number'
					min = '18'
					max = '80'
					name = 'edad'
					value = {data.edad || ""}
					className = 'form-control form-control-sm'
					required
					onChange = {(evento) => {alCambiar(evento, data, setData)}} />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Cedula:
				<input 
					type = 'text'
					name = 'cedula'
					value = {data.cedula || ""}
					pattern = '[0-9]{3}-[0-9]{7}-[0-9]{1}'
					title = 'Este campo debe cumplir con el siguiente patrón: ddd-ddddddd-d, donde d es un digito (0, 1, 2, ...9).'
					className = 'form-control form-control-sm'
					required
					onChange = {(evento) => {alCambiar(evento, data, setData)}} />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Número de Telefono:
				<input 
					type = 'tel'
					name = 'numero_telefono'
					value = {data.numero_telefono || ""}
					pattern= '8(09|29|49)-[0-9]{3}-[0-9]{4}'
					title = 'Los números de telefono válidos en República Dominicana empiezan por 804, 809 y 829 y estan seguidos por una serie de 7 digitos sperados en partes de 3 y 4 por guiones.' 
					className = 'form-control form-control-sm'
					required
					onChange = {(evento) => {alCambiar(evento, data, setData)}} />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Direccion Particular:
				<input 
					type = 'text'
					name = 'direccion_particular'
					value = {data.direccion_particular || ""}
					className = 'form-control form-control-sm'
					onChange = {(evento) => {alCambiar(evento, data, setData)}} />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Correo Eléctronico:
				<input 
					type = 'email'
					name = 'email'
					value = {data.email || ""}
					required
					className = 'form-control form-control-sm'
					onChange = {(evento) => {alCambiar(evento, data, setData)}} />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Nivel Escolar:
				<select className = 'form-select form-select-sm' name = 'nivel_escolar' value = {data.nivel_escolar || ""} onChange = {(evento) => {alCambiar(evento, data, setData)}}>
					<option value = 'Inicial'> Inicial </option>
					<option value = 'Primaria'> Primaría </option>
					<option value = 'Secundaria'> Secundaría </option>
					<option value = 'Superior'> Superior </option>
				</select>
			</label>
			<br></br>
			<label className = 'form-label'>
				Sexo:
				<select className = 'form-select form-select-sm' name = 'sexo' value = {data.sexo || ""} onChange = {(evento) => {alCambiar(evento, data, setData)}}>
					<option value = 'Masculino'> Masculino </option>	
					<option value = 'Femenino'> Femenino </option>	
				</select>
			</label>
			<br></br>
			<label className = 'form-label'>
				Años de Experiencia:
				<input 
					type = 'number'
					min = {esEditar ? `${defaultChofer['agnos_experiencia']}` : '0'}
					max = '70'
					name = 'agnos_experiencia'
					value = {data.agnos_experiencia || ""}
					className = 'form-control form-control-sm'
					required
					onChange = {(evento) => {alCambiar(evento, data, setData)}} />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Cantidad de Multas:
				<input 
					type = 'number'
					min = '0'
					max = '500'
					name = 'cantidad_de_multas'
					value = {data.cantidad_de_multas || ""}
					className = 'form-control form-control-sm'
					required
					onChange = {(evento) => {alCambiar(evento, data, setData)}} />														
			</label>
			<br></br>
			<label className = 'form-label'>
				Cantidad de Viajes:
				<input
					type = 'number'
					min = {esEditar ? `${defaultChofer['cantidad_viajes']}` : '0'}
					name = 'cantidad_viajes' 
					value = {data.cantidad_viajes || ""}
					className = 'form-control form-control-sm'
					required
					onChange = {(evento) => {alCambiar(evento, data, setData)}} />	
			</label>
			<br></br>
			<label className = 'form-label'>
			Clasificación:
				<select className = 'form-select form-select-sm' name = 'clasificacion' value = {data.clasificacion || ""} onChange = { (evento) => {alCambiar(evento, data, setData)} }>
					<option value = 'A'> A </option>
					<option value = 'B'> B </option>		
				</select>
			</label>			
			<br></br>
			<input type = 'submit' className = 'btn btn-success' value = {esEditar ? 'Editar Chofer' : 'Crear Chofer'} />
		</form>
	);
}

































