import {Component, OnInit, ViewChild} from '@angular/core';
import {MatchesService} from "../../../services/parsing-services/matches.service";
import {MatchesRequest} from "../../../domain/parsing-domain/matchesRequest";
import {ProgressService} from "../../../services/common-services/progress.service";
import {ProgressComponent} from "../../common-components/progress/progress.component";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  constructor(private matchesService: MatchesService, public progressService: ProgressService) {
  }

  @ViewChild('progressComponent') progressComponent: ProgressComponent;

  async ngOnInit() {
    setTimeout(() => {
      this.progressComponent.ngOnInit();
    }, 500);
    await this.getMatchesFromDB();
  }

  moduleName = 'matches';
  writeButtonIsAvailable = false;
  matches: number;
  matchesArr: MatchesRequest[] = [];
  matchesUrl: String[] = [];
  fullTime: number;
  processedMatches: number = 0;

  getMatchesCount() {
    this.clearMatches();
    this.resetButton();
    this.getMatchesCountInDB();
    if (!this.progressService.mapComponentToTotal.get(this.moduleName)) {
      this.matchesService.getTotalMatchesCountForParsing().subscribe({
        next: (allLinks) => {
          this.matchesUrl = allLinks;
          this.matches = allLinks.length;
          this.progressService.mapComponentToTotal.set(this.moduleName, this.matches);
        }, error: (e) => console.error(e)
      });
    }
    this.getMatches();
  }

  getMatches() {
    let i = 0;
    let interval = setInterval(() => {
      if (i == this.matches || !this.writeButtonIsAvailable) {
        clearInterval(interval);
      } else {
        this.matchesService.writeOneMatch(this.matchesUrl[i]).subscribe({
          next: (matchInfo) => {
            this.matchesArr.push(matchInfo);
          }, error: (e) => console.error(e)
        });
        i++;
      }
    }, 600);
  }

  async getMatchesCountInDB() {
    let interval = setInterval(() => {
      this.matchesService.getProcessedMatchesCount().subscribe({
        next: (count) => {
          this.processedMatches = count.valueOf();
          this.progressService.mapComponentToAvailable.set(this.moduleName, this.matches - count.valueOf());
          this.progressComponent.refresh();
          if (this.matches == count.valueOf()) {
            this.writeButtonIsAvailable = false;
            clearInterval(interval);
          }
        }, error: (e) => console.error(e)
      });
    }, 500);
  }

  async getMatchesFromDB() {
    this.matchesService.getMatchesFromDB().subscribe({
      next: (matches) => {
        if (!!matches) {
          this.matches = this.progressService.mapComponentToTotal.get(this.moduleName)!.valueOf();
          this.matchesArr = matches;
        }
      }, error: (e) => console.error(e)
    });
  }

  // async getMatches() {
  //   this.clearMatches();
  //   this.matchesService.writeMatchesLinks().subscribe({
  //     next: (matchesLink) => {
  //       matchesLink.matches.forEach(element => {
  //         this.matchesArr.push(element);
  //       })
  //       //this.matches = matchesLink.matches.length;
  //       this.fullTime = matchesLink.fullTime;
  //     }, error: (e) => console.error(e)
  //   });
  //   this.resetButton();
  // }

  clearMatches() {
    this.matchesArr = [];
    this.matches = 0;
    this.progressService.mapComponentToTotal.set(this.moduleName, 0);
    this.progressService.mapComponentToAvailable.set(this.moduleName, 0);
    this.writeButtonIsAvailable = false;
  }

  async stopLoading() {
    this.writeButtonIsAvailable = false;
  }

  async resetButton() {
    this.writeButtonIsAvailable = true;
    let interval = setInterval(() => {
      if (this.matchesArr.length == this.matches.valueOf()) {
        this.writeButtonIsAvailable = false;
        clearInterval(interval);
      }
    }, 1000);
  }
}
