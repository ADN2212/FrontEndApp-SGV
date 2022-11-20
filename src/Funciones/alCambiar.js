function alCambiar(evento, hookValue, setterFunc) {
	/*
		Va acumulando la informacion de la forma dentro del hook correspondiente.
		Este comportamiento se verá en todas las formas.
	*/
	const nombre = evento.target.name; //llave
	const valor = evento.target.value; //valor

	//En este caso '...hookValue' representa el estado actual del objeto, la otra parte agrega la nueva informacion.
	setterFunc({ ...hookValue, [nombre]: valor });
}

export default alCambiar;