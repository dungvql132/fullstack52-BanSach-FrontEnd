import { HOST } from "../../constaint/index.js"
import {getToken} from "../main/index.js"

// console.log(HOST);
// console.log(getToken());
// chưa axios
export const getAll = async () => {
    const response = await fetch(`${HOST}bill/getAll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token' : getToken()
        },   
    });
    const myJson = await response.json();

    // console.log(myJson);
    return myJson;
}

export const addItem = async (obj) =>{
    const response = await fetch(`${HOST}bill/addItem`, {
        method: 'POST',
        body : JSON.stringify({data : obj}),
        headers: {
            'Content-Type': 'application/json',
            'token' : getToken()
        },
        
    });
    const myJson = await response.json();

    // console.log(myJson);
    return myJson;
}

export const find = async (obj) =>{
    const response = await fetch(`${HOST}bill/find`, {
        method: 'POST',
        body : JSON.stringify({data : obj}),
        headers: {
            'Content-Type': 'application/json',
            'token' : getToken()
        },
        
    });
    const myJson = await response.json();

    // console.log(myJson);
    return myJson;
}

// obj = {type,findObj};
export const groupBy = async (type,findObj) =>{
    const response = await fetch(`${HOST}bill/groupBy`, {
        method: 'POST',
        body : JSON.stringify({data : {type:type,findObj:findObj}}),
        headers: {
            'Content-Type': 'application/json',
            'token' : getToken()
        },
        
    });
    const myJson = await response.json();

    // console.log(myJson);
    return myJson;
}

// find({idBook:"romeo va jliet"});
// getAll();
// groupBy("idBook");
// groupBy("idBook",{idUser:"hihi 123"});
// groupBy("idBook");
// addItem({idBook:"nhin thay sao tren bien"});
// console.log("new men");

//đã test ok