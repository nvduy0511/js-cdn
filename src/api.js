import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    Headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
})
axios.interceptors.response.use(function (response) {
    if(response && response.data){
        return response.data;
    }
    return response;
}, function (error) {

    return Promise.reject(error);
});

export const apis = {
    getQuestion: (id) =>{
        const url = `/Exercise/getExercise?id=${id}`
        return axiosClient.get(url,{id});
    },
    getTestCase: (id) =>{
        const url = `/Exercise/getTestCase?id=${id}`
        return axiosClient.get(url,{id});
    },
    runCode: (runCodeRequest) =>{
        const url = '/Exercise/runCode';
        return axiosClient.post(url,runCodeRequest);
    },
    runCodes: (runCodeRequest,id) => {
        const url = `/Exercise/runCodes?id=${id}`;
        return axiosClient.post(url,runCodeRequest,{id});
    },
    submitCode: (runCodeRequest,id) => {
        const url = `/Exercise/submitCode?id=${id}`;
        return axiosClient.post(url,runCodeRequest,{id});
    },
    getHistory:(id) =>{
        const url = `/Exercise/getHistory?id=${id}`;
        return axiosClient.post(url,{id});
    }, 
    getRank:(id) => {
        const url = `/Exercise/getRank?id=${id}`;
        return axiosClient.post(url,{id});
    }
}