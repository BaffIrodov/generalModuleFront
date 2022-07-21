import { Component, OnInit } from '@angular/core';
import {StatsService} from "../../services/stats.service";
import {StatsRequest} from "../../domain/statsRequest";
import {StatsResponse} from "../../domain/statsResponse";

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

  statsRequest = new StatsRequest();

  results: StatsResponse[] = [];

  cols: any[];

  async ngOnInit() {
    await this.getAvailableCount();
    this.columnsConstruct();
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
    new Promise(f => setTimeout(f, 10000))
      .finally(() => this.writeButtonIsAvailable = false);
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
