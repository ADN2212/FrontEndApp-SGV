export default function filtrarObjetos(
	arrayObjetos,
	valorFiltrador,
	campoFiltrar,
) {
	//Toma un array de objetos y los filtra en funcion del valor que se pase como arguento

	let objetosFiltados;

	if (!valorFiltrador) {
		objetosFiltados = arrayObjetos;
	} else {
		objetosFiltados = arrayObjetos.filter((user) => {
			return user[campoFiltrar] === valorFiltrador;
		});
	}

	console.log(objetosFiltados);
	return objetosFiltados;
}