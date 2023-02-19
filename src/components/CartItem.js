import React from 'react'
import { useDispatch } from 'react-redux'
import { arithmetic, remove } from '../features/cart/cartSlice'
import { ChevronUp, ChevronDown } from '../icons'

const CartItem = ({ id, title, price, img, amount }) => {
  const dispatch = useDispatch()
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button onClick={() => dispatch(remove(id))} className='remove-btn'>
          remove
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(arithmetic({ id, type: 'INCREASE' }))
          }}
          className='amount-btn'>
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button
          onClick={() => {
            amount === 1
              ? dispatch(remove(id))
              : dispatch(arithmetic({ id, type: 'DECREASE' }))
          }}
          className='amount-btn'>
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}

export default CartItem
