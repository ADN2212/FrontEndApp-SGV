export default function tieneViajesEnProceso(chofer, arrayViajes){
	// Determina si un chofer tiene viajes en proceso.

	//1-Filtrar los viajes que estan en proceso:
	let viajesEnProceso = arrayViajes.filter(
		(viaje) => {
			return viaje['estado_viaje'] === 'En Proceso';
			}
		)

	//2-Filtrar los que pertenecen al chofer
	let vpDeChofer = viajesEnProceso.filter(		
		(viaje) => {

			if (viaje['chofer']){
				//Si el viaje tiene chofer, probar si es el del argumento de la funcion. 
				return viaje['chofer']['id_chofer'] === chofer['id_chofer'];
			}
			return false;
		}
	)
	
	//3-True si el array tiene almenos un elemento.
	return !(vpDeChofer.length === 0);
}







































