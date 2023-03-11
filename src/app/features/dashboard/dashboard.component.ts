import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userUsageChartOption: EChartsOption = {
    title: {
      text: 'สถิติการให้บริการ',
      textStyle: {
        fontFamily: "Kanit"
      }
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontFamily: "Kanit"
      }
    },
    legend: {
      data: ['ผู้ป่วยนอก', 'ผู้ป่วยใน'],
      textStyle: {
        fontFamily: "Kanit"
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      nameTextStyle: {
        fontFamily: "Kanit"
      },
      boundaryGap: true,
      data: ['3 มี.ค', '4 มี.ค', '5 มี.ค', '6 มี.ค', '7 มี.ค', '8 มี.ค', '9 มี.ค', '10 มี.ค'],
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'ผู้ป่วยนอก',
        type: 'bar',
        data: [320, 432, 201, 334, 290, 430, 510, 400]
      },
      {
        name: 'ผู้ป่วยใน',
        type: 'bar',
        data: [10, 15, 11, 10, 19, 20, 25, 20]
      }
    ]
  };

  userPiChartOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      textStyle: {
        fontFamily: "Kanit"
      }
    },
    title: {
      text: 'จำนวนประชากรแยกตาม Typearea',
      subtext: 'ณ วันที่ 11 มี.ค. 2566 เวลา 18:00 น.',
      left: 'center',
      textStyle: {
        fontFamily: "Kanit"
      }
    },
    legend: {
      orient: 'horizontal',
      bottom: 'bottom',
      textStyle: {
        fontFamily: "Kanit"
      }
    },
    series: [
      {
        name: 'จำนวนประชากร',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 5048, name: 'Typearea 1' },
          { value: 735, name: 'Typearea 2' },
          { value: 980, name: 'Typearea 3' },
          { value: 484, name: 'Typearea 4' },
        ]
      },
    ],
  };

  historyDataSet: any[] = [
    {
      username: 'u11053',
      hospcode: '11053',
      hospname: 'รพ.กันทรวิชัย',
      last_update: '13 ม.ค. 2566 เวลา 12:45:05',
      total_records: 500,
    },
    {
      username: 'u10707',
      hospcode: '10707',
      hospname: 'รพท.มหาสารคาม',
      last_update: '12 ม.ค. 2566 เวลา 11:49:45',
      total_records: 1500,
    },

  ];

  hospitalNotSendDataSet: any[] = [
    {
      hospcode: '11054',
      hospname: 'รพ.เชียงยืน',
      last_update: '13 ม.ค. 2566 เวลา 12:45:05',
    },
    {
      hospcode: '10705',
      hospname: 'รพศ.ร้อยเอ็ด',
      last_update: '12 ม.ค. 2566 เวลา 11:49:45',
    },

  ];
}
