import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  if (action.type === `MENU_TOGGLE`) {
    return Object.assign({}, state, {
      menuIsClosed: !state.menuIsClosed,
    })
  }
  if (action.type === `THEME_TOGGLE`) {
    return Object.assign({}, state, {
      theme: state.theme === 'light' ? 'dark' : 'light',
    })
  }
  return state
}

const initialState = {
  menuIsClosed: true,
  theme: 'light',
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
