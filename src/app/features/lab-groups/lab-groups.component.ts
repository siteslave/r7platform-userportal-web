import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { environment } from '../../../environments/environment';
import { ILabGroup } from '../../core/@types/lab_group';
import { ModalSearchComponent } from '../../shared/modals/modal-search/modal-search.component';
import { ModalLabGroupNewComponent } from './modals/modal-lab-group-new/modal-lab-group-new.component';
import { LabGroupService } from './services/lab-group.service';

@Component({
  selector: 'app-lab-groups',
  templateUrl: './lab-groups.component.html',
  styleUrls: ['./lab-groups.component.css']
})
export class LabGroupsComponent {

  @ViewChild('mdlSearch') private mdlSearch!: ModalSearchComponent;
  @ViewChild('mdlNew') private mdlNew!: ModalLabGroupNewComponent;

  datasets: ILabGroup[] = []
  query: any = ''
  uploadUrl: any = ''
  uploadHeader: any = ''

  total = 0
  pageSize = 20
  pageIndex = 1
  offset = 0
  loading = true

  constructor (
    private router: Router,
    private labGroupService: LabGroupService,
    private message: NzMessageService
  ) {
    const token = sessionStorage.getItem('token')
    this.uploadHeader = { authorization: 'Bearer ' + token }
    this.uploadUrl = `${environment.apiUrl}/libs/lab-groups/upload`
  }

  ngOnInit() {
    this.getItems()
  }

  onBack(): void {
    this.router.navigate(['/dashboard'])
  }

  onPageIndexChange(pageIndex: any) {

    this.offset = pageIndex === 1 ?
      (pageIndex * this.pageSize) : (pageIndex - 1) * this.pageSize;

    this.getItems()
  }

  onPageSizeChange(pageSize: any) {
    this.pageSize = pageSize
    this.pageIndex = 1

    this.offset = 0

    this.getItems()
  }

  onSearchSubmit(query: any) {
    if (query) {
      this.query = query
      this.getItems()
    }
  }

  onAddSubmit(saved: boolean) {
    if (saved) {
      this.message.success('ดำเนินการเสร็จเรียบร้อย')
      this.getItems()
    }
  }

  onMappingSubmit(saved: boolean) {
    if (saved) {
      this.message.success('ดำเนินการเสร็จเรียบร้อย')
      this.getItems()
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done') {
      this.message.success(`${info.file.name} file uploaded successfully`)
      this.getItems()
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
    this.getItems()
  }

  async getItems() {
    this.loading = true
    try {
      const _limit = this.pageSize
      const _offset = this.offset

      const response = await this.labGroupService.getList(this.query, _limit, _offset)

      this.loading = false

      const responseData: any = response.data
      this.total = responseData.total || 1

      this.datasets = responseData.data.map((v: any) => {
        const created_at = DateTime.fromISO(v.created_at, { zone: "Asia/Bangkok", locale: 'th' })
        const updated_at = DateTime.fromISO(v.updated_at, { zone: "Asia/Bangkok", locale: 'th' })
        v.created_at = created_at.toLocaleString(DateTime.DATETIME_SHORT)
        v.updated_at = updated_at.toLocaleString(DateTime.DATETIME_SHORT)
        return v
      })

    } catch (error: any) {
      this.loading = false
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  async removeItem(code: any) {
    this.loading = true
    try {
      await this.labGroupService.remove(code)
      this.loading = false
      this.message.success('ดำเนินการเสร็จเรียบร้อย')
      this.getItems()
    } catch (error: any) {
      this.loading = false
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  confirmRemove(code: any) {
    if (code) {
      this.removeItem(code)
    }
  }

  cancelRemove() { }

  addItem() {
    this.mdlNew.showModal()
  }

  editItem(group: ILabGroup) {
    this.mdlNew.showModalUpdate(group)
  }

}
