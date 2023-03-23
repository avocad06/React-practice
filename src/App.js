//hooks
import React, { useEffect, useReducer, useState } from 'react';
import './App.css';

// components
import CartItem from './components/CartItem';
import Navbar from './components/Navbar';
import data from './data';


const reducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      }
    }
    case 'CLEAR_CART': {
      return { ...state, items: [] }
    }
    case 'UPDATE': {
      let tempItems = state.items.map((item) => item.id === action.id ?
        { ...item, amount: action.count } : item)
      return { ...state, items: tempItems }
    }
    case 'GET_TOTAL': {
      const { total, amount } = state.items.reduce((sumTotal, item) => {
        const { price, amount } = item;
        sumTotal.total += price * amount
        sumTotal.amount += amount
        return sumTotal
      },
        {
          total: 0,
          amount: 0
        })
      return { ...state, total: parseFloat(total.toFixed(2)), amount }
    }
    default:
      return state
  }
}

const initialState = {
  items: data,
  total: 0,
  amount: 0
}

export const CartContext = React.createContext()

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const [items, setItems] = useState(data);
  const [all, setAll] = useState(0);
  const [allPrice, setAllPrice] = useState(0);

  const onRemove = (id) => {
    dispatch({ type: 'REMOVE', id: id })
  }

  const onUpdate = (id, count) => {
    dispatch({ type: 'UPDATE', id, count })
  }

  const handleClick = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getTotal = () => {
    dispatch({ type: 'GET_TOTAL' })
  }

  useEffect(() => {
    getTotal();
  }, [state.items])

  console.log(state)

  return (
    <CartContext.Provider value={
      {
        ...state,
        onRemove,
        onUpdate
      }
    }>
      <Navbar />
      <div className="App">
        <button onClick={handleClick}>장바구니 비우기</button>
        {
          state.items.length !== 0
            ?
            <>
              {state.items.map(item => <CartItem key={item.id} item={item} />)}
              <div>총 주문금액:{state.total}</div>
            </>
            :
            <>
              <div>장바구니가 비었습니다.</div>
              <div>총 주문금액: 0</div>
            </>
        }
      </div >
    </CartContext.Provider>
  );
}

export default App;
