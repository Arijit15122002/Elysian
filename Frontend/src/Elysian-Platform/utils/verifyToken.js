import { jwtDecode } from 'jwt-decode'

export const verifyToken = (token) => {

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if( decoded.exp > currentTime ) {
            return decoded;
        } else {
            console.log("Token expired");
            localStorage.removeItem("token");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }

}