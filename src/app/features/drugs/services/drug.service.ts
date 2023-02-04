import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../../../environments/environment';
import { ICreateDrug, IUpdateDrug } from '../../../core/model/drug';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  private axiosInstance = axios.create({
    baseURL: `${environment.apiUrl}/libs/drugs`
  })

  constructor () {
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

  getList(query: any = '', limit: number, offset: number): Promise<AxiosResponse> {
    const url = `/list?query=${query}&limit=${limit}&offset=${offset}`
    return this.axiosInstance.get(url)
  }

  remove(code: any): Promise<AxiosResponse> {
    const url = `/${code}/delete`
    return this.axiosInstance.delete(url)
  }

  async save(drug: ICreateDrug): Promise<AxiosResponse> {
    return await this.axiosInstance.post('/new', drug)
  }

  async update(code: any, drug: IUpdateDrug): Promise<AxiosResponse> {
    return await this.axiosInstance.put(`/${code}/update`, drug)
  }

}
