import { combineReducers } from "redux";
import { CHANGE_THEME } from "./types";

function counterReducer(state = {
    value: 0, 
    blocked: false
}, action) {
    switch (action.type) {
        case "INCREMENT":
            return {...state, value: state.value + 1};
            
        case "DECREMENT":
            return {...state, value: state.value - 1};
        
        case "ASYNC":
            return {...state, value: state.value + 1};

        case "BLOCK":
            return {...state, blocked: true};
        
        case "UNBLOCK":
            return {...state, blocked: false};
    
        default:
            return state;
    }
}

const initialThemeState = {
    value: 'light'
}

function themeReducer(state = initialThemeState, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return {...state, value: action.payload}
    
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer
});