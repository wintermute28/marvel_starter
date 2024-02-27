import { useState, useCallback } from "react";

export const useHttp = () => {
    const [processApp, setProcessApp] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'aplication/json'}) => {


        setProcessApp('loading');
        try {
        const response = await fetch(url, {method, body, headers});

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();


        return data;

        } catch(e) {

            setProcessApp('error');
            throw e;
        }

    }, []);

    const clearError = useCallback(() => {

        setProcessApp('loading');
    }, []);

    return {request, clearError, processApp, setProcessApp};

}