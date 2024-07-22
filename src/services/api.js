import axios from 'axios';
import { toast } from 'react-toastify';
const baseURL = 'https://task-manager-service-c5ko.onrender.com';

export const register = async (fullName, email, password) => {
    try {
        let response = await axios.post(`${baseURL}/api/auth/register`, {
            fullName: fullName,
            email: email,
            password: password
        });

        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const signIn = async (email, password) => {
    try {
        let response = await axios.post(`${baseURL}/api/auth/login`, {
            email: email,
            password: password
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const createTask = async (userId, title, description, deadline) => {
    try {
        let response = await axios.post(`${baseURL}/api/tasks/${userId}`, {
            title: title,
            description: description,
            taskDeadline: deadline,
        });
        toast('Task created successfully!');
    } catch (err) {
        console.log(err);
        toast('Some error occured while creating the task!');
    }
}

export const updateTask = async (taskId, body) => {
    try {
        let response = await axios.put(`${baseURL}/api/tasks/${taskId}`, body);
        toast('Task updated successfully!');
    } catch (err) {
        console.log(err);
        toast('Some error occured while upadting the task!');
    }
}

export const deleteTask = async (taskId) => {
    try {
        let response = await axios.delete(`${baseURL}/api/tasks/${taskId}`);
        toast('Task deleted successfully created!');
    } catch (err) {
        console.log(err);
        toast('Some error occured while deleting the task!');
    }
}


export const getAllTasks = async (userId) => {
    try {
        let response = await axios.get(`${baseURL}/api/tasks/${userId}/task`);
        return response;
    } catch (err) {
        console.log(err);
        toast('Some error occured while deleting the task!');
    }
}

export const getUser = async (email) => {
    try {
        let response = await axios.get(`${baseURL}/api/users/${email}`);
        return response.data;
    } catch (err) {
        console.log(err);
        toast('Some error occured while getting user!');
    }
}


