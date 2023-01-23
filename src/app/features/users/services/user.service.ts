import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private axiosInstance = axios.create({
    baseURL: environment.apiUrl
  });

  constructor () {
    this.axiosInstance.interceptors.request.use(config => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(response => {
      return response;
    }, error => {
      return Promise.reject(error);
    })
  }

  async getUserList(provinceCode: any = '') {
    const url = `/users?province_code=${provinceCode}`;
    return this.axiosInstance.get(url);
  }
}
