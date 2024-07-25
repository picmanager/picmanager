'use client'

import React, {useState} from 'react';
import {useMedia} from "../../hooks/media";

const FileUploadForm = () => {

    const {uploadFile} = useMedia({})

    const [file, setFile] = useState(null);
    const [status, setStatus] = useState();
    const [errors, setErrors] = useState([])

    const handleFileChange = (e) => {
        const file = (e.target).files?.[0];
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
        uploadFile({
            file,
            setStatus,
            setErrors,
        })
        console.log({file})
    }

    return (
        <>
            <div>
                <h2 className="text-2xl font-bold">Upload File</h2>
                <div className="font-medium text-sm text-green-600 mb-4">
                    {status}
                </div>
                {/*<button*/}
                {/*    id="uploadButton"*/}
                {/*    className="m-auto relative w-96 h-80 border rounded-xl border-gray-200 bg-white"*/}
                {/*    onClick={showUpload}*/}
                {/*>*/}
                {/*    <img src="/upload.png" alt="upload" className="w-full rounded-xl"/>*/}
                {/*    <div className="absolute bottom-0 left-0 mx-12 mb-4">*/}
                {/*        <h2>CLICK TO UPLOAD YOUR FIRST PHOTO</h2>*/}
                {/*    </div>*/}
                {/*    /!*<h2>File Upload</h2>*!/*/}
                {/*</button>*/}
                {/*<form className="hidden">*/}
                <label htmlFor="file" className="sr-only">
                    Choose a file
                </label>
                <input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                />
                {/*<button type="submit">Upload</button>*/}
                {/*</form>*/}
            </div>
        </>
    )
        ;
};

export default FileUploadForm
