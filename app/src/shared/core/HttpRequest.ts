import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";

export default class HttpRequest {
    public axios: AxiosInstance;
    constructor(baseURL?: string) {
        this.axios = axios.create({
            baseURL,
        });
        this.requsetInterceptor();
        this.reponseInterceptor();
    }

    private reponseInterceptor() {
        // Add a response interceptor
        this.axios.interceptors.response.use(
            (response): AxiosResponse | Promise<AxiosResponse> | any => {
                // Do something with response data
                // return response.data;
                return response;
            },
            error => {
                // Do something with response error
                return Promise.reject(error);
            },
        );
    }

    private requsetInterceptor() {
        this.axios.interceptors.request.use(
            (config): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
                // Do something before request is sent
                return config;
            },
            error => {
                // Do something with request error
                return Promise.reject(error);
            },
        );
    }

    public fetch<T = any>(url: string, params: object, config: AxiosRequestConfig = {}): AxiosPromise<T> {
        return this.axios.get(url, {
            params,
            ...config,
        });
    }

    public create<T = any>(url: string, data: object, config: AxiosRequestConfig = {}): AxiosPromise<T> {
        return this.axios.post(url, data, {
            ...config,
        });
    }

    public update<T = any>(url: string, data: object, config: AxiosRequestConfig = {}): AxiosPromise<T> {
        return this.axios.put(url, data, {
            ...config,
        });
    }

    public patch<T = any>(url: string, data: object, config: AxiosRequestConfig = {}): AxiosPromise<T> {
        return this.axios.patch(url, data, {
            ...config,
        });
    }

    public remove(url: string, params: object, config: AxiosRequestConfig = {}): AxiosPromise {
        return this.axios.delete(url, {
            params,
            ...config,
        });
    }

    public wait(ms: number = 1000) {
        console.log('Threshold', process?.env?.REACT_APP_THRESHOLD);
        const threshold = process?.env?.REACT_APP_THRESHOLD as unknown as number;
        return new Promise((resolve) => { setTimeout(resolve, threshold ?? ms) });
    }

}
