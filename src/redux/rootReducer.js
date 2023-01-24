import { combineReducers } from 'redux';

//import reducer
import { reducer as AppReducer } from './appRedux';
import { reducer as UserReducer } from './userRedux';
import { reducer as HomeReducer } from './homeRedux';
import { reducer as NewReducer } from './newRedux';
import { reducer as DetailReducer } from './detailRedux';

// export reducers
const rootReducers = combineReducers({
    app: AppReducer,
    user: UserReducer,
    home: HomeReducer,
    new: NewReducer,
    detail: DetailReducer,
});


const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = undefined;
    }
    return rootReducers(state, action)
}

export default rootReducer;
