import React from 'react';
import classes from './Basket.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Basket = props => {
    const isNotEmpty =  Object.keys(props.basketItems).length > 0;
    const items = props.basketItems;
    const increase = props.onIncrease;
    const remove = props.onDelete;
    function renderItems() {
      return Object.keys(items).map((itemId) => {
        return (
          <tr key={itemId}>
            <td className={classes.medCell}><NavLink to={'/' + items[itemId].type+ '/' + itemId }><img src={items[itemId].src} alt={items[itemId].name} width={80} height={80}/></NavLink></td>
            <td className={classes.bigCell}><NavLink to={'/' + items[itemId].type+ '/' + itemId }>{items[itemId].name}</NavLink></td>
            <td className={classes.smCell}>{items[itemId].price} руб</td>
            <td className={classes.medCell}>
              <div className={classes.btnGroup}>
                <button onClick={increase.bind(this, -1, itemId)}>-</button>
                  {items[itemId].amount}
                <button onClick={increase.bind(this, 1, itemId)}>+</button>
              </div>
            </td>
            <td className={classes.smCell}>{items[itemId].price * items[itemId].amount} руб</td>
            <td><button className={classes.remBtn} onClick={remove.bind(this, itemId)} /></td>
          </tr>
        )
      })
    }

    return (
      <div>
        <h1>Ваша корзина {isNotEmpty ? null : 'пуста'}</h1>
        {isNotEmpty
          ? (
            <table className={classes.table}>
              <thead>
              <tr>
                <th>Изображение</th>
                <th>Наименование</th>
                <th>Стоимость</th>
                <th>Количество</th>
                <th>Итого</th>
                <th/>
              </tr>
              </thead>
              <tbody>
              {renderItems()}
              </tbody>
            </table>
          )
          : null}
      </div>
    )
}

function mapStateToProps(state) {
  return {
    basketItems: state.basketItems
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrease: (value, id) => dispatch({type: 'INCREASE_AMOUNT', payload: {value: value, id: id}}),
    onDelete: (id) => dispatch({type: 'DELETE_ITEM', payload: id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket);