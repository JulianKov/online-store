const initialState = {
  basketPrice: 0,
  basketCount: 0,
  basketItems: {
    },
};

function addToBasket(state, action) {
  const data = action.payload;
  const basket = {...state.basketItems};
  if (basket[data.id]) {
    basket[data.id].amount++;
  } else {
    basket[data.id] = {
      price: +data.price,
        name: data.name,
        type: data.type,
        src: data.src,
        amount: 1
    }
  }
  return {
    ...state,
    basketCount: state.basketCount + 1,
    basketPrice: state.basketPrice + +data.price,
    basketItems: basket
  };
}

function incAmount(state, action) {
  const data = action.payload;
  const basket = {...state.basketItems};
  const canReduce = basket[data.id].amount + data.value >= 1;
  basket[data.id].amount = basket[data.id].amount + data.value < 1 ? 1 : basket[data.id].amount + data.value;

  return {
    ...state,
    basketItems: basket,
    basketCount: canReduce ? state.basketCount + data.value : state.basketCount,
    basketPrice: canReduce ? state.basketPrice + data.value*basket[data.id].price : state.basketPrice,
  }
}

function deleteItem(state, action) {
  const id = action.payload;
  const basket = {...state.basketItems};
  const amount = basket[id].amount;
  const price = basket[id].price*amount;
  delete basket[id];

  return {
    ...state,
    basketItems: basket,
    basketCount: state.basketCount - amount,
    basketPrice: state.basketPrice - price,
  }
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return addToBasket(state, action);
    case 'INCREASE_AMOUNT':
      return incAmount(state, action);
    case 'DELETE_ITEM':
      return deleteItem(state, action);
    default:
      return state
  }


}