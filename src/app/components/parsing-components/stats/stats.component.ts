import {Component, OnInit, ViewChild} from '@angular/core';
import {StatsService} from "../../../services/parsing-services/stats.service";
import {StatsRequest} from "../../../domain/parsing-domain/statsRequest";
import {StatsResponse} from "../../../domain/parsing-domain/statsResponse";
import {Table} from "primeng/table";
import {ProgressService} from "../../../services/common-services/progress.service";
import {ProgressComponent} from "../../common-components/progress/progress.component";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private statsService: StatsService, public progressService: ProgressService) {
  }

  moduleName = 'stats';
  writeButtonIsAvailable = false;

  statsRequest = new StatsRequest();
  results: StatsResponse[] = [];
  selectedRows: StatsResponse[] = [];
  summaryRow: StatsResponse = new StatsResponse();
  summaryRowDivide = 0;
  cols: any[];

  responseAnalyticsReady = false;
  availableCountReady = false;
  totalCountReady = false;



  @ViewChild('progressComponent') progressComponent: ProgressComponent;

  async ngOnInit() {
    await this.getResponseAnalytics(); //спрашиваем только один раз - всё, что будет добито во время работы пользователя докинется на фронте
    await this.getAvailableCount();
    await this.getTotalCount();
    this.columnsConstruct();
    setTimeout(() => {
      this.progressComponent.ngOnInit();
    }, 500);
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

  selectAll() {
    this.selectedRows = this.results;
    this.recalcutaleSummaryRow();
  }

  deselect() {
    this.selectedRows = [];
  }

  async getAvailableCount() {
    this.statsService.getAvailableCountForParsing()
      .subscribe({
        next: (res) => {
          this.progressService.mapComponentToAvailable.set(this.moduleName, res);
          this.progressComponent.refresh();
          if (res == 0) this.writeButtonIsAvailable = false;
        },
        error: (e) => console.error(e)
      });
  }

  async getTotalCount() {
    if (!this.progressService.mapComponentToTotal.get(this.moduleName)) {
      this.statsService.getTotalCountForParsing()
        .subscribe({
          next: (res) => {
            this.progressService.mapComponentToTotal.set(this.moduleName, res);
          },
          error: (e) => console.error(e)
        });
    }
  }

  async getResponseAnalytics() {
    this.statsService.getResponseAnalytics()
      .subscribe({
        next: (res) => {
          if (!!res) {
            this.results = res;
          }
        },
        error: (e) => console.error(e)
      });
  }

  writePlayers(): void {
    this.progressService.mapComponentToLoading.set(this.moduleName, true);
    this.progressService.mapComponentToStartTime.set(this.moduleName, new Date().getTime())
    this.progressComponent.getPredictableTime();
    this.statsService.writeStatsPlayers(this.statsRequest)
      .subscribe({
        next: (res) => {
          this.results.push(res);
          this.getAvailableCount();
          if ((this.progressService.mapComponentToAvailable.get(this.moduleName)!.valueOf() - res.batchSize) != 0 &&
            this.progressService.mapComponentToLoading.get(this.moduleName)) {
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
      if (!this.progressService.mapComponentToLoading.get(this.moduleName)) {
        this.writeButtonIsAvailable = false;
        clearInterval(interval);
      }
    }, 500);
  }

  requestValidate() {
    return (!!this.statsRequest.batchSize);
  }

  stopLoading() {
    this.progressService.mapComponentToLoading.set(this.moduleName, false);
  }

  columnsConstruct() {
    this.cols = [
      {field: 'batchSize', header: 'Размер пачки'},
      {field: 'batchTime', header: 'Время обработки'},
      {field: 'requestDate', header: 'Дата обработки'}
    ];
  }

}
