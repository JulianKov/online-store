import React from 'react';
import {Route, Switch} from 'react-router-dom';
import classes from './App.css'
import Header from "./Containers/Header/Header";
import Home from "./Containers/Home/Home";
import About from "./Containers/About/About";
import Delivery from "./Containers/Delivery/Delivery";
import Basket from "./Containers/Basket/Basket";
import Add from "./Containers/Add/Add";

function App() {
  return (
    <div className={classes.App}>
      <Header />
      <Switch>
        <Route path='/about' component={About} />
        <Route path='/delivery' component={Delivery} />
        <Route path='/basket' component={Basket} />
        <Route path='/add' component={Add} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
