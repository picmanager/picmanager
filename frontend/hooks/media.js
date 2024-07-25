import axios from "../config/config";

export const useMedia = () => {
    const uploadFile = ({file, setStatus, setErrors}) => {
        setErrors([])
        setStatus(null)

        axios
            .post('/api/upload', {file}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(function (response) {
                setStatus(response.data.message);
            })
            .catch(function (error) {
                setErrors(error);
            });
    }

    return {
        uploadFile,
    }
}