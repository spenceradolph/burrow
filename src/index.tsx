import React from 'react';
import ReactDOM from 'react-dom';
import { Xwrapper } from 'react-xarrows';
import { App } from './components';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Xwrapper>
            <App />
        </Xwrapper>
    </React.StrictMode>,
    document.getElementById('root')
);
