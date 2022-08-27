//Componentes Basicos:
import Vehiculo from './Vehiculo.jsx';
import Chofer from './Chofer.jsx';
import Viaje from './Viaje.jsx';

//Formularios:
import FormaChofer from './FormaChofer.jsx';
import FormaVehiculo from './FormaVehiculo.jsx';
import FormaViaje from './FormaViaje.jsx';

import { useState, useEffect} from 'react';

function ListaObjetos({ arrayObjetos, tipoObjeto, postFunc, deleteFunc, putFunc, arrayChoferes, arrayVehiculos }){	
	/*
	Este componente muestra todos los objetos (choferes, vehiculos o viajes) que están en la Base de Datos de la API.
	*/	
	const [mostrarForma, setMostrarForma] = useState(false);

	//useEffect(() => {setMostrarForma(!mostrarForma)})

	function rederForm(mostrarForma, tipoObjeto){
		//Renderiza la forma o no en funcion del estado de las variables 'mostrarForma' y 'tipoObjeto';
		if (mostrarForma){
			if (tipoObjeto === 'chofer'){
			return <FormaChofer arrayChoferes = {arrayObjetos} postFunc = {postFunc} />;
			}
			if (tipoObjeto === 'vehiculo'){
			return <FormaVehiculo arrayVehiculos = {arrayObjetos} postFunc = {postFunc} />;
			}
			if (tipoObjeto === 'viaje'){
			return <FormaViaje	arrayChoferes = {arrayChoferes}
								arrayVehiculos = {arrayVehiculos}
								arrayViajes = {arrayObjetos}
								postFunc = {postFunc}
								putFunc = {putFunc}
								esEditar = {false} />
			}
		}
		return;//Si mostrarForma = false, no se renderizará ninguna Forma.
	}


	let plural;

	if (tipoObjeto === 'chofer'){ plural = 'choferes'; }
	if (tipoObjeto === 'vehiculo'){ plural = 'vehiculos'; } 
	if (tipoObjeto === 'viaje'){ plural = 'viajes'; }

	//console.log(plural);  	

	return(

		<div>
			
			{/*Al hacer clicl aqui, desplegar la forma o redireccionar a otra pagina ?*/}
			<button onClick = {() => {setMostrarForma(!mostrarForma)}}>
		 		 	{
		 		 		!mostrarForma ? <h4>Agregar un {tipoObjeto} </h4> : <h4>Cerrar Fromulario</h4> 
		 			}
			</button>
			
			{rederForm(mostrarForma, tipoObjeto)}
			
			<h1>Estos son los {plural}: </h1>
			
			<div>
				{
					arrayObjetos.length === 0 ? <h5> No hay {plural}, o el servidor está apagado, verifique que este ultimo esté funcionando para poder ver los {plural}, recargue la pagina luego de haberlo ensendido. </h5> :
					tipoObjeto === 'chofer' ? arrayObjetos.map((chofer) => {
						return <Chofer
								key = {chofer['id_chofer']} 
								jsonTipoChofer = {chofer} 
								deleteFunc = {deleteFunc}
								putFunc = {putFunc}
								arrayChoferes = {arrayObjetos}
								/>
					}) :

					tipoObjeto === 'vehiculo' ? arrayObjetos.map((vehiculo) => {
						return <Vehiculo
								key = {vehiculo['id_vehiculo']} 
								jsonTipoVehiculo = {vehiculo}
								deleteFunc = {deleteFunc}
								putFunc = {putFunc}
								arrayVehiculos = {arrayObjetos}
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
								deleteFunc = {deleteFunc} />
					}):
						<h3> Tipo de objeto no reconocido </h3> 										
				}
			</div>		
		</div>

		);
}


export default ListaObjetos;































