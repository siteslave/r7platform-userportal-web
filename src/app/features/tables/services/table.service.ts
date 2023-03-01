import { Inject, Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private axiosInstance!: AxiosInstance;

  constructor (@Inject('API_URL') private apiUrl: any) {

    this.axiosInstance = axios.create({
      baseURL: `${this.apiUrl}/tables`
    })

    this.axiosInstance.interceptors.request.use(config => {
      const token = sessionStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    });

    this.axiosInstance.interceptors.response.use(response => {
      return response
    }, error => {
      return Promise.reject(error)
    })
  }

  getPerson(query: any = '', limit: number, offset: number): Promise<AxiosResponse> {
    const url = `/person?query=${query}&limit=${limit}&offset=${offset}`
    return this.axiosInstance.get(url)
  }


}
