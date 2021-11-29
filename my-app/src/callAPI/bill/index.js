import { HOST } from "../../constaint/index.js"
import { getCurrentUser } from "../login/index.js";
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

export const update = async (oldValue, newValue) => {
    const response = await fetch(`${HOST}bill/update`, {
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

export const addBill = async (idBook)=>{
    console.log("vao addbill");
    let user = await getCurrentUser();
    console.log("current user: ",user.data._id);
    let findBill = await find({
        "idBuyer": user.data._id,
        "type":"basket",
    })
    console.log("find bill: ",findBill);
    if(JSON.stringify(findBill.data)==JSON.stringify([])){
        console.log("tao bill moi");
        let newBill = await addItem({
            "idBuyer": user.data._id,
            "idBooks" : [idBook],
            "count":[1]
        })
        console.log("bill moi cua mk: ",newBill);
        return newBill;
    }else{
        console.log("khong tao bill moi");
        let books = [...findBill.data[0].idBooks];
        console.log("books: ",findBill.data[0].idBooks);
        let result;
        console.log("length: ",books.length);
        for(let i = 0; i< books.length;i++){
            console.log(books[i]._id + " == "+idBook);
            if(books[i]._id == idBook){   
                findBill.data[0].count[i] = Number(findBill.data[0].count[i]+1);
                result = await update({"_id":findBill.data[0]._id},{...findBill.data[0]});
                return result;
            }
        }
        findBill.data[0].idBooks.push(idBook);
        findBill.data[0].count.push(1);
        result = await update({"_id":findBill.data[0]._id},{...findBill.data[0]});

        return result;
    }
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