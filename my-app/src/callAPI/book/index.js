// call api của book
// nhớ là có token ở trong headers như trong bill 
import { HOST } from "../../constaint/index.js"
import { getToken } from "../main/index.js"

// console.log(HOST);
// console.log(getToken());
// chưa axios
export const getAll = async () => {
    const response = await fetch(`${HOST}book/getAll`, {
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

export const addItem = async (obj) => {
    const response = await fetch(`${HOST}book/addItem`, {
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

export const find = async (obj) => {
    const response = await fetch(`${HOST}book/find`, {
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

export const update = async (oldValue, newValue) => {
    const response = await fetch(`${HOST}book/update`, {
        method: 'PUT',
        body: JSON.stringify({ data: { oldValue, newValue } }),
        headers: {
            'Content-Type': 'application/json',
            'token': getToken()
        },

    });
    const myJson = await response.json();

    // console.log(myJson);
    return myJson;
}

export const deleteBook = async (obj) =>{
    const response = await fetch(`${HOST}book/delete`, {
        method: 'DELETE',
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

// find({ _id: "61761975232698c85dc0caae" });
// getAll();
// addItem({
    // "idProducer": "hoa",
    // "producerName": "ko ko ko",
    // "bookName": "sao sang tren troi",
    // "author": "hoho",
    // "img": "html",
    // "year": 2030,
    // "cost": 0
// });
// update({ _id:"61761975232698c85dc0caae"},{
//     "idProducer": "sdafdsaf",
//     "producerName": "ko ko ko hi hi",
//     "bookName": "sao",
//     "author": "hoho",
//     "img": "html",
//     "year": 2030,
//     "cost": 4567
// });

// deleteBook({"producerName": "ko ko ko"});

//đã test ok