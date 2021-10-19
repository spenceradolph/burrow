import React from 'react';
import ReactDOM from 'react-dom';
import { Xwrapper } from 'react-xarrows';
import { App } from './components';
import './index.css';

ReactDOM.render(
    <Xwrapper>
        <App />
    </Xwrapper>,
    document.getElementById('root')
);
