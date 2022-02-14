import { useCallback, useReducer } from 'react';


const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true
        for (const inputId in state.input) {
          if(!state.input[inputId]){
            continue;
          }
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid 
          } else {
            formIsValid = formIsValid && state.input[inputId].isValid
          }
        }
        return {
          ...state,
          input: {
            ...state.input,
            [action.inputId]: { value: action.value, isValid: action.isValid },
          },
          isValid: formIsValid,
        }

      case "SET_DATA":
        return{
          input: action.input,
          isValid: action.formIsValid
        }  
  
      default:
        return state
    }

    
  }


export const useForm = (initialInputs, initialFormValidity) => {
    
    const [formState, dispatch] = useReducer(formReducer, {
        input: initialInputs,
        isValid: initialFormValidity
      })

     
    

      const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
          type: 'INPUT_CHANGE',
          value: value,
          isValid: isValid,
          inputId: id,
        })
      }, [])

      const setFormData = useCallback((inputData, formValidity) =>{
        dispatch({
          type: 'SET_DATA',
          input: inputData,
          formIsValid: formValidity
        })
      },[])


      return [formState, inputHandler, setFormData];

}