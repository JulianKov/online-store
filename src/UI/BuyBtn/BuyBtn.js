import React from 'react';
import classes from './BuyBtn.css';
import { connect } from "react-redux";

const BuyBtn = props => {
  return (
    <button
      type='button'
      className={classes.BuyBtn}
      onClick={ (event) => {
        event.stopPropagation();
        return props.action
          ? props.onByu.call(this, props.data)
          : null
        }
      }
    >В корзину</button>
  )
};

function mapDispatchToProps(dispatch) {
  return {
    onByu: (item) => dispatch({type: 'ADD_TO_BASKET', payload: item})
  }
}

export default connect(null, mapDispatchToProps)(BuyBtn);