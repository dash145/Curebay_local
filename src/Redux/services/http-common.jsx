import axios from "axios";
import { secureStorage } from "../Reducers/authReducer";
var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    headers: {
        "Content-type": "application/json",
    }
});

axiosInstance.interceptors.request.use(
    config => {
        //let token = store.getState().authReducer.token;
        let s_token = secureStorage.getItem('token');
        // s_token = "33dfc12b-e007-4293-a54c-c0c1b35cb720"
        // if(s_token){
        //     s_token = "33dfc12b-e007-4293-a54c-c0c1b35cb720"
        // }
        // let s_token_c = "33dfc12b-e007-4293-a54c-c0c1b35cb720"
        // console.log(s_token, secureStorage.getItem('refreshToken'), "sdfisdhfosdhousd")
        // config.headers["Authorization"] = `Bearer ${s_token ? s_token : token}`;
        if(!config.headers["Authorization"]){
        config.headers["Authorization"] = `Bearer ${s_token}`;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    // (error) => {
    //     return new Promise((resolve) => {
    //         if (error.response && error.response.status === 401) {
    //             secureStorage.removeItem('token');
    //             secureStorage.removeItem('patientData');
    //             secureStorage.removeItem('userType');
    //             secureStorage.removeItem('patientSession');
    //         }

    //         return Promise.reject(error)
    //     })
    // },
     (error) => {
            const prevRequest = error?.config;
            console.log(prevRequest , "sdvhdovdovbdofuv")
            const refreshToken = secureStorage.getItem("refreshToken")
            console.log(error.response , "dsfjrfierouer")
            if (error.response && error.response.status === 401 && !prevRequest?.sent) {
                prevRequest.sent = true
                axios.post(`${process.env.REACT_APP_BASEURL}auth/token/refresh`,{
                    refreshToken: refreshToken
                }).then((res) =>{
                    prevRequest.headers['Authorization'] = `Bearer ${res.data.access_token}`;
                     secureStorage.setItem('token' , res?.data?.access_token)
                     secureStorage.setItem('refreshToken' , res?.data?.refresh_token)
                    
                }).catch(err =>{             
                 secureStorage.removeItem('refreshToken')
                 secureStorage.removeItem('patientData');
                 secureStorage.removeItem('userType');
                 secureStorage.removeItem('patientSession');
                if( secureStorage.getItem('token')){
                    secureStorage.removeItem('token');
                localStorage.clear();
                    window.location.reload();
                }
                // window.location.reload()
                })
    // history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
    return axiosInstance(prevRequest);
            }

            return Promise.reject(error)

    },
)

export default axiosInstance;


export async function callApi() {
    var data = new FormData();
    // @ts-ignore
    data.append('username', process.env.REACT_APP_USERNAME);
    // @ts-ignore
    data.append('password', process.env.REACT_APP_PASSWORD);
    // @ts-ignore
    data.append('grant_type', process.env.REACT_APP_GRANT_TYPE);
    // @ts-ignore
    await axios.post(process.env.REACT_APP_BASEURL + 'oauth/token', data, {
        // @ts-ignore
        auth: { username: process.env.REACT_APP_AUTH_USERNAME, password: process.env.REACT_APP_AUTH_PASSWORD }
    }).then(result => {
        secureStorage.setItem("token", result?.data?.access_token);
        // localStorage.set(res.access, 'token')
    // return axios(originalRequest)
    });
}
