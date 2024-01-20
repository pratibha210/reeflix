import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from "react-router-dom";
import RootReducer from '../src/redux/RootReducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from './App'
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history'

ReactGA.initialize('UA-160615031-1');


let store = createStore(RootReducer,applyMiddleware(thunk))


ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
       <App></App>
    </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'));

serviceWorker.unregister();
