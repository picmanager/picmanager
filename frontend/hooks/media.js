import useSWR from "swr";
import axios from "../config/config";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export const useMedia = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const upload = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/api/upload', props, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    // useEffect(() => {
    //     if (middleware === 'guest' && redirectIfAuthenticated && user)
    //         router.push(redirectIfAuthenticated)
    //     if (
    //         window.location.pathname === '/verify-email' &&
    //         user?.email_verified_at
    //     )
    //         router.push(redirectIfAuthenticated)
    //     if (middleware === 'auth' && error) logout()
    // }, [user, error]);

    return {
        user,
        upload,
    }
}