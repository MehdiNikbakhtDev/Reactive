import axios, { AxiosResponse } from 'axios';
import { request } from 'node:http';
import { count } from 'yargs';
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);

    });

}
axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});
const responstBody = <T>(responce: AxiosResponse<T>) => responce.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responstBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responstBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responstBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responstBody),

}
const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id:string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>(`/activities`,activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`,activity),
    delete: (id:string) => axios.delete<void>(`/activities/${id}`)    
}
const agent = {
    Activities
}
export default agent;