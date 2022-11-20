export default function isLogin(activeUser) {
	//Detremina si el user está login o no
	return !(Object.keys(activeUser).length === 0);
}