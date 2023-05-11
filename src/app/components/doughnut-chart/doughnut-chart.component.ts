import {Component, OnInit} from '@angular/core';
import {
  ArcElement,
  CategoryScale,
  Chart,
  DoughnutController,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  public chart: any;

  constructor(private httpService: HttpService) {
    Chart.register(CategoryScale, DoughnutController, LineElement, PointElement, LinearScale, Title, Tooltip, ArcElement);
  }

  ngOnInit(): void {
    this.createChart()
  }

  createChart() {
    this.chart = new Chart("Doughnut", {
      type: 'doughnut',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }

}
