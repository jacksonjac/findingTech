import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
 import {  ChartServiceService , AppConfig } from '../../Servies/Technician/chart-service.service';

@Component({
  selector: 'app-technician-homepage',
  templateUrl: './technician-homepage.component.html',
  styleUrls: ['./technician-homepage.component.scss']
})
export class TechnicianHomepageComponent {

  dataCombo: any;
  dataPie: any;
  chartOptionsCombo: any;
  chartOptionsPie: any;
  subscription: Subscription | undefined;
  config: AppConfig | undefined;

  constructor(private configService: ChartServiceService) {}

  ngOnInit() {
    this.dataCombo = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'line',
          label: 'Dataset 1',
          borderColor: '#42A5F5',
          borderWidth: 1,
          fill: false,
          data: [50, 25, 12, 48, 56, 76, 42]
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: '#66BB6A',
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: 'white',
          borderWidth: 2
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: '#FFA726',
          data: [41, 52, 24, 74, 23, 21, 32]
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: '#FFA729',
          data: [41, 52, 24, 74, 23, 21, 32]
        }
      ]
    };

    this.dataPie = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"]
        }
      ]
    };

    this.config = this.configService.config;
    this.updateChartOptions();
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
      this.updateChartOptions();
    });
  }

  updateChartOptions() {
    this.chartOptionsCombo = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
    this.chartOptionsPie = this.chartOptionsCombo;
  }

  getLightTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#FFFFFF'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#FFFFFF'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#FFFFFF'
          },
          grid: {
            color: 'transparent'
          }
        }
      }
    };
  }

  getDarkTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#FFFFFF'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'transparent'
          }
        },
        y: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        }
      }
    };
  }

}
