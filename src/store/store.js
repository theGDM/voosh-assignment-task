import { applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import UserReducer from '../reducers/UserReducer';
import { legacy_createStore as createStore } from 'redux'
import TaskDataReducer from '../reducers/TaskDataReducer';

//creating rootReducer by combining all the created reducers
const rootReducer = combineReducers({
    userData: UserReducer,
    tasksData: TaskDataReducer,
});

//creating store object using rootReducer and composeWithDevTools
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;