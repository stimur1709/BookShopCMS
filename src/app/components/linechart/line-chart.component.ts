import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {take} from "rxjs";
import {TransactionsInterval} from "../../model/Data";
import {CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement, Title, Tooltip} from 'chart.js'
import * as moment from 'moment';
import {DatePipe} from "@angular/common";
import {BTQuery, IntervalDate} from "../../model/QueryParams";
import {DateParserDirective} from "../date-parser.directive";
import {DurationInputArg2} from "moment/moment";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  dataSource: TransactionsInterval[]
  public chart: any;
  booksTransactionsCounts: string[];

  btQuery: BTQuery = {
    bookId: null,
    interval: 'day',
    dateS: DateParserDirective.getStrDate(moment().subtract(14, 'days').toDate()),
    dateE: DateParserDirective.getStrDate(new Date())
  }

  intervalDate: IntervalDate = {
    dateS: this.btQuery.dateS,
    dateE: this.btQuery.dateE
  }

  constructor(private httpService: HttpService, private datePipe: DatePipe) {
    Chart.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title, Tooltip);
  }

  ngOnInit() {
    this.getContent()
    this.createChart()

  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: this.getDataLabel(),
        datasets: [{
          label: 'My First Dataset',
          data: this.getDatasets(),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'График транзакций',
          },
          tooltip: {
            backgroundColor: 'red',
            callbacks: {
              title: () => {
                return 'Купленные книги'
              },
              label: (context) => {
                this.getBooksTransactionsCount(DateParserDirective.getDate(context.label))
                return this.booksTransactionsCounts
              }
            },
          }
        }
      }
    });
  }

  public getBooksTransactionsCount(dateS: Date) {
    this.btQuery.dateS = DateParserDirective.getStrDate(dateS)
    let momentEnd = moment(dateS).add(1, this.getUnit());
    this.btQuery.dateE = DateParserDirective.getStrDate(momentEnd.toDate())
    this.httpService.getContent('/api/transactions/books', this.btQuery)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.booksTransactionsCounts = data.map(
            (value: { title: string; count: number }) => value.title + ' - ' + value.count
          );
        }
      )
  }

  getContent() {
    this.httpService.getContent('/api/transactions/interval', this.btQuery)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.dataSource = data
          if (this.chart == undefined) {
            this.createChart()
          } else {
            this.chart.data.labels = this.getDataLabel()
            this.chart.data.datasets[0].data = this.getDatasets()
            this.chart.update()
          }
        }
      );
  }

  updateChart(event: string | null = null) {
    this.btQuery.dateS = this.intervalDate.dateS
    this.btQuery.dateE = this.intervalDate.dateE
    if (event != null) {
      this.btQuery.interval = event
    }
    this.getContent()
  }

  getDataLabel() {
    return this.dataSource.map((value) => this.datePipe.transform(value.intervalTime, 'dd.MM.yyyy'))
  }

  getDatasets() {
    return this.dataSource.map((value) => value.transactionCount)
  }

  private getUnit(): DurationInputArg2 {
    switch (this.btQuery.interval) {
      case 'day':
        return 'days'
      case 'week':
        return 'weeks';
      case 'month':
        return 'month';
      default:
        return 'years'
    }
  }

}
