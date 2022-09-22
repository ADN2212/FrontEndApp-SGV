function parseFecha(strDate){
	
	//Toma una cadena de texto con el formato '%Y-%m-%dT%H:%M:%SZ' y la presenta en uno mas legible.

	let [fecha, hora] = strDate.split('T');

	//Invertir el sentido de la fecha:
	fecha = fecha.split('-').reverse();//dia/mes/año.
	
	//Obviar la parte ':00Z'
	hora = hora.split(':', 2);

	return `${fecha[0]}/${fecha[1]}/${fecha[2]} a las ${hora[0]}:${hora[1]}`;

}

export default parseFecha;
















