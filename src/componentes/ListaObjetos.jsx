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
//import FormarEditarUser from './FormarEditarUser.jsx';

//Para agragar el scrollbar:
import '../App.css';


import { useState, useEffect} from 'react';

function ListaObjetos({ arrayObjetos, tipoObjeto, postFunc, deleteFunc, putFunc, arrayChoferes, arrayVehiculos, arrayViajes, activeUser}){	
	/*
	Este componente muestra todos los objetos (choferes, vehiculos, viajes o usuarios) que están en la Base de Datos de la API.
	*/	
	const [mostrarForma, setMostrarForma] = useState(false);
	//const [mostrarFormaVehiculo, setMostrarFormaVehiculo] = useState(false);

	//useEffect(() => {console.log(rol)})

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

			<button type = 'button' className = {!mostrarForma ? 'btn btn-primary' : 'btn btn-secondary' } onClick = {() => {setMostrarForma(!mostrarForma)}}>
		 		 	{
		 		 		!mostrarForma ? <h5> Click para agregar un {tipoObjeto} </h5> : <h5> Cerrar </h5> 
		 			}
			</button>

			{rederForm(mostrarForma, tipoObjeto)}
			
			<center>
				<h1 className = 'display-5'> <u> Lista de {plural} </u> </h1>
			</center>
			
			<div className = 'listado'>
				{
					arrayObjetos.length === 0 ? <h5> No hay {plural}, o el servidor está apagado, verifique que este ultimo esté funcionando para poder ver los {plural}, recargue la pagina luego de haberlo ensendido. </h5> :
					tipoObjeto === 'chofer' ? arrayObjetos.map((chofer) => {
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

					tipoObjeto === 'vehiculo' ? arrayObjetos.map((vehiculo) => {
						return <Vehiculo
								key = {vehiculo['id_vehiculo']} 
								jsonTipoVehiculo = {vehiculo}
								deleteFunc = {deleteFunc}
								putFunc = {putFunc}
								arrayVehiculos = {arrayObjetos}
								activeUser = {activeUser}
								/>
					}):

					tipoObjeto === 'viaje' ? arrayObjetos.map((viaje) => {
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

					tipoObjeto === 'usuario' ? arrayObjetos.map((user) => {
						return	<User 
								key = {user['id']}
								jsonTipoUser = {user}
								deleteFunc = {deleteFunc}
								putFunc = {putFunc}
								arrayUsuarios = {arrayObjetos}
								id = {user['id']} 
								activeUser = {activeUser} />
					
					}): 

						<h3> Tipo de objeto no reconocido </h3> 										
				}
			</div>		
		</div>

		);
}


export default ListaObjetos;































