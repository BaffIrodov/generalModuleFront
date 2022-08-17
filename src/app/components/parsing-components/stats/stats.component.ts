import {Component, OnInit, ViewChild} from '@angular/core';
import {StatsService} from "../../../services/parsing-services/stats.service";
import {StatsRequest} from "../../../domain/parsing-domain/statsRequest";
import {StatsResponse} from "../../../domain/parsing-domain/statsResponse";
import {Table} from "primeng/table";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private statsService: StatsService) { }

  writeButtonIsAvailable = false;
  workflowIsRun = true; //если фолс - то остановим цикл запросов
  availableCount: Number;
  totalCount: Number;

  statsRequest = new StatsRequest();

  results: StatsResponse[] = [];
  selectedRows: StatsResponse[] = [];

  summaryRow: StatsResponse = new StatsResponse();
  summaryRowDivide = 0;

  cols: any[];

  async ngOnInit() {
    await this.getResponseAnalytics(); //спрашиваем только один раз - всё, что будет добито во время работы пользователя докинется на фронте
    await this.getAvailableCount();
    await this.getTotalCount();
    this.columnsConstruct();
  }

  recalcutaleSummaryRow() {
    this.summaryRow.batchSize = 0;
    this.summaryRow.batchTime = 0;
    this.selectedRows.forEach(s => {
      this.summaryRow.batchSize += s.batchSize;
      this.summaryRow.batchTime += s.batchTime;
    })
    this.summaryRowDivide = this.summaryRow.batchTime / this.summaryRow.batchSize / 1000;
  }

  async getAvailableCount() {
    this.statsService.getAvailableCountForParsing()
      .subscribe({
        next: (res) => {
          this.availableCount = res;
          this.availableCount == 0 ? this.writeButtonIsAvailable = false : null;
        },
        error: (e) => console.error(e)
      });
  }

  async getTotalCount() {
    this.statsService.getTotalCountForParsing()
      .subscribe({
        next: (res) => {
          this.totalCount = res;
        },
        error: (e) => console.error(e)
      });
  }

  async getResponseAnalytics() {
    this.statsService.getResponseAnalytics()
      .subscribe({
        next: (res) => {
          if(!!res) {
            this.results = res;
          }
        },
        error: (e) => console.error(e)
      });
  }

  writePlayers(): void {
    this.statsService.writeStatsPlayers(this.statsRequest)
      .subscribe({
        next: (res) => {
          this.results.push(res);
          this.getAvailableCount();
          if(this.availableCount != 0 && this.workflowIsRun == true) {
            this.writePlayers();
          }
        },
        error: (e) => console.error(e)
      });
    this.disableWriteButton();
  }

  async disableWriteButton() {
    this.writeButtonIsAvailable = true;
    let interval = setInterval(() => {
      if (!this.workflowIsRun) {
        this.writeButtonIsAvailable = false;
        clearInterval(interval);
      }
    }, 500);
  }

  requestValidate() {
    return (!!this.statsRequest.batchSize);
  }

  stopWorkflow() {
    this.workflowIsRun = false;
  }

  columnsConstruct() {
    this.cols = [
      { field: 'batchSize', header: 'Размер пачки' },
      { field: 'batchTime', header: 'Время обработки' },
      { field: 'requestDate', header: 'Дата обработки' }
    ];
  }

}
