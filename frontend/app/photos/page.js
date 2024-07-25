'use client'

import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import {useMedia} from "../../hooks/media";
import Image from "next/image";

const FileUploadForm = () => {

    const router = useRouter()

    const {upload} = useMedia({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [file, setFile] = useState("");
    const [errors, setErrors] = useState([])

    const submitForm = async event => {
        // event.preventDefault()
        upload({
            file,
            setErrors
        })
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        submitForm(file)
    };

    function showUpload() {
            document.getElementById("uploadFile").click();
    }

    return (
        <div>
        <button
            id="uploadButton"
            className="m-auto relative w-96 h-80 border rounded-xl border-gray-200 bg-white"
            onClick={showUpload}
        >
            <img src="/upload.png" alt="upload" className="w-full rounded-xl"/>
            <div className="absolute bottom-0 left-0 mx-12 mb-4">
                <h2>CLICK TO UPLOAD YOUR FIRST PHOTO</h2>
            </div>
            {/*<h2>File Upload</h2>*/}
        </button>
    {/*<form className="hidden">*/}
        <input id="uploadFile" type="file" className="hidden" onChange={handleFileChange}/>
        {/*<button type="submit">Upload</button>*/}
    {/*</form>*/}
        </div>
)
    ;
};

export default FileUploadForm
