import './styles.css';
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from './redux/rootReducer';
import { increment, decrement, async, changeTheme } from './redux/actions';
import thunk from "redux-thunk";
import logger from "redux-logger";

const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const subBtn = document.getElementById("sub");
const asyncBtn = document.getElementById("async");
const themeBtn = document.getElementById("theme");

// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(thunk, logger),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//     );
const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
    );

addBtn.addEventListener('click', () => {
    store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
    store.dispatch(decrement());

});

asyncBtn.addEventListener('click', () => {
    store.dispatch(async());
    }
);

store.subscribe(() => {
    const state = store.getState();
    counter.textContent = state.counter.value;
    document.body.className = state.theme.value;
    [addBtn, subBtn, asyncBtn, themeBtn].forEach((btn) => {
        btn.disabled = state.counter.blocked;
    })
})

store.dispatch({type: 'INIT_APPLICATION'});

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
    ? "dark"
    : "light"
    store.dispatch(changeTheme(newTheme));
    //document.body.classList.toggle("dark");
});
