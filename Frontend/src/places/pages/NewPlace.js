import React from 'react'
import Input from '../../shared/components/formElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators'
import Button from '../../shared/components/formElements/Button'
import { useForm } from '../../shared/hooks/form-hook'
import './NewPlace.css'



const NewPlace = () => {
  
  const [formState, inputHandler] = useForm( {
    title: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    },

    address: {
      value: '',
      isValid: false,
    }
  }, false)




  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };
  

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
       <Input
        id = 'title'
         type='text' 
         label='title' 
         onInput={inputHandler} 
         validators = {[VALIDATOR_REQUIRE()]} 
         errorText="wrong" 
         element="input"/> 

      <Input
        id="description"
        label="Description"
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="5 CHARA"
        element="textarea"
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />

        
    

      <Button type="submit" disabled={!formState.isValid}>
        Add Place
      </Button>
    </form>
  )
}

export default NewPlace
