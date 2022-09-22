import React from 'react';


export default function OpcionesEliminar( {tipoObjeto, deleteFunc, id} ){
	//Da una ultima chance para que el usuario decidad si de verdad quiere eliminar el chofer, vehiculo o viaja. 
	
	function enviarData(evento){
		//Para poder evitar que se recargue la pagina.
		evento.preventDefault();
		deleteFunc(id, tipoObjeto);
	}

	return(
		<div>
			<form onSubmit = {(evento) => {enviarData(evento)}}>							
				<p className = 'text-danger'> <b> ¿Está seguro de que desea eliminar este {tipoObjeto === 'sgv_user' ? 'usuario' : tipoObjeto}? </b> </p>
				<input type = 'submit' className = 'btn btn-danger p-2' value = {`Si, eliminar ${tipoObjeto === 'sgv_user' ? 'usuario' : tipoObjeto}`} />	
			</form>
		</div>
	);
}














































