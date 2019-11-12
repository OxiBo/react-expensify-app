import { createStore } from 'redux';

//Action generators
// Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed. Types should typically be defined as string constants. (const ADD_TODO = 'ADD_TODO')

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count } = {}) => (
    {
    type: 'SET',
    count
}
);

const resetCount = () => (
    {
        type: 'RESET'
    }
)

// Reducers 
// 1. Reducers are pure functions
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
    switch(action.type) {
    case  "INCREMENT":
        return {
            count: state.count + action.incrementBy
        };
        case "DECREMENT":
        return {
            count: state.count - action.decrementBy
        };
        case "SET":
        return {
            count: action.count
        }
        case "RESET":
        return {
            count: 0
        };
        
        default: 
         return state
}
};

const store = createStore(countReducer);

// store.subscribe(() => {
//     console.log(store.getState());
// })

// to unsubscribe
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});



store.dispatch(incrementCount());


// unsubscribe();

store.dispatch(incrementCount({ incrementBy: 1000 }))
// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10

// });

store.dispatch(decrementCount());


store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch(setCount({count: 7}))


store.dispatch(resetCount())