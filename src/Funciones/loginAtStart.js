import blackListToken from './blackListToken.js';

export default async function loginAtStart(setActiveUser) {
  //En caso de que se refresque la pagina etsa funcion volverá a cargar el hook de user con la info del
  //user que está logeado.

  let id = localStorage.getItem('id');

  if (id) {
    //Si el id está en el localStorage iniciar sesión con el user correspondiente:
    //Asignar el user que accedió al hook del usuario activo:
    //Hacer un request del user que está login:
    let response = await fetch(`http://localhost:8000/get_sgv_users/${id}`);

    if (response.ok) {
      let userData = await response.json();
      setActiveUser(userData);
    }
  } else {
    if (localStorage.getItem('access') || localStorage.getItem('refresh')) {
      blackListToken();
    }
    localStorage.clear();
  }
}