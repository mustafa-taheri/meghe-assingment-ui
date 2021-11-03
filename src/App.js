import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
      </BrowserRouter>
    </div>
  );
}

export default App;
