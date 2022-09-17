import swal from 'sweetalert';

export default async function blackListToken(){
	//Envia el refresh token al enpoint de la API que lo guarda en la lista negra de tokens

	let url = 'http://localhost:8000/api/token/blacklist/'

	try {
		let response = await fetch(url, {
		
			method: 'POST',
			body: JSON.stringify({'refresh' : localStorage.getItem('refresh')}),
			headers: {
            //Enviar el Acces Token al servidor para que prueve si el user está Autenticado. 
            	Authorization: localStorage.getItem('access') ? 
            	'JWT ' + localStorage.getItem('access'): null,
            	'Content-type': 'application/json',
            	accept: 'application/json',
            }
          }
        )
		
		//En estos casos no uso swal porqué esto es informacion que no dominan la gran mayoria de usuarios.		
		if (response.ok){
			console.log('El token ha sido cancelado con exito.');
		} else {
			console.log('Ha ocurrido un error al cancelar el token.');
		}
	} catch (error) {
			console.log(`Ha ocurrido un error al cancelar el token: ${error}`);
	}
}








