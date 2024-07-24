import "../styles/globals.css";
import store from "./../store/store";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { AuthGuard } from "../services/Auth/AuthGuard";
import { useEffect } from "react";
import * as types from "./../store/actionTypes";
import { Navigation } from "../components/Navigation/Navigation";
import { Header } from "../components/Header/Header";
import { useRouter } from "next/router";
// import { protectedRoutes } from "../config/config";
import { ChakraProvider } from "@chakra-ui/react";
require("./../config/config.tsx");

function MyApp(props: any) {
    const router = useRouter();
    // Check fi we are on a protected route.
    // const isNoProtectedRoute = protectedRoutes.every((route) => {
    //     return !router.pathname.startsWith(route);
    // });

    // Handle current user in redux.
    useEffect(() => {
        // Store current user if we have one.
        if (props.user) {
            store.dispatch({
                type: types.USER_LOADED,
                payload: props.user,
            });
            return;
        }
        // Dispatch user loading error if no user is present.
        store.dispatch({
            type: types.USER_LOADED_ERROR,
            payload: undefined
        });
    }, []);

    return (
        <Provider store={store}>
            <ChakraProvider>
                <div className="flex flex-col bg-gray-100">
                    <Header />
                    <div className="flex">
                        <Navigation />
                        <props.Component {...props.pageProps} />
                        {/*{isNoProtectedRoute}*/}
                    </div>
                </div>
            </ChakraProvider>
        </Provider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};

/**
 * Fetch some data server side before rendering the page client side.
 *
 * @param {object} contenxt
 *  The context object.
 */
// @ts-ignore
MyApp.getInitialProps = async ({ ctx }: object) => {
    const req = ctx.req;
    const pathname = ctx.pathname;
    const res = ctx.res;

    /**
     * Abort if one var is not present.
     * For example, the req obj will be undefined if we don't
     * have a page reload but a page switch via the Next Router.
     */
    if (!req || !pathname || !res) {
        return {};
    }

    const authenticator = new AuthGuard();
    return await authenticator.authenticateUser(req, res, pathname);
};

export default MyApp;