import React from 'react';


export default function OpcionesEliminar( {tipoObjeto, deleteFunc, id} ){
	//Da una ultima chance para que el usuario decidad si de verdad quiere eliminar el chofer, vehiculo o viaja. 
	return(
		<div>
			<form>			
				<p> <b> ¿Está seguro de que desea eliminar este {tipoObjeto}? </b> </p>
				<button onClick = {() => {deleteFunc(id, tipoObjeto)}}>
					Si
				</button>
			</form>
		</div>
	);
}














































