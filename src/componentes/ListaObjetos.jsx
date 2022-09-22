//Funciones:
import cambiarEstado from '../Funciones/cambiarEstado.js';

//Componentes Basicos:
import Vehiculo from './Vehiculo.jsx';
import Chofer from './Chofer.jsx';
import Viaje from './Viaje.jsx';
import User from './User.jsx';
import Aviso from './Aviso.jsx';

//Formularios:
import FormaChofer from './FormaChofer.jsx';
import FormaVehiculo from './FormaVehiculo.jsx';
import FormaViaje from './FormaViaje.jsx';
import FormaRegistrar from './FormaRegistrar.jsx';
import FormaFiltrar from './FormaFiltrar.jsx';

//Para agragar el scrollbar:
import '../App.css';

//Hooks:
import { useState, useEffect} from 'react';

function ListaObjetos(
		{ objetosAMostrar, arrayObjetos, tipoObjeto, postFunc, deleteFunc, putFunc, 
			arrayChoferes, arrayVehiculos, arrayViajes, activeUser, setterFunc}){	
	/*
	Este componente muestra todos los objetos (choferes, vehiculos, viajes o usuarios) que están en la Base de Datos de la API.
	*/	
	
	useEffect(() => {console.log(arrayObjetos)}); 

	const [mostrarForma, setMostrarForma] = useState(false);
	const [mostrarFormaFiltar, setMostrarFormaFiltar] = useState(false);
	//const [sonFiltados, setSonFiltados] = useState(false);
	//const [objetosFiltrados, setObjetosFiltrados] = useState(arrayObjetos);

	function rederForm(mostrarForma, tipoObjeto){
		//Renderiza la forma o no en funcion del estado de las variables 'mostrarForma' y 'tipoObjeto';
		if (mostrarForma){

			if (tipoObjeto === 'chofer'){
				
				if (!activeUser){
					return <Aviso rolActual = {null} rolCorrecto = 'Supervisor' />

				} else if (activeUser.rol != 'Supervisor'){

					return <Aviso rolActual = {activeUser.rol} rolCorrecto = 'Supervisor' />
				}

				return <FormaChofer 
									arrayChoferes = {arrayObjetos} 
									postFunc = {postFunc}
									cambiarEstado = {() => {cambiarEstado(mostrarForma, setMostrarForma)}} />
			}
						
			if (tipoObjeto === 'vehiculo'){

				if (!activeUser){
					return <Aviso rolActual = {null} rolCorrecto = 'Supervisor' />

				} else if (activeUser.rol != 'Supervisor'){

					return <Aviso rolActual = {activeUser.rol} rolCorrecto = 'Supervisor' />
				}

				return <FormaVehiculo	
										arrayVehiculos = {arrayObjetos} 
										postFunc = {postFunc} 
										cambiarEstado = {() => {cambiarEstado(mostrarForma, setMostrarForma)}} />
			}


			if (tipoObjeto === 'viaje'){

				if (!activeUser){
					return <Aviso rolActual = {null} rolCorrecto = 'Agente' />

				} else if (activeUser.rol != 'Agente'){
					return <Aviso rolActual = {activeUser.rol} rolCorrecto = 'Agente' />
				}

				return <FormaViaje	
									arrayChoferes = {arrayChoferes}
									arrayVehiculos = {arrayVehiculos}
									arrayViajes = {arrayObjetos}
									postFunc = {postFunc}
									putFunc = {putFunc}
									esEditar = {false}
									cambiarEstado = {() => {cambiarEstado(mostrarForma, setMostrarForma)}} />
				}

			if (tipoObjeto === 'usuario'){
				
				if (!activeUser){
					return <Aviso rolActual = {null} rolCorrecto = {'Administrador'} />
				}
				else if (activeUser.rol != 'Administrador'){
					return <Aviso rolActual = {activeUser.rol} rolCorrecto = {'Administrador'} />
				}

				return <FormaRegistrar 
									arrayUsuarios = {arrayObjetos}
									postFunc = {postFunc}
									cambiarEstado = {() => {cambiarEstado(mostrarForma, setMostrarForma)}} />
				}
			}
			return;//Si mostrarForma = false, no se renderizará ninguna Forma.
		}
	
	function rederForm2(mostrarFormaFiltar){

		if (mostrarFormaFiltar){
			
				return <FormaFiltrar	tipoObjeto = {tipoObjeto} setterFunc = {setterFunc} 
															cambiarEstado = {() => {cambiarEstado(mostrarFormaFiltar, setMostrarFormaFiltar)}}
								/>
				}

		return;
	}


	let plural;

	if (tipoObjeto === 'chofer'){ plural = 'Choferes'; }
	if (tipoObjeto === 'vehiculo'){ plural = 'Vehiculos'; } 
	if (tipoObjeto === 'viaje'){ plural = 'Viajes'; }
	if (tipoObjeto === 'usuario') {plural = 'Usuarios';}
	//console.log(plural);  	

	return(

		<div className = 'm-5 mt-3'>
			
			{
				activeUser ? 
					<center>
						<h4 className = 'text-primary m-3'>
							<u> {`Usuario Activo: ${activeUser['nombre_completo']}, rol: ${activeUser['rol']}`} </u> 
						</h4>
					</center>
				:
					<center>
						<h5 className = 'text-danger'> Sin Usuario Activo </h5>
					</center>
			}

			<div className = 'container'>
				<button	type = 'button' className = {!mostrarForma ? 'btn btn-primary m-1' : 'btn btn-secondary m-1' } 
								onClick = {() => {setMostrarForma(!mostrarForma)}}>
		 		 	{ !mostrarForma ? <h5> Click para agregar un {tipoObjeto} </h5> : <h5> Cerrar </h5> }
				</button>
				{rederForm(mostrarForma, tipoObjeto)}
				
				<br></br>
				<button	type = 'button' className = { !mostrarFormaFiltar ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'} 
								onClick = {() => {setMostrarFormaFiltar(!mostrarFormaFiltar)}}>
					{!mostrarFormaFiltar ? <h5> Filtrar </h5> : <h5> No Filtrar </h5> }	
				</button>
				{rederForm2(mostrarFormaFiltar)}
			</div>


			<center>
				<h1 className = 'display-5 text-primary'> <u> Lista de {plural} </u> </h1>
			</center>
			
			<div className = 'listado'>
				{
					arrayObjetos.length === 0 ? <p className = 'text-danger'> No hay {plural}, o el servidor está apagado, verifique que este ultimo esté funcionando para poder ver los {plural}, recargue la pagina luego de haberlo ensendido. </p> :
					tipoObjeto === 'chofer' ? objetosAMostrar.map((chofer) => {
						return <Chofer
								key = {chofer['id_chofer']} 
								jsonTipoChofer = {chofer} 
								deleteFunc = {deleteFunc}
								putFunc = {putFunc}
								arrayChoferes = {arrayObjetos}
								arrayViajes = {arrayViajes}
								activeUser = {activeUser}
								/>
					}) :

					tipoObjeto === 'vehiculo' ? objetosAMostrar.map((vehiculo) => {
						return <Vehiculo
								key = {vehiculo['id_vehiculo']} 
								jsonTipoVehiculo = {vehiculo}
								deleteFunc = {deleteFunc}
								putFunc = {putFunc}
								arrayVehiculos = {arrayObjetos}
								activeUser = {activeUser}
								arrayViajes = {arrayViajes}
								/>
					}):

					tipoObjeto === 'viaje' ? objetosAMostrar.map((viaje) => {
						return <Viaje
								key = {viaje['id_viaje']}
								jsonTipoViaje = {viaje}
								arrayViajes = {arrayObjetos}
								arrayVehiculos = {arrayVehiculos}
								arrayChoferes = {arrayChoferes}
								putFunc = {putFunc}
								deleteFunc = {deleteFunc} 
								activeUser = {activeUser} />
					}):

					tipoObjeto === 'usuario' ? objetosAMostrar.map((user) => {
						return	<User 
								key = {user['id']}
								jsonTipoUser = {user}
								deleteFunc = {deleteFunc}
								putFunc = {putFunc}
								arrayUsuarios = {arrayObjetos}
								id = {user['id']} 
								activeUser = {activeUser} />
					
					}): 

						<h3 className = 'text-danger'> Tipo de objeto no reconocido </h3> 										
				}
			</div>		
		</div>

		);
}


export default ListaObjetos;































