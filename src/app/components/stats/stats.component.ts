import { Component, OnInit } from '@angular/core';
import {StatsService} from "../../services/stats.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private statsService: StatsService) { }

  writeButtonIsAvailable = false;
  availableCount: Number;

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
    this.statsService.writeStatsPlayers()
      .subscribe({
        next: (res) => {
          console.log("Должен возвращаться номер");
          console.log(res);
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

  columnsConstruct() {
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];
  }

}
