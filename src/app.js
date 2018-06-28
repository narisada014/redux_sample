import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import { createStore } from 'redux'

// reducer部分
const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    // どのアクションにも該当しない時（デフォルトの場合）
    default:
      return state
  }
}

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)

// storeはreducerを引数にとる（reducerに関連づいたstoreであることを示す、reducerにstore内のデータを送る）
const store = createStore(counter)

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: 'INCREMENT'
        })}
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT'
        })}
    />,
    document.getElementById('root')
  )
}

// dispatchが発火するたびにDOMがrenderされる（これなかったらstateの更新だけされるのでdom自体は何も変わらない
store.subscribe(render)

// 初期状態（stateが0の時が表示される）
render()
