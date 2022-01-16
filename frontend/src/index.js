import React from 'react';
import { render } from 'react-dom';
import App from './App';
// import './components/TaskAccordion/TaskAccordion.css'
import store from './store/store'
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import ErrorBoundary from './helpers/ErrorBoundary/ErrorBoundary';

render(    
    <Provider store={store}>
         <BrowserRouter>
             <App/>
         </BrowserRouter>
     </Provider>,
    document.getElementById('app')
);