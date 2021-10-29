// call api của user
// nhớ là có token ở trong headers như trong bill 
// call api của book
// nhớ là có token ở trong headers như trong bill 
import { HOST } from "../../constaint/index.js"
import { getToken } from "../main/index.js"

// console.log(HOST);
// console.log(getToken());
// chưa axios
export const getAll = async () => {
    const response = await fetch(`${HOST}user/getAll`, {
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
    const response = await fetch(`${HOST}user/addItem`, {
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
    const response = await fetch(`${HOST}user/find`, {
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
    const response = await fetch(`${HOST}user/update`, {
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

export const deleteUser = async (obj) => {
    const response = await fetch(`${HOST}user/delete`, {
        method: 'DELETE',
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

// find({ "_id": "617a6ea5648d4a3a396e6716" });
// getAll();
// addItem({
//     "email": "dung123",
//     "userName": "Nguyen Chi Dung 123",
//     "password": "123456",
//     "phone": "0971771302",
//     "kindPerson": "admin",
//     "birthday": "13/2/2000",
//     "age": 0,
// });
// update({ "_id": "617a70fc648d4a3a396e6720" }, {
//     "email": "dung123456",
//     "userName": "Nguyen Chi Dung 12378",
//     "password": "123456",
//     "phone": "0971771302",
//     "kindPerson": "admin",
//     "birthday": "13/2/2000",
//     "age": 0,
// });

// deleteUser({ "_id": "617a70fc648d4a3a396e6720" });

//đã test ok