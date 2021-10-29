import React,{ useEffect,useState } from 'react';
import InputWrapper from './dung_InputWrapper';
import API from '../callAPI/index.js';

export default function LoginForm(){
    const [email, setEmail] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const _handleChange = (setState,value)=>{
        setState(value);
    }
    const validate = (state,setMessageState)=>{
        if(state == "" || state == null){
            setMessageState(" is invalid");
            return false;
        }else{
            setMessageState("");
            return true;
        }
    }
    const register = async ()=>{
        if(validate(email,setEmailMessage) & validate(password,setPasswordMessage)){
            localStorage.removeItem("token")
            console.log("thanh cong luon");
            let login = await API.Login.signin({email,password});
            console.log("login:",login);
            localStorage.setItem("token",login.token);
        }
    }

    const getUser = async ()=>{
        let x = await API.Login.getCurrentUser();
        console.log("x",x.data);
    }
    return (
        <div>
            <div>my email: {email}</div>
            <InputWrapper title="email" _handleChange = {(value)=>{_handleChange(setEmail,value)}} message={emailMessage}></InputWrapper>
            <div>my password: {password}</div>
            <InputWrapper title="password" _handleChange = {(value)=>{_handleChange(setPassword,value)}} message={passwordMessage}></InputWrapper>
            <button onClick={register}>dang nhap</button>
            <button onClick={getUser}>hien thi nguoi dung hien tai</button>
        </div>
    )
}

