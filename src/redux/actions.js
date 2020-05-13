import { INCREMENT, DECREMENT, CHANGE_THEME, UNBLOCK, BLOCK, ASYNC } from "./types";

export function increment() {
    return {type: INCREMENT}
}

export function decrement() {
    return {type: DECREMENT}
}

export function block() {
    return {type: BLOCK}
}

export function unblock() {
    return {type: UNBLOCK}
}

export function async() {
    return function(dispath) {
        dispath(block());
        setTimeout(() => {
           dispath({type: ASYNC});
           dispath(unblock());  
        }
        , 1500);
    } 
}

export function changeTheme(newTheme) {
    return {
        type: CHANGE_THEME,
        payload: newTheme
    }
}