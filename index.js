import { createStore } from 'redux'
import { myCreateStore } from './my-redux'
const postCountElement= document.querySelector('.post-count')

const initialState = {
  post: 0,
  name: 'Anurag Singh',
  age: 26,
}

const INCREMENT = 'post/increment'
const DECREMENT = 'post/decrement'
const INCREASE_BY = 'post/increaseBy'
const DECREASE_BY = 'post/decreaseBy'

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, post: state.post + 1 }
    case DECREMENT:
      return { ...state, post: state.post - 1 }
    case INCREASE_BY:
      return { ...state, post: state.post + action.payload }
    case DECREASE_BY:
      return { ...state, post: state.post - action.payload }
    default:
      return state
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.())
const myStore= myCreateStore(reducer)
console.log(store);
console.log(myStore);

const unsubscribe1=myStore.subscribe(() => {
  console.log(myStore.getState())
  postCountElement.innerText = myStore.getState().post
})

const unsubscribe2=myStore.subscribe(() => {
  console.log('hiii')
})

const unsubscribe3=myStore.subscribe(() => {
  console.log('hello')
})

postCountElement.innerText = myStore.getState().post

myStore.dispatch({ type: INCREMENT })
console.log(myStore.getState())
myStore.dispatch({ type: DECREMENT })
console.log(myStore.getState())
myStore.dispatch({ type: INCREASE_BY, payload: 15 })
console.log(myStore.getState())
myStore.dispatch({ type: DECREASE_BY, payload: 5 })
console.log(myStore.getState())

unsubscribe1()
postCountElement.addEventListener('click',()=>{
  store.dispatch({ type: INCREMENT })
})