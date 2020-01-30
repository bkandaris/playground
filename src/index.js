import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import our store
import { createStore } from 'redux';
// import our Provider
import { Provider } from 'react-redux';
// import our Reducer
import { rootReducer } from './reducers/rootReducer';
// creating our store
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
