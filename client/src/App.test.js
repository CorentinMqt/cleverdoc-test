import React from 'react';
import ReactDOM from 'react-dom';
import login from './Routes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<login />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<signup />, div);
  ReactDOM.unmountComponentAtNode(div);
});