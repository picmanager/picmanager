import { useRouter } from "next/router";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useMedia} from "../../hooks/media";

const FileUploadForm = () => {

    const router = useRouter()

    const {upload} = useMedia({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [file, setFile] = useState("");
    const [errors, setErrors] = useState([])

    const submitForm = async event => {
        event.preventDefault()
        upload({
            file,
            setErrors
        })
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <div>
            <h2>File Upload</h2>
            <form onSubmit={submitForm}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default FileUploadForm
