import React, { useReducer , useEffect} from "react";
import { validate } from "../../../util/validators";
import './Input.css';

const inputReducer = ( state, action) => {
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };

        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            };
            
        default:
            return state;
    }
}

const Input = (props) => {

    const [inputState, dispatch] = useReducer(inputReducer, 
        {value: props.value || '', isValid: props.valid, isTouched: false});

    const touchHandler = () =>{
        dispatch({
            type: 'TOUCH'
        })
    }


    const {id, onInput} = props;
    const {value, isValid} = inputState;

    useEffect(() =>{
        
        onInput(id, value, isValid);
    },[id, value, isValid, onInput]);


    const changeHandler = event => {
        dispatch({type:'CHANGE', val: event.target.value, validators: props.validators})
        
    }

    const element = props.element === "input" ? (<input 
    onChange={changeHandler} 
    id={props.id} type={props.type} 
    value={inputState.value} 
    placeholder={props.placeholder} 
    onBlur={touchHandler}
    /> ): <textarea
    id = {props.id} 
    rows = {props.rows || 3}
    onChange={changeHandler}
    onBlur={touchHandler}
    value={inputState.value}/>

    return(<div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>
        {props.label}
        </label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}

    </div>);
}

export default Input;