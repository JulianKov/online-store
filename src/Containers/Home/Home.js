import React from 'react';
import classes from './Home.css';
import {Route, Switch, NavLink} from 'react-router-dom';
import Categories from "../../Components/Categories/Categories";
import Detail from "../../Components/Detail/Detail";


const Home = () => {
  return (
    <div className={classes.Home}>
      <div className={classes.Сatalog}>
        <div>
          <NavLink
            to='/phones'
            className={classes.link}
            activeClassName={classes.active}
          >Смартфоны</NavLink>
          <i className="fas fa-angle-right"></i>
        </div>
        <div>
          <NavLink
            to='/cameras'
            className={classes.link}
            activeClassName={classes.active}
          >Камеры</NavLink>
          <i className="fas fa-angle-right"></i>
        </div>
        <div>
          <NavLink
            to='/devices'
            className={classes.link}
            activeClassName={classes.active}
          >Смарт-устройства</NavLink>
          <i className="fas fa-angle-right"></i>
        </div>
      </div>
        <Switch>
          <Route
            path='/:type/:id'
            render={() => <Detail/>}
          />
          <Route
            path='/phones'
            render={() => <Categories type="phones" name="Смартфоны" />}
          />
          <Route
            path='/cameras'
            render={() => <Categories type="cameras" name="Камеры" />}
          />
          <Route
            path='/devices'
            render={() => <Categories type="devices" name="Устрйоства" />}
          />
        </Switch>
      </div>
  )
};

export default Home;