function cambiarEstado(value, setterValue) {
	/*
		Esta función cambia el estado de los hooks para que se desplieguen o retraigan las opcinoes de editar y borrar.
	*/
	setterValue(!value);
	return;
}

export default cambiarEstado;
