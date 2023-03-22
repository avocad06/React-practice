//hooks
import { createContext, useContext, useEffect, useState } from 'react';
import './App.css';

// components
import CartItem from './components/CartItem';
import Navbar from './components/Navbar';
import data from './data';

function App() {

  const CartContext = createContext(null);

  const [items, setItems] = useState(data);
  const [all, setAll] = useState(0);
  const [allPrice, setAllPrice] = useState(0);

  const onRemove = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const onUpdate = (id, count) => {
    setItems(
      items.map(item => item.id === id
        ? { ...item, amount: count } : item))
  }

  const handleClick = (e) => {
    e.preventDefault();
    setItems([])
  }

  useEffect(() => {
    let result = items.reduce((sum, item) => sum + parseInt(item.amount), 0)
    setAll(result)
    console.log("변경", result, items)
    let priceResult = items.reduce((sum, item) => sum + parseInt(item.amount) * +(item.price).toFixed(2), 0)
    setAllPrice(priceResult.toFixed(2))
  }, [items])

  return (
    <div className="App">
      <Navbar items={items}
        all={all} />
      <button onClick={handleClick}>장바구니 비우기</button>
      {
        items.length !== 0
          ?
          <>
            {items.map(item => <CartItem key={item.id} item={item} onUpdate={onUpdate} onRemove={onRemove} />)}
            <div>총 주문금액: {allPrice}</div>
          </>
          :
          <>
            <div>장바구니가 비었습니다.</div>
            <div>총 주문금액: 0</div>
          </>
      }
    </div >
  );
}

export default App;
