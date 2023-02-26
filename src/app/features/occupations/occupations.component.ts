import { DateTime } from 'luxon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

import { Component, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IOccupation } from '../../core/@types/occupation';
import { ModalSearchComponent } from '../../shared/modals/modal-search/modal-search.component';
import { OccupationService } from './services/occupation.service';
import { ModalOccupationNewComponent } from './modals/modal-occupation-new/modal-occupation-new.component';
import { ModalOccupationMappingComponent } from './modals/modal-occupation-mapping/modal-occupation-mapping.component';

@Component({
  selector: 'app-occupations',
  templateUrl: './occupations.component.html',
  styleUrls: ['./occupations.component.css']
})
export class OccupationsComponent {


  @ViewChild('mdlSearch') private mdlSearch!: ModalSearchComponent;
  @ViewChild('mdlDrugNew') private mdlDrugNew!: ModalOccupationNewComponent;
  @ViewChild('mdlDrugMapping') private mdlDrugMapping!: ModalOccupationMappingComponent;

  datasets: IOccupation[] = []
  query: any = ''
  uploadUrl: any = ''
  uploadHeader: any = ''

  total = 0
  pageSize = 20
  pageIndex = 1
  offset = 0
  loading = true

  constructor (
    @Inject('API_URL') private apiUrl: any,
    private router: Router,
    private occupationService: OccupationService,
    private message: NzMessageService
  ) {
    const token = sessionStorage.getItem('token')
    this.uploadHeader = { authorization: 'Bearer ' + token }
    this.uploadUrl = `${this.apiUrl}/libs/occupations/upload`
  }

  ngOnInit() {
    this.getDrugs()
  }

  onBack(): void {
    this.router.navigate(['/dashboard'])
  }

  onPageIndexChange(pageIndex: any) {

    this.offset = pageIndex === 1 ?
      (pageIndex * this.pageSize) : (pageIndex - 1) * this.pageSize;

    this.getDrugs()
  }

  onPageSizeChange(pageSize: any) {
    this.pageSize = pageSize
    this.pageIndex = 1

    this.offset = 0

    this.getDrugs()
  }

  onSearchSubmit(query: any) {
    if (query) {
      this.query = query
      this.getDrugs()
    }
  }

  onAddSubmit(saved: boolean) {
    if (saved) {
      this.message.success('ดำเนินการเสร็จเรียบร้อย')
      this.getDrugs()
    }
  }

  onMappingSubmit(saved: boolean) {
    if (saved) {
      this.message.success('ดำเนินการเสร็จเรียบร้อย')
      this.getDrugs()
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done') {
      this.message.success(`${info.file.name} file uploaded successfully`)
      this.getDrugs()
    } else if (info.file.status === 'error') {
      this.message.error(`${info.file.name} file upload failed.`)
    }
  }

  search() {
    this.mdlSearch.showModal()
  }

  refresh() {
    this.query = ''
    this.pageIndex = 1
    this.offset = 0
    this.getDrugs()
  }

  async getDrugs() {
    this.loading = true
    try {
      const _limit = this.pageSize
      const _offset = this.offset

      const response = await this.occupationService.getList(this.query, _limit, _offset)

      this.loading = false
      const responseData: any = response.data
      this.total = responseData.total || 1

      this.datasets = responseData.data.map((v: any) => {
        const created_at = DateTime.fromISO(v.created_at, {
          zone: "Asia/Bangkok",
          locale: 'th'
        })
        const updated_at = DateTime.fromISO(v.updated_at, {
          zone: "Asia/Bangkok",
          locale: 'th'
        })
        v.created_at = created_at.toLocaleString(DateTime.DATETIME_SHORT)
        v.updated_at = updated_at.toLocaleString(DateTime.DATETIME_SHORT)
        return v
      })

    } catch (error: any) {
      this.loading = false
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  async removeDrug(code: any) {
    this.loading = true
    try {
      await this.occupationService.remove(code)
      this.loading = false
      this.message.success('ดำเนินการเสร็จเรียบร้อย')
      this.getDrugs()
    } catch (error: any) {
      this.loading = false
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  confirmRemove(code: any) {
    if (code) {
      this.removeDrug(code)
    }
  }

  cancelRemove() { }

  addItem() {
    this.mdlDrugNew.showModal()
  }

  editItem(code: any, name: any) {
    this.mdlDrugNew.showModal(code, name)
  }

  showMapping(occupation: IOccupation) {
    this.mdlDrugMapping.showModal(occupation)
  }

}
