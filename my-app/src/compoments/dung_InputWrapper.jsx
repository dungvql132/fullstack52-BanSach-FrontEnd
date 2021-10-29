import React,{ useEffect,useState } from 'react';
import styled from 'styled-components';

export default function InputWrapper(props){
    const [value, setValue] = useState('');
    return(
        <div>
            <input value = {value} onChange={(event)=>{
                if(props._handleChange){
                    props._handleChange(event.target.value);
                }
                // console.log(props._handleChange ? 1:2);
                setValue(event.target.value);
            }}></input>
            {props.message != "" ? <p>{props.title+props.message}</p>:null}
            <p>{props.title}</p>
        </div>
    )
}

