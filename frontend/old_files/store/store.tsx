import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// Reducers.
import auth from "./auth/authReducer";

// The initial state. Will be merged with partials states.
const iniState = {};

// Combine all partial reducers.
const rootReducer = combineReducers({
    auth,
    // Add your stores here.
});

const middleware = [thunk];

// Create reduce store of all existing stores. Also init devtools.
const store = createStore(
    rootReducer,
    iniState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;