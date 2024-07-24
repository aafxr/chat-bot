import './css/index.scss';
import React from 'react';
import {Provider} from "react-redux";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'

import {BootstrapThemeProvider} from "./providers/BootstrapThemeProvider/BootstrapThemeProvider";
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import {store} from "./redux/store";
import App from './App';

// import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <BootstrapThemeProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </BootstrapThemeProvider>
    // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
    onUpdate() {
        window.location.reload()
    }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
