import {applyMiddleware, compose, createStore} from "redux";
import reducer from './reducers';
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";


// convert object to string and store in localStorage
const saveToLocalStorage= (state) => {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
const loadFromLocalStorage= () => {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const store = createStore(
    reducer,
    loadFromLocalStorage(),
    compose(applyMiddleware(thunk, promise),
        typeof window === 'object' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
            window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
)
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;