import {useState} from "react";
import axios from "axios";

const NeedInstall =  () => {
    const [data, setData] = useState()
     axios
        .get('http://localhost:8000/api/install')
        .then(function (response) {
            setData(response.data.users)
        });
    return data;
}
export default NeedInstall
