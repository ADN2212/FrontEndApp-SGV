function intersecTemp(viajeActual, arrayViajes){

/*
	Dado un viaje prueba que este no se intersecte en el tiempo con otros que
	se esten haciendo con el mismo vehiculo y esté en estado 'Creado' o 'En Poceso'.		
*/
	
	//1-Filtar concernientes:
	let viajesCreadosyEnProceso;
	viajesCreadosyEnProceso = arrayViajes.filter((viaje) => {

		let idVehiculo = viaje['vehiculo'] ?  viaje['vehiculo']['id_vehiculo']: null;
		let idVehiculoActual = viajeActual['vehiculo']['id_vehiculo'];				
		
		return (viaje['estado_viaje'] === 'Creado' || viaje['estado_viaje'] === 'En Proceso') &&  idVehiculo === idVehiculoActual;				
		}
	);	

	//console.log(viajesCreadosyEnProceso);

	//Definir el punto de partida y de termino del viaje actual:
	let t1 = viajeActual['inicio_viaje'];
	let t2 = viajeActual['fin_viaje'];
	//console.log(t1);
	//console.log(t2);


	let viajesIntesectados = viajesCreadosyEnProceso.filter((viaje) => {
			
			//Definir el punto de partida y de termino de cada viaje. 
			let t3 = viaje['inicio_viaje'];
			let t4 = viaje['fin_viaje'];
			//console.log(t3, t4);

			//Las 4 posibilidades (?) en las que se cortan dos intervalos de tiempo son las siguientes: 
			
			//1- El viaje actual termina despues de que empieze el otro: 
			if ((t1 < t3) && (t3 < t2) && (t2 < t4)){
				//console.log('Pasó');
				return true;
			}
			//2-El viaje actual comieza antes de que termine el otro:
			if ((t3 < t1) && (t1 < t4) && (t4 < t2)){
				return true;
			}
			//3-El viaje actual contiene el otro:
			if ((t1 < t3) && (t1 < t4) && (t3 < t2) && (t4 < t2)){
				return true;
			}
			//4-El viaje actual está dentro del otro:
			if ( (t3 < t1) && (t3 < t2) && (t1 < t4) && (t2 < t4)){
				return true;
			}
		}
	);
	
	//console.log(viajesIntesectados);

	if (!(viajesIntesectados.length === 0)){
		//console.log(viajesIntesectados);
		return viajesIntesectados;
	}

	return false;

}
	
export default intersecTemp;


























