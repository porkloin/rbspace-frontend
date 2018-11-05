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
  if (action.type === `SEND_MESSAGE`) {
    return Object.assign({}, state, {
      messages: [...state.messages, action.payload],
    })
  }
  if (action.type === `SET_MESSAGES`) {
    return Object.assign({}, state, {
      messages: action.payload,
    })
  }
  return state
}


const initialState = {
  menuIsClosed: true,
  theme: 'light',
  messages: [],
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
