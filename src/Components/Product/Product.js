import React from 'react';
import classes from './Product.css'
import BuyBtn from "../../UI/BuyBtn/BuyBtn";
import {withRouter} from 'react-router-dom';

const Product = props => {
  return (
    <div onClick={()=> {props.history.push(`/${props.data.type}/${props.data.id}`)}} className={classes.Product}>
      <img src={props.data.src} alt="" width={250} height={250}/>
      <span>{props.data.name}</span>
      <span className={classes.orange}>{props.data.price} руб.</span>
      <BuyBtn
        data={props.data}
        action={props.action}
      />
    </div>
  )
};

export default withRouter(Product);