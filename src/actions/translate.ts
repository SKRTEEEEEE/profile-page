"use server"

import { IntlKey } from '@/core/domain/entities/intl.type';
// const axios = require('axios').default;
// const { v4: uuidv4 } = require('uuid');
import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';

let key = process.env.AZURE_TRANSLATOR_API_KEY;
let endpoint = "https://api.cognitive.microsofttranslator.com";

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
let location = process.env.AZURE_TRANSLATOR_ZONE;



export const translate = async (text: string,from: string, to: string[]) => {
    try {
        if(!key || ! location){
            console.error("No se ha encontrado la clave de la API o la ubicación")
            return;
        }
        const res = await axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                 // location required if you're using a multi-service or regional (not global) resource.
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'from': from,
                'to': to.join(','),
            },
            data: [{
                'text': text
            }],
            responseType: 'json'
        })
        if(res.status === 200){
            return JSON.stringify(res.data, null, 4)
        }
    } catch (error) {
        const axiosError = error as AxiosError;
    const errorMsg = axiosError.response?.data || axiosError.message;
    console.error("Error:", errorMsg);
    throw new Error(`Fallo en la traducción: ${JSON.stringify(errorMsg)}`);
    }
}

