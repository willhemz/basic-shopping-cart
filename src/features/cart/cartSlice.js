import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://course-api.com/react-useReducer-cart-projec'

const initialState = {
  cartItems: [],
  total: 0,
  amount: 0,
  isLoading: false,
  isError: false,
  errorContent: {},
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    remove: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      )
    },
    arithmetic: (state, action) => {
      const { type, id } = action.payload
      const cartItem = state.cartItems.find((item) => item.id === id)
      cartItem.amount =
        type === 'INCREASE'
          ? cartItem.amount + 1
          : type === 'DECREASE'
          ? cartItem.amount - 1
          : cartItem.amount
    },
    result: (state) => {
      let { total, amount } = state.cartItems.reduce(
        (cartTotal, { price, amount }) => {
          cartTotal.amount += amount
          cartTotal.total += amount * price
          return cartTotal
        },
        { total: 0, amount: 0 }
      )
      return {
        ...state,
        total: parseFloat(total.toFixed(2)),
        amount,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.cartItems = payload
      })
      .addCase(getCartItems.rejected, (state, { payload }) => {
        // console.log(payload.code, payload.message)
        state.isLoading = false
        state.isError = true
        state.errorContent = { code: payload.code, message: payload.message }
      })
  },
})

export const { clearCart, arithmetic, remove, result } = cartSlice.actions

export default cartSlice.reducer
