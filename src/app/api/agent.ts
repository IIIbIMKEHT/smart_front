import axios, { AxiosResponse} from "axios";
import {AcademicDegreeFormValues, IAcademicDegree} from "../models/AcademicDegree";
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000)
        return response
    } catch (error) {
        console.log(error)
        return await Promise.reject(error)
    }
})
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const academicDegrees = {
    list: () => requests.get<IAcademicDegree[]>('academicDegree'),
    detail: (id: number) => requests.get<IAcademicDegree>(`academicDegree/id?Id=${id}`),
    create: (academicDegree: AcademicDegreeFormValues) => requests.post('/academicDegree', academicDegree),
    update: (academicDegree: AcademicDegreeFormValues) => requests.put(`/academicDegree/id?Id=${academicDegree.id}`, academicDegree),
    delete: (id: number) => requests.del(`/academicDegree/id?Id=${id}`)
}

const agent = {
    academicDegrees
}

export default agent;