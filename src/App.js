// import logo from './logo.svg';
import React from 'react';
import './App.css';
// import CardComponent from './reusable/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
// import HigherOrderComponet from './hoc/HigherOrderComponent';
// import ProfileList from './ProfileList';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Instructions from './Instructions';

import store from './store/store';
import { Provider } from 'react-redux';

class App extends React.Component {
  render() {
    const options = {
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: '30px',
      transition: transitions.SCALE,
    };
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <div className='App'>
            <Routes>
              <Route path='/instructions' element={<Instructions />} />
              <Route path='/' element={<Home />} />
            </Routes>
          </div>
        </AlertProvider>
      </Provider>
    );
  }
}

// App = HigherOrderComponet(App);
export default App;
