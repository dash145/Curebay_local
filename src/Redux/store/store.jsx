import { createStore, applyMiddleware ,compose } from "redux";
import asyncReducer from "../Reducers/allReducer";
import thunk from "redux-thunk";
import logger from 'redux-logger';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    asyncReducer,
     composeEnhancer(applyMiddleware(thunk,logger))
    
  );
  


export default store;
