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

  ngOnInit(): void {
    console.log("statsWorks!");
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

}
