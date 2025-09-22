import './index.css'
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {StrictMode} from "react";
import App from "./App.tsx";
import { type StateTypeProps, store} from "./redux/state.ts";




const container = document.getElementById('root')!
const root = createRoot(container);

const rerenderEntireTree =  (state: StateTypeProps) => {
    root.render(
        <BrowserRouter>
            <StrictMode>
                <App
                    state={state}
                    dispatch={ store.dispatch.bind(store)}
                />
            </StrictMode>,
        </BrowserRouter>
    )
}

rerenderEntireTree(store.getState())
store.subscribe(rerenderEntireTree)





// const rootEl = document.getElementById('root')
// const reactRoot = createRoot( rootEl!)
// reactRoot.render(<App state={state}/>)