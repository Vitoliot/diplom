import React from 'react';
import { render } from 'react-dom';
import App from './App';
import store from './store/store'
import {Provider} from 'react-redux';
// import ErrorBoundary from './helpers/ErrorBoundary/ErrorBoundary';

render(    
    <Provider store={store}>
             <App/>
     </Provider>,
    document.getElementById('app')
);