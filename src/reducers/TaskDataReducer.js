//maintaing the initial states for jobData
const initialState = {
    loading: false,
    tasks: [],
    error: '',
}

const TaskDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TASK_DATA_REQUEST':
            return {
                ...state,
                loading: true,
            };

        case 'FETCH_TASK_DATA_SUCCESS':
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                tasks: action.payload,
            };

        case 'FETCH_TASK_DATA_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}

export default TaskDataReducer;