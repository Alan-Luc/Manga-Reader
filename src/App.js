import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Search from './components/Search';
import Reader from "./components/Reader";

const App = () => {
  return(
    <Switch>
      <Route exact path='/' component={Search}/>
      <Route exact path='/read/imgur/:hash' component={Reader}/>
    </Switch>
  )
}

export default App;