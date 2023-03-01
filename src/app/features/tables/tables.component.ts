import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  personQuery: any = ''

  personTotal = 0
  opdTotal = 0
  ipdTotal = 0

  personPageSize = 20
  personPageIndex = 1
  personOffset = 0
  loading = true

  personDataset: any = [];

  constructor (
    @Inject('API_URL') private apiUrl: any,
    private router: Router,
    private message: NzMessageService,
    private tableService: TableService,
  ) { }

  ngOnInit() {
    this.getPerson();
  }

  onBack(): void {
    this.router.navigate(['/dashboard'])
  }


  onPersonPageIndexChange(pageIndex: any) {

    this.personOffset = pageIndex === 1 ?
      (pageIndex * this.personPageSize) : (pageIndex - 1) * this.personPageSize;

    this.getPerson()
  }

  onPersonPageSizeChange(pageSize: any) {
    this.personPageSize = pageSize
    this.personPageIndex = 1

    this.personOffset = 0

    this.getPerson()
  }

  async getPerson() {
    this.loading = true
    try {
      const _limit = this.personPageSize
      const _offset = this.personOffset

      const response: any = await this.tableService.getPerson(this.personQuery, _limit, _offset)

      this.loading = false
      const responseData: any = response.data
      this.personTotal = responseData.total || 1

      const data: any = responseData.data;
      this.personDataset = data.map((v: any) => {
        v.birth = DateTime.fromISO(v.birth, {
          zone: "Asia/Bangkok",
          locale: 'th'
        }).toLocaleString(DateTime.DATE_SHORT);
        v.d_update = DateTime.fromISO(v.d_update, {
          zone: "Asia/Bangkok",
          locale: 'th'
        }).toLocaleString(DateTime.DATETIME_SHORT);

        return v;
      })

    } catch (error: any) {
      this.loading = false
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  searchPerson() {
    this.getPerson();
  }

  refreshPerson() {
    this.personQuery = '';
    this.getPerson();
  }

}
