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
    getQuestion: () =>{
        const url = `/Exercise/getExercise?id=1`
        return axiosClient.get(url);
    },
    getTestCase: () =>{
        const url = `/Exercise/getTestCase?id=1`
        return axiosClient.get(url);
    },
    runCode: (runCodeRequest) =>{
        const url = '/Exercise/runCode';
        return axiosClient.post(url,runCodeRequest);
    }
}