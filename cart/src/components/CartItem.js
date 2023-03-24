import { useContext, useEffect, useState } from "react"
import { CartContext } from "../App";

function CartItem({ item }) {
    const { onRemove, onUpdate } = useContext(CartContext)
    const [count, setCount] = useState(1);

    const handleClick = (e) => {
        if (e.target.name === 'up') {
            setCount(count + 1)
        } else {
            if (count === 1) {
                alert("수량은 1개 이상이어야 합니다.")
                return
            }
            setCount(count - 1)
        }
    }

    const removeItem = () => {
        onRemove(item.id)
    }

    const updateCount = () => {
        // 여기다 함수 전달
        onUpdate(item.id, count)
    }

    useEffect(() => {
        updateCount()
    }, [count])


    return (
        <div className='CartItem'>
            <button onClick={removeItem}>제거</button>
            <div className='Item__img'>
                <img src={item.img} />
            </div>
            <p>{item.title}</p>
            <div className='counter'>
                <button name='down' onClick={handleClick}>-</button>
                <p>{item.amount}</p>
                <button name='up' onClick={handleClick}>+</button>
            </div>
        </div>

    )
}

export default CartItem