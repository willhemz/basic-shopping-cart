import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartContainer from './components/CartContainer'
import Modal from './components/Modal'
import Navbar from './components/Navbar'
import { result, getCartItems } from './features/cart/cartSlice'

function App() {
  const { cartItems, isLoading, isError, errorContent } = useSelector(
    (store) => store.cart
  )
  const { isOpen } = useSelector((store) => store.modal)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getCartItems())
  }, [dispatch])
  React.useEffect(() => {
    dispatch(result())
  }, [cartItems, dispatch])

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  if (isError) {
    return (
      <div className='loading'>
        <h1>{errorContent.code}</h1>
        <p>{errorContent.message}</p>
      </div>
    )
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
