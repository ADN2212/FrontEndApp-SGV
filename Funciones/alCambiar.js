function alCambiar(evento, hookValue, setterFunc){
	/*
		Va acumulando la informacion de la forma dentro del hook correspondiente.
		Este comportamiento se vera en todas las formas.
	*/
	const nombre = evento.target.name//llave
	const valor = evento.target.value//valor

	//En este caso '...data' representa el estado actual del objeto, la otra parte agrega la nueva informacion.
	setterFunc({...hookValue, [nombre]: valor });
	//console.log(JSON.stringify(hookValue));
}

export default alCambiar;




