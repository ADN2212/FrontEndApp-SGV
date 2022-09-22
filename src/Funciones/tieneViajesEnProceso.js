export default function tieneViajesEnProceso(chofer, vehiculo, arrayViajes){
	// Determina si un chofer tiene viajes en proceso.

	//1-Filtrar los viajes que estan en proceso:
	let viajesEnProceso = arrayViajes.filter(
		(viaje) => {
			return viaje['estado_viaje'] === 'En Proceso';
			}
		)

	if (chofer){
		//2-Filtrar los que pertenecen al chofer:
		let vpDeChofer = viajesEnProceso.filter(		
			(viaje) => {

				if (viaje['chofer']){
					//Si el viaje tiene chofer, probar si es el del argumento de la función. 
					return viaje['chofer']['id_chofer'] === chofer['id_chofer'];
				}
				return false;
			}
		)
	
		//3-True si el array tiene almenos un elemento:
		return !(vpDeChofer.length === 0);
	}

	if (vehiculo){
		//2-Filtrar lo que pertenecen al vehiculo:
		let vpDeVehiculo = viajesEnProceso.filter((viaje) => {
			if (viaje['vehiculo']){
				return viaje['vehiculo']['id_vehiculo'] === vehiculo['id_vehiculo'];
			}
			return false;
			}
		);

		//3-True si el array tiene almenos un elemento:
		return !(vpDeVehiculo.length === 0);
	}

	return null;//Para que retorne algo en caso de llegar a este punto.
}







































