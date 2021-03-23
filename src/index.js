import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bulma/css/bulma.css";
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
//serviceWorker.unregister();

