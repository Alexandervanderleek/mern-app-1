import React, { useState, useContext} from 'react';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIelements/Card';
import Input from '../../shared/components/formElements/Input';
import Button from '../../shared/components/formElements/Button';
import ErrorModal from '../../shared/components/UIelements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import "./Auth.css"

const Auth = () =>{

    const auth = useContext(AuthContext);

    const [ isLogin, setIsLogin] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm({
       email:{
           value: '',
           isValid: false
       },
       password:{
        value: '',
        isValid: false
    }  
    },false);



    const switchModeHandler = () => {
        if (!isLogin){
            setFormData({
                ...formState.input,
                name: undefined //just dropping the name value since going back to signin
            }, formState.input.email.isValid && formState.input.password.isValid)
        }else {
            setFormData({
                ...formState.input,
                name: {
                    value: '',
                    isValid: false
                }
            },false)
            }
        setIsLogin(prevMode => !prevMode);
    }

    const authSubmitHandler = async (event) =>{
        event.preventDefault();
        setIsLoading(true);
        if(isLogin){
            try{
                const response = await fetch('http://localhost:5000/api/users/login',
        
                {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                email: formState.input.email.value ,
                password: formState.input.password.value
            })
        });

            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            setIsLoading(false);
            auth.login();
            }catch(err){
                
                setIsLoading(false);
                setError(err.message || 'Something went wrong');
            }
        } else {
            
            try{
                
                
                const response = await fetch('http://localhost:5000/api/users/signup',
        
                {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formState.input.name.value,
                email: formState.input.email.value ,
                password: formState.input.password.value
            })
        });

            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            console.log(responseData)
            setIsLoading(false);
            auth.login();
            }catch(err){
                console.log(err)
                setIsLoading(false);
                setError(err.message || 'Something went wrong');
            }
        }
        

        
    }

    const errorHandler = ()=>{
        setError(false);
    }

    return(
        <React.Fragment>
        <ErrorModal error={error} onClear={errorHandler}></ErrorModal>
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
            <h2>Login Required</h2>
        <form onSubmit={authSubmitHandler}>
            {!isLogin && <Input
            id = 'name'
            type='text' 
            label='Your Name' 
            onInput= {inputHandler}
            validators = {[VALIDATOR_REQUIRE()]} 
            errorText="please enter a name" 
            element="input"
            ></Input>}


            <Input
            id = 'email'
            type='email' 
            label='email' 
            onInput= {inputHandler}
            validators = {[VALIDATOR_EMAIL()]} 
            errorText="need valid email" 
            element="input"></Input>

            <Input
            id = 'password'
            type='password' 
            label='password' 
            onInput= {inputHandler}
            validators = {[VALIDATOR_MINLENGTH(5)]} 
            errorText="need 5 chara" 
            element="input"></Input>

            <Button type="submit" disabled={!formState.isValid}>
                {isLogin ? 'LOGIN': 'SIGNUP'}
            </Button>
        </form>

        <Button inverse onClick={switchModeHandler}>SWITCH TO {isLogin ? 'SIGNUP': 'LOGIN'}</Button>


        </Card>
        </React.Fragment>
    )
}

export default Auth;