import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TimeAgo from 'javascript-time-ago'
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
//



// Call the element loader after the app has been rendered the first time
defineCustomElements(window);
