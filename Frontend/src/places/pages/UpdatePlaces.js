import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/formElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import Button from "../../shared/components/formElements/Button";
import { useForm } from '../../shared/hooks/form-hook'
import Card from "../../shared/components/UIelements/Card";

import './NewPlace.css';

const dummy = [
    {
       id: 'p1',
       title: 'place test',
       description: 'a cool place to go',
       imageUrl: 'https://i.imgur.com/MprxT1s.jpeg',
       address: '2a rugby',
       location:{
           lat: 40.7484405,
           lng: -73.9878584
       },
       creator: 'u1'
    },
    {
        id: 'p1',
        title: 'place test 2',
        description: 'also cool place to go',
        imageUrl: 'https://i.imgur.com/MprxT1s.jpeg',
        address: '2a rugby',
        location:{
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
     
]








const UpdatePlaces = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;

    

    

    const [formState, inputHandler, setFormData] = useForm(
       {
        title:{
            value: '',
            isValid: false
        },
        description:{
            value: '',
            isValid: false
        }
    },true)

    const identifiedPlace = dummy.find(p => p.id ===placeId)

    useEffect(()=>{
        if(identifiedPlace) {
            setFormData({
                title:{
                    value: identifiedPlace.title,
                    isValid: true
                },
                description:{
                    value: identifiedPlace.description,
                    isValid: true
                } 
            },true)
        }
        
    setIsLoading(false);
  },[setFormData, identifiedPlace])


    const placeUpdateSubmitHandler = event =>{
        event.preventDefault();
        
    }

    if(!identifiedPlace){
        return(

            <div className="center">
                <Card>
                <h2>Could not find place</h2>
                </Card>
            </div>
            
        )
    }

    

    if(isLoading){
        return(
            <div className="center">
                <h2>Loading</h2>
            </div>
            
        ) 
    }

    return( 
        
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input 
        id = 'title'
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please enter valid"
        onInput={inputHandler}
        value={formState.input.title.value}
        valid={formState.input.title.isValid}
        ></Input>
        <Input 
        id = 'description'
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="please enter valid"
        onInput={inputHandler}
        value={formState.input.description.value}
        valid={formState.input.description.isValid}
        ></Input>
        <Button type="submit" disabled={!formState.isValid} >UPDATE PLACE</Button>
    </form>

    )
}

export default UpdatePlaces;