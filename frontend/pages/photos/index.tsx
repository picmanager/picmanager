import {connect} from "react-redux";
import PropTypes from "prop-types";
import {upload} from "../../store/media/mediaActions";
import {Card} from "../../components/Card/Card";
import {H1} from "../../components/Typography/Headers";
import {PrimaryButton} from "../../components/Button/Button";
import {NextRouter, useRouter} from "next/router";

import React, { useState } from 'react';
import axios from 'axios';

const FileUploadForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.post('http://localhost:8000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h2>File Upload</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default FileUploadForm


// function UploadFile(props: any): ReactElement {
//
//     // State.
//     const [formData, setFormData] = useState<{
//         selectedFile: any;
//     }>({
//         selectedFile: "",
//     });
//     // The router object used for redirecting after login.
//     const router: NextRouter = useRouter();
//
//     /**
//      * Handle input change.
//      *
//      *   The event object.
//      * @param e
//      */
//     const handleFileChange = (e: React.FormEvent<HTMLInputElement>): void => {
//         setFormData({
//             // @ts-ignore
//             selectedFile: e.currentTarget.files[0],
//         });
//     };
//
//
//     /**
//      * Submit the form.
//      */
//     const submit = async (event: { preventDefault: () => void; }) => {
//             event.preventDefault();
//
//             if (!formData.selectedFile) {
//                 alert('Please select a file');
//             }
//
//             try {
//                 // const formData = new FormData();
//                 // formData.append('file', selectedFile);
//
//                 props.upload(formData);
//                 // console.log('File uploaded successfully:', response.data);
//             } catch (error) {
//                 console.error('Error Uploading File:', error);
//             }
//         };
//
//     // The Return statement.
//     return (
//         <div className="w-screen h-screen relative">
//             <div
//                 className="absolute w-full md:w-3/5 lg:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                 <Card
//                     additionalInnerClasses="justify-center items-center"
//                     additionalWrapperClasses="bg-gray-100"
//                 >
//                     <>
//                         <form onSubmit={submit}>
//
//                             {/* The main header */}
//                             <H1 withMargin={true} center={true}>
//                                 Upload File
//                             </H1>
//
//                             {/* Name */}
//                             <input
//                                 type="file"
//                                 placeholder="Your name..."
//                                 onChange={handleFileChange}
//                             />
//
//                             {/* Submit button */}
//                             <PrimaryButton>
//                                 {/*<SmallSpinner show={props.loading} />*/}
//                                 Upload
//                             </PrimaryButton>
//                         </form>
//                     </>
//                 </Card>
//             </div>
//         </div>
//     );
// }
// export default UploadFile