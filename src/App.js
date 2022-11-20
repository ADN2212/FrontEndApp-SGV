import './estilos/App.css';

//Logo:
import urlLogo1 from './logos/logo1.png';

//Funciones:
import refreshToken from './Funciones/refreshToken.js';
import isLogin from './Funciones/isLogin.js';
import filtrarObjetos from './Funciones/filtrarObjetos.js';
import loginAtStart from './Funciones/loginAtStart.js';

//Componentes Compuestos:
import ListaObjetos from './componentes/ListaObjetos.jsx';
import BarraNavegacion from './componentes/BarraNavegacion.jsx';
import CalcularGanacias from './componentes/CalcularGanancias.jsx';

//Componetes Simples:
import FormaLogin from './componentes/FormaLogin.jsx';
import FormaLogout from './componentes/FormaLogout.jsx';
import Footer from './componentes/Footer.jsx';
import Home from './componentes/Home.jsx';
import AvisoAcceso from './componentes/AvisoAcceso.jsx';
import Logo from './componentes/Logo.jsx';

//Hooks:
import React, { useState, useEffect } from 'react';

//Paquetes Extras:
import {
	BrowserRouter as Router,
//	Switch,
	Route,
//	Link,
	Routes,
} from 'react-router-dom';

//Para las ventanas emergentes:
import swal from 'sweetalert';

function App() {
	/*
    Este es el componente principal, sobre el cual se renderizarán los demas.
  	*/

	//Hooks:
	const [choferes, setChoferes] = useState([]); //Lo que esta dentro es un valor inicial.
	const [vehiculos, setVehiculos] = useState([]);
	const [viajes, setViajes] = useState([]);
	const [usuarios, setUsuarios] = useState([]);
	const [activeUser, setActiveUser] = useState({});
	//Hooks para filtrar los objetos:
	const [valorFiltrarUsers, setValorFiltrarUsers] = useState({ rol: null });
	const [valorFiltrarChoferes, setValorFiltrarChoferes] = useState({
		clasificacion: null,
	});
	const [valorFiltrarVehiculos, setValorFiltrarVehiculos] = useState({
		tipo_servicio: null,
	});
	const [valorFiltrarViajes, setValorFiltrarViajes] = useState({
		estado_viaje: null,
	});

	//Como el segundo parametro está vacio esto solo funcionará la primera vez que se renderice App.js.
	useEffect(() => {
		getAllData('vehiculo', setVehiculos);
	}, []);
	useEffect(() => {
		getAllData('chofere', setChoferes);
	}, []);
	useEffect(() => {
		getAllData('viaje', setViajes);
	}, []);
	useEffect(() => {
		getAllData('sgv_user', setUsuarios);
	}, []);
	useEffect(() => {
		loginAtStart(setActiveUser);
	}, []);

	async function getAllData(tipoObjeto, setterFunc) {
	/*
  		Esta función hace la request de todos los datos a la API para objetos de tipo chofer, vehiculo o viaje.
  		El parametro setterFunc es la funcion que actualiza el estado del Hook.  
  	*/

		if (
			tipoObjeto === 'chofere' ||
			tipoObjeto === 'vehiculo' ||
			tipoObjeto === 'viaje' ||
			'sgv_user'
		) {
			console.log(`Trayendo ${tipoObjeto}s ...`);
		} else {
			alert(`Opcion no valida: ${tipoObjeto}`);
			return; //fin de la ejecución.
		}

		let url = `http://localhost:8000/get_${tipoObjeto}s/all`;

		try {
			let response = await fetch(url);
			let data = await response.json();
			//console.log(data);
			setterFunc(data);
			return; //Esto termina la ejecucion de la función.
		} catch (error) {
			swal({
				title: 'Sin Conexión',
				icon: 'warning',
				text: 'No es posible conectarce actualmente.',
			});
		}
	}

	async function postData(json, tipoObjeto) {
	/*
      Se encarga de hacer la POST request sobre el Endpoint de la API que corresponda al tipo de objeto (type).
      Es pasada como argumento a travez de los componente ListaObjetos y Forma/Chofer/Vehiculo/Viaje.
    */

		//Endpoint de la API para crear un chofer, vehiculo o viaje:

		if (
			tipoObjeto === 'chofer' ||
			tipoObjeto === 'vehiculo' ||
			tipoObjeto === 'viaje' ||
			tipoObjeto === 'sgv_user'
		) {
			console.log(`Creando ${tipoObjeto} ...`);
		} else {
			alert('Opcion no valida :(');
			return; //fin de la ejecución.
		}

		let jsonStr;

		if (tipoObjeto === 'viaje') {
			//Para evitar que salte un error porque no coincide el formato
			let json2 = json;
			json2['inicio_viaje'] += ':00Z';
			json2['fin_viaje'] += ':00Z';
			jsonStr = JSON.stringify(json2);
		} else {
			jsonStr = JSON.stringify(json); //Transforma el json en una cadena de texto.
		}

		let url = `http://localhost:8000/post_${tipoObjeto}`;

		//let alerta = swal({title: 'Hola'});

		try {
			let response = await fetch(url, {
				method: 'POST',
				body: jsonStr,
				headers: {
					//Enviar el Acces Token al servidor para que prueve si el user está Autenticado.
					'Authorization': localStorage.getItem('access')
						? 'JWT ' + localStorage.getItem('access')
						: null,
					'Content-type': 'application/json',
					'accept': 'application/json',
				},
			});

			//alerta.close();
			
			if (response.ok) {
				if (tipoObjeto === 'sgv_user') {
					swal({
						title: `Usuario Registrado`,
						icon: 'success',
						text: `Recuerde esta información: Email: ${json.email} y Contraseña: ${json.password} .`,
					});
				} else {
					let tO = tipoObjeto;
					swal({
						title: `${tO.replace(tO[0], tO[0].toUpperCase())} Creado`,
						icon: 'success',
						text: `Un nuevo ${tipoObjeto} ha sido agregado con exito!`,
					});
				}

				if (tipoObjeto === 'viaje') {
					//De esta manera evita tener que recargar la pagina completa.
					getAllData('viaje', setViajes);
				}

				if (tipoObjeto === 'chofer') {
					//Rehacer la request para obtener el nuevo chofer con su id.
					getAllData('chofere', setChoferes);
				}

				if (tipoObjeto === 'vehiculo') {
					//Rehacer la request para obtener el nuevo chofer con su id.
					getAllData('vehiculo', setVehiculos);
				}

				if (tipoObjeto === 'sgv_user') {
					getAllData('sgv_user', setUsuarios);
				}

				return;
			} else {
				//let errorData = await response.json();
				refreshToken();
			}
		} catch (error) {
			swal({
				title: 'Sin Conexión',
				icon: 'warning',
				text: 'No es posible conectarce actualmente.',
			});
		}
	}

	async function deleteData(id, tipoObjeto) {
	/*
      Se encarga de hacer la petición a la API para borrar el objeto.
    */
		let url = `http://localhost:8000/delete_${tipoObjeto}/${id}`;

		if (
			tipoObjeto === 'chofer' ||
			tipoObjeto === 'vehiculo' ||
			tipoObjeto === 'viaje' ||
			tipoObjeto === 'sgv_user'
		) {
			//alert(`Borrando ${tipoObjeto}`);
			console.log('Borrando ...');
		} else {
			alert(`Tipo de objeto no valido: ${tipoObjeto}`);
			return;
		}

		try {
			let response = await fetch(url, {
				method: 'DELETE',
				headers: {
					//Enviar el Acces Token al servidor para que prueve si el user está Autenticado.
					'Authorization': localStorage.getItem('access')
						? 'JWT ' + localStorage.getItem('access')
						: null,
					'Content-type': 'application/json',
					'accept': 'application/json',
				},
			});

			if (response.ok) {
				//Todo esto se puede generalizar (crear una función)
				//Quitar el elemento del array en el que se encuentra.
				if (tipoObjeto === 'chofer') {
					//Cambiar el valor de un hook hará que se re-reebderizen los componetes.
					setChoferes(
						choferes.filter((chofer) => {
							return !(chofer['id_chofer'] === id); //todos lo choferes que no tengan el id.
						}),
					);
				}

				if (tipoObjeto === 'vehiculo') {
					setVehiculos(
						vehiculos.filter((vehiculo) => {
							return !(vehiculo['id_vehiculo'] === id);
						}),
					);
				}

				if (tipoObjeto === 'viaje') {
					setViajes(
						viajes.filter((viaje) => {
							return !(viaje['id_viaje'] === id);
						}),
					);
				}
				if (tipoObjeto === 'sgv_user') {
					setUsuarios(
						usuarios.filter((user) => {
							return !(user['id'] === id);
						}),
					);
				}

				swal({
					title: `${
						tipoObjeto === 'sgv_user' ? 'Usuario' : tipoObjeto
					} Eliminado`,
					icon: 'success',
					text: `El ${
						tipoObjeto === 'sgv_user' ? 'Usuario' : tipoObjeto
					} de id = ${id} ha sido borrado exitosamente!`,
				});

				return;
			} else {
				let errorData = await response.json();
				//Si se llegar a este punto, dadas las restricciones de la App, es porque el acces token a caducado.
				refreshToken();
				console.log(errorData); //Mostrar estos mensajes en el alert.
			}
		} catch (error) {
			//evento.preventDefault();
			swal({
				title: 'Sin Conexión',
				icon: 'warning',
				text: 'No es posible conectarce actualmente.',
			});
		}
	}

	async function putData(id, tipoObjeto, json, noMostrarAlerta) {
		//Función que sirve para hacer una PUT request, es decir, actualizar los objetos de tipo chofer, vehiculo y viaje.

		let url = `http://localhost:8000/put_${tipoObjeto}/${id}`;

		//Transforma el JSON a una cadena de texto para poder ser enviado al Enpoint de la API.

		if (
			tipoObjeto === 'chofer' ||
			tipoObjeto === 'vehiculo' ||
			tipoObjeto === 'viaje' ||
			tipoObjeto === 'sgv_user'
		) {
			console.log(`Actualizando ${tipoObjeto} ...`);
		} else {
			alert('Opcion no valida :(');
			return; //fin de la ejecución.
		}

		let jsonStr;

		if (tipoObjeto === 'viaje') {
			//Para evitar que salte un error porque no coincide el formato
			let json2 = json; //Esto es para no alterar el input.
			json2['inicio_viaje'] += ':00Z';
			json2['fin_viaje'] += ':00Z';
			jsonStr = JSON.stringify(json2);
		} else {
			jsonStr = JSON.stringify(json); //Transforma el json en una cadena de texto.
		}

		try {
			//En caso de que falle la request.
			let response = await fetch(url, {
				method: 'PUT',
				body: jsonStr,
				headers: {
					//Enviar el Acces Token al servidor para que prueve si el user está Autenticado.
					'Authorization': localStorage.getItem('access')
						? 'JWT ' + localStorage.getItem('access')
						: null,
					'Content-type': 'application/json',
					'accept': 'application/json',
				},
			});

			if (response.ok) {
				//Cambiar el json en el array corespondiente.

				if (tipoObjeto === 'chofer') {
					getAllData('chofere', setChoferes);
					getAllData('viaje', setViajes);
				}

				if (tipoObjeto === 'vehiculo') {
					getAllData('vehiculo', setVehiculos);
					getAllData('viaje', setViajes);
				}

				if (tipoObjeto === 'viaje') {
					getAllData('viaje', setViajes);
				}

				if (tipoObjeto === 'sgv_user') {
					getAllData('sgv_user', setUsuarios);
				}

				if (!noMostrarAlerta) {
					// !undefined = true, esto es para no pasar el arg cuando no lo quiera usar.
					if (!(tipoObjeto === 'sgv_user')) {
						let tO = tipoObjeto;
						swal({
							title: `${tO.replace(tO[0], tO[0].toUpperCase())} Editado`,
							icon: 'success',
							text: `El ${tipoObjeto} de id = ${id} ha sido editado con exito.`,
						});
					} else {
						swal({
							title: ` Usuario Editado`,
							icon: 'success',
							text: `Su nueva contraseña es: ${json['password']} y su nuevo Email es: ${json['email']}`,
						});
					}
				}

				return;
			} else {
				let errorData = await response.json();
				refreshToken();
				console.log(errorData);
			}
		} catch (error) {
			swal({
				title: 'Sin Conexión',
				icon: 'warning',
				text: 'No es posible conectarce actualmente.',
			});
		}
	}

	return (
		<div className='mt-0 p-5' id='app'>
			<Router>
				<center>
					<Logo url={urlLogo1} />
				</center>

				<BarraNavegacion activeUser={isLogin(activeUser) ? activeUser : null} />

				<Routes>
					<Route path='/' element={<Home />} />

					<Route path='/about' element={<h2> Que se pone en about? </h2>} />

					<Route
						path='login'
						element={
							!isLogin(activeUser) ? (
								<FormaLogin usuarios={usuarios} setActiveUser={setActiveUser} />
							) : (
								<FormaLogout
									activeUser={activeUser}
									setActiveUser={setActiveUser}
								/>
							)
						}
					/>

					<Route
						path='/choferes'
						element={
							isLogin(activeUser) ? (
								<ListaObjetos
									arrayObjetos={choferes}
									objetosAMostrar={filtrarObjetos(
										choferes,
										valorFiltrarChoferes.clasificacion,
										'clasificacion',
									)}
									tipoObjeto={'chofer'}
									arrayViajes={viajes}
									postFunc={postData}
									deleteFunc={deleteData}
									putFunc={putData}
									activeUser={isLogin(activeUser) ? activeUser : null}
									setterFunc={setValorFiltrarChoferes}
								/>
							) : (
								<AvisoAcceso tipoUser={null} />
							)
						}
					/>

					<Route
						path='/vehiculos'
						element={
							isLogin(activeUser) ? (
								<ListaObjetos
									objetosAMostrar={filtrarObjetos(
										vehiculos,
										valorFiltrarVehiculos.tipo_servicio,
										'tipo_servicio',
									)}
									arrayObjetos={vehiculos}
									tipoObjeto={'vehiculo'}
									postFunc={postData}
									deleteFunc={deleteData}
									putFunc={putData}
									activeUser={isLogin(activeUser) ? activeUser : null}
									setterFunc={setValorFiltrarVehiculos}
									arrayViajes={viajes}
								/>
							) : (
								<AvisoAcceso tipoUser={null} />
							)
						}
					/>

					<Route
						path='/viajes'
						element={
							isLogin(activeUser) ? (
								activeUser.rol === 'Administrador' ||
								activeUser.rol === 'Agente' ? (
									<ListaObjetos
										objetosAMostrar={filtrarObjetos(
											viajes,
											valorFiltrarViajes.estado_viaje,
											'estado_viaje',
										)}
										arrayObjetos={viajes}
										tipoObjeto={'viaje'}
										arrayChoferes={choferes}
										//Enviar solo los vehiculos que esten disponibles
										arrayVehiculos={vehiculos.filter((vehiculo) => {
											return vehiculo.disponibilidad;
										})}
										postFunc={postData}
										putFunc={putData}
										deleteFunc={deleteData}
										activeUser={isLogin(activeUser) ? activeUser : null}
										setterFunc={setValorFiltrarViajes}
									/>
								) : (
									<AvisoAcceso tipoUser={'Administrador o Agente'} />
								)
							) : (
								<AvisoAcceso tipoUser={null} />
							)
						}
					/>

					<Route
						path='/usuarios'
						element={
							isLogin(activeUser) ? (
								activeUser.rol === 'Administrador' ? (
									<ListaObjetos
										objetosAMostrar={filtrarObjetos(
											usuarios,
											valorFiltrarUsers.rol,
											'rol',
										)}
										arrayObjetos={usuarios}
										tipoObjeto={'usuario'}
										postFunc={postData}
										putFunc={putData}
										deleteFunc={deleteData}
										activeUser={isLogin(activeUser) ? activeUser : null}
										setterFunc={setValorFiltrarUsers}
									/>
								) : (
									<AvisoAcceso tipoUser={'Administrador'} />
								)
							) : (
								<AvisoAcceso tipoUser={'Administrador'} />
							)
						}
					/>

					<Route
						path='/calcular_ganacias'
						element={
							isLogin(activeUser) ? (
								<CalcularGanacias arrayViajes={viajes} />
							) : (
								<AvisoAcceso tipoUser={null} />
							)
						}
					/>
				</Routes>
			</Router>
			<Footer />
		</div>
	);
}

export default App;