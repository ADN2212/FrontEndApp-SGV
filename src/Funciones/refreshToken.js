import swal from 'sweetalert';

export default async function refreshToken(){
	//Envia el refresh token al Enpoint de la API para resivir un nuevos access y refresh tokens.

	let url = 'http://localhost:8000/api/token/refresh/'

	let response = await fetch(url, {
		
		method: 'POST',
		body: JSON.stringify({'refresh' : localStorage.getItem('refresh')}),
		headers: {'Content-type': 'application/json'}		
			}
		)

	if (response.ok){
		//Guardar los nuevo tokens en el localStarage.

		let responseData = await response.json();
		localStorage.setItem('access', responseData['access']);
		localStorage.setItem('refresh', responseData['refresh']);//porque 'ROTATE_REFRESH_TOKENS': True ver settings.py en la API.
		//console.log(responseData);
		
		swal({
			title:'Sesión Actualizada',
			icon:'success',
			text:'Su sesión habia expirado y la hemos reestablesido, vuelva a intentar.'

		});

	}	else {
		//alert('Error al Actualizar el Acces Token');
		swal({
			title:'Error Sesión',
			icon:'error',
			text: 'Error al intentar reestablecer sesión, recomendamos que la cierre y vuelva a hacer login.'
		});
	}
}



/*
		headers: { 
            Authorization: localStorage.getItem('refresh') ? 
            'JWT ' + localStorage.getItem('refresh'): null,
            'Content-type': 'application/json',
            accept: 'application/json',
            }
					}	
*/

























