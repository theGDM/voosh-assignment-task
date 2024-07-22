import { getAllTasks } from "../services/api";

export const TaskDataRequest = () => ({
    type: 'FETCH_TASK_DATA_REQUEST',
});

export const TaskDataSuccess = (data) => ({
    type: 'FETCH_TASK_DATA_SUCCESS',
    payload: data,
});

export const TaskDataFailure = (data) => ({
    type: 'FETCH_TASK_DATA_FAILURE',
    payload: data,
});

export const fetchTasksData = (userId) => {
    return async (dispatch) => {
        try {
            let data_retries = 1;
            dispatch(TaskDataSuccess([]));
            while (data_retries < 4) {
                dispatch(TaskDataRequest());
                await getAllTasks(userId)
                    .then((response) => {
                        const tasksData = response.data;
                        console.log(tasksData);
                        if (tasksData === null || tasksData.length == 0) {
                            dispatch(TaskDataSuccess([]));
                        } else {
                            dispatch(TaskDataSuccess(tasksData));
                        }
                        data_retries = 4;
                    }).catch((err) => {
                        data_retries++;
                    });
            }
        } catch (err) {
            dispatch(TaskDataFailure(err));
        }
    };
};