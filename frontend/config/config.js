/*
|--------------------------------------------------------------------------
| Axios defaults
|--------------------------------------------------------------------------
|
| The default config for axios. "withCredentials" is necessary in order to
| get access to the laravel backend. The "baseURL" should match the domain
| and port of your laravel api.
|
*/
import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST_URL,
    headers: {
        'X-Requested-With': 'XMHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})

export default axios