// call api của book
// nhớ là có token ở trong headers như trong bill 
import { HOST } from "../../constaint/index.js"
import { getToken } from "../main/index.js"

export const getCurrentUser = async () => {
    const response = await fetch(`${HOST}login/getCurrentUser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': getToken()
        },
    });
    const myJson = await response.json();

    // console.log(myJson);
    return myJson;
}

export const register = async (obj) => {
    const response = await fetch(`${HOST}login/register`, {
        method: 'POST',
        body: JSON.stringify({ data: obj }),
        headers: {
            'Content-Type': 'application/json',
            'token': getToken()
        },

    });
    const myJson = await response.json();

    // console.log(myJson);
    return myJson;
}

export const forgetpass = async (obj) => {
    const response = await fetch(`${HOST}login/forgetpass`, {
        method: 'POST',
        body: JSON.stringify({ data: obj }),
        headers: {
            'Content-Type': 'application/json',
            'token': getToken()
        },

    });
    const myJson = await response.json();

    // console.log(myJson);
    return myJson;
}

export const signin = async (obj) => {
    const response = await fetch(`${HOST}login/signin`, {
        method: 'POST',
        body: JSON.stringify({ data: obj }),
        headers: {
            'Content-Type': 'application/json',
            'token': getToken()
        },

    });
    const myJson = await response.json();

    // console.log(myJson);
    return myJson;
}
// register({email:"dungvql132",password:"123456"});