import React from 'react';
import classes from './Logo..css';
import { NavLink } from "react-router-dom";
import logo from './logo.png'

const Logo = props => {
  return (
    <div className={classes.Logo}>
      <NavLink
       to='/'
       exact={true}
      >
        <img src={logo} alt="" width={60} height={60}/>
      </NavLink>
      <div>
        Лучший магазин устройств Xiaomi
      </div>
    </div>
  )
};

export default Logo;