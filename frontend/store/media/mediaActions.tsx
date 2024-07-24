/*
|-------------------------------------------------------------------------------
| Media actions.
|-------------------------------------------------------------------------------
|
| Here all the api calls and business logic concerned with media are
| handled. This (potentially among others) includes upload, edit, delete.
|
*/

import axios from "axios";
import * as types from "../actionTypes";
import {loadUser} from "../auth/authActions";

/**
 * Upload functionality
 *
 * @param {string} media
 *  The file to be uploaded.
 */
export const upload = (
    media: any,
) => {
    return async (dispatch: CallableFunction) => {
        try {
            dispatch ({
                type: types.START_REGISTER_LOADING,
            });
            // API Call.
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post("/api/upload",
                { media },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            );

            // Load the user if registration was successful.
            if (res.status === 204) {
                dispatch(loadUser());
            }
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                const emailErrorMsg = error.response.data.errors.email[0];

                if (emailErrorMsg) {
                    dispatch({
                        type: types.REGISTER_ERROR,
                        payload: emailErrorMsg,
                    });
                }
            } else {
                dispatch({
                    type: types.REGISTER_ERROR,
                    payload: "Sorry, something went wrong.",
                });
            }
        }
    };
};