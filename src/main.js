import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const Page = () => (
    <div>
       <App></App>
    </div>
);

ReactDOM.render(<Page />, document.getElementById('root'));