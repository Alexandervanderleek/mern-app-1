import { useState, useCallback, useEffect, useRef } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);
        
        const sendRequest  = useCallback(async (url, method = 'GET', body=null, headers={}) => {
            setIsLoading(true);
            const httpAbort = new AbortController();
            activeHttpRequests.current.push(httpAbort);
            try{
            const response = fetch(url,{
                method,
                body,
                headers,
                signal: httpAbort.signal
            });
    
            const responseData = await response.json();
    
            if(!response.ok){
                throw new Error(responseData.message);
            }

            return responseData;
    
        }
    catch(err){
        setError(err.message);
        throw err;
    }
    setIsLoading(false);
    }, []);


    const clearError = () => {
        setError(null)
    };

    useEffect(()=>{
        return () => {
            activeHttpRequests.current.forEach(abortControl => {
                abortControl.abortControl()
            });
        };
    },[])

    return { isLoading, error, sendRequest}
    
};