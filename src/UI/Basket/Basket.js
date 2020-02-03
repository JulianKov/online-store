import React, {Component} from 'react';
import classes from './Basket.css';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

class Basket extends Component {
  render() {
    return (
      <NavLink
        className={classes.Basket}
        to='/basket'
      >
        <i className="fas fa-shopping-cart "></i>
        <div className={classes.basketInfo}>
          <span>Корзина</span>
          <span>({this.props.basketCount} : {this.props.basketPrice} руб)</span>
        </div>
      </NavLink>
    )
  }
}

function mapStateToProps(state) {
  return {
    basketPrice: state.basketPrice,
    basketCount: state.basketCount,
    basketItems: state.basketItems
  }
}


export default connect(mapStateToProps)(Basket);