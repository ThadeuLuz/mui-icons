import React from 'react';
import { render } from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './style.css';

import App from './App';

injectTapEventPlugin();

const rootEl = document.createElement('div');
rootEl.setAttribute('id', 'app');
document.body.appendChild(rootEl);

const renderComponent = () =>
  render(
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>,
    rootEl,
  );

renderComponent();
