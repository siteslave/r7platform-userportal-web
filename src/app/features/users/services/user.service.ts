import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ICreateUser } from '../../../core/model/user';

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

  async getUserList(zoneCode: any = '') {
    const url = `/users?zone_code=${zoneCode}`;
    return this.axiosInstance.get(url);
  }

  async save(user: ICreateUser) {
    return this.axiosInstance.post('/users', user);
  }
}
