import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-chart-art',
  templateUrl: './chart-art.component.html',
  styleUrls: ['./chart-art.component.scss']
})
export class ChartArtComponent implements OnInit {

  ctx = document.getElementById('myChart') as HTMLCanvasElement
  myChart: Chart;
  constructor () {
    this.myChart = new Chart(
      this.ctx,
      {
        type: 'bar',
        data: {
          labels: ['Label 1', 'Label 2', 'Label 3'],
          datasets: [{
            label: 'Data',
            data: [10, 20, 30]
          }]
        }
      }
    )
  }

  ngOnInit(): void {

  }

}
