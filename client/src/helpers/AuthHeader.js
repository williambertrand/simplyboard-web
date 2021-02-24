import Cookies from 'js-cookie';

export function authHeader() {
    // return authorization header with jwt token
    let token = Cookies.get('slb-token');
    if (token) {
        return { 'Authorization': 'Bearer ' + token, 'slb-token': token };
    } else {
        return {};
    }
}