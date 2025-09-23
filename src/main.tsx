import './index.css'
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {StrictMode} from "react";
import App from "./App.tsx";
import {Provider} from "react-redux";
import {store} from "./redux/redux-store.ts";





const container = document.getElementById('root')!
const root = createRoot(container);


    root.render(
        <BrowserRouter>
            <StrictMode>
                <Provider store={store}>
                    <App/>
                </Provider>
            </StrictMode>,
        </BrowserRouter>
    )


