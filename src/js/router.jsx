import React from 'react';
import ReactDOM from 'react-dom';

import routes from './routes/routes';
import Main from './Main';


// Render the React application to the DOM
// Root component is to bootstrap Provider, Router and DevTools
ReactDOM.render(
    <Main routes={routes}/>,
    document.getElementById('app-container')
);
