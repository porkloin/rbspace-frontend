import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  if (action.type === `MENU_TOGGLE`) {
    return Object.assign({}, state, {
      menuIsClosed: !state.menuIsClosed,
    })
  }
  return state
}

const initialState = { menuIsClosed: true }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
