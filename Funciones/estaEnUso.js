function estaEnUso(valorActual, arrayObjetos, esEditar, llaveAEvaluar, valorAnterior){
	/*
		Prueba si un valor que es unico, como la cedula de un chofer, su email o la placa de un vehiculo, 
		está siendo usado (o ya pertenece) por uno de los choferes o vehuclos.  
		Esta funcion es una generalización de probarCedula, probarEmail y probarPlaca. 
	*/

	let arrayValores = arrayObjetos.map((objeto) => { return objeto[llaveAEvaluar]});

	if(esEditar){
		//En caso de que se este editando hay que obviar el valor anterior:
		arrayValores = arrayValores.filter((v) => {return v !== valorAnterior} );
	}

	//Si el valor actual no está en el array de valores se generara un array vacio
	//el cual, al ser comparado con flase, será true, luego al negarlo tendremos false
	//lo que significa que el valor actual no está en uso.
	let estaValor = !(arrayValores.filter(v => { return v === valorActual}) == false);

	//console.log(estaValor);

	return estaValor;

}

export default estaEnUso;


/*
function probarCedula(cedula){
		
			//Prueba si hay algun chofer en la Base de Datos con la cedula que se está introduciendo.
			//retorna 'true' en caso de que si y 'false' si no.
			//Se debe evitar porqué la cedula del chofer es un campo unico.
		
		//Optener todas las cedulas de los choferes:		
		let arrayCedulas = arrayChoferes.map((chofer) => { return chofer.cedula });

		if (esEditar){
		//En caso de que se esté editando el chofer, extraer la cedula anterior para que no se detecte como que ya está.		
			arrayCedulas = arrayCedulas.filter((cedula) => {return cedula !== cedulaAnteiror});
		}

		//Si hay un chofer con la misma cedula en el array de choferes: estaCedula = true
		let estaCedula = !( arrayCedulas.filter((cedulaActual) => { return cedulaActual === cedula}) == false );
		
		return estaCedula;
	
	}
*/

























