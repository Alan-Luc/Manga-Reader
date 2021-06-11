import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Landing from "./components/Landing";
import ImgurSearch from "./sources/ImgurSearch";
import MangaDexSearch from "./sources/MangaDexSearch";
import ImgurReader from "./components/readers/ImgurReader";
import MangaDexReader from "./components/readers/MangaDexReader";

const App = () => {
  return(
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/search/imgur' component={ImgurSearch}/>
      <Route exact path='/search/mangadex' component={MangaDexSearch}/>
      <Route exact path='/read/imgur/:hash' component={ImgurReader}/>
      <Route exact path='/read/mangadex/:title' component={MangaDexReader}/>
    </Switch>
  )
}

export default App;