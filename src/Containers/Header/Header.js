import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Header.css'
import Logo from "../../UI/Logo/Logo";
import Basket from "../../UI/Basket/Basket";


const Header = () => {
  return (
    <div className={classes.Header}>
      <Logo/>
      <nav>
        <NavLink
          to='/about'
          exact={false}
          className={classes.link}
          activeClassName={classes.active}
        >
          О магазине
        </NavLink>
        <NavLink
          to='/delivery'
          exact={false}
          className={classes.link}
          activeClassName={classes.active}
        >
          Доставка
        </NavLink>
        <NavLink
          to='/add'
          exact={false}
          className={classes.link}
          activeClassName={classes.active}
        >
          Добавить товар
        </NavLink>
      </nav>
      <Basket />
    </div>
  )
};

export default Header;