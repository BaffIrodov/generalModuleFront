import {Component, OnInit, ViewChild} from '@angular/core';
import {MatchesService} from "../../../services/parsing-services/matches.service";
import {MatchesRequest} from "../../../domain/parsing-domain/matchesRequest";
import {ProgressService} from "../../../services/common-services/progress.service";
import {ProgressComponent} from "../../common-components/progress/progress.component";
import {MatchesFullRequest} from "../../../domain/parsing-domain/matchesFullRequest";

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
    await this.getMatchesFromDB(); //deprecated - вообще то надо мапу предиктов писать в базу по-хорошему. Но парсинг очень быстрый - можно подождать 10 секунд
    this.columnsConstruct();
    // setTimeout(() => {
    //   this.progressComponent.ngOnInit();
    // }, 500);
  }

  moduleName = 'matches';
  writeButtonIsNotAvailable = false;
  matches: number;
  matchesArr: MatchesRequest[] = [];
  matchesUrl: String[] = [];
  fullTime: number = 0;
  processedMatches: number = 0;
  cols: any[];

  getMatchesCount() { //deprecated
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

  changeMapPredictToArray() {
    let ok = new Map<String, String>();
    this.matchesArr.forEach(match => {
      ok = match.mapsPredict;
      match.mapsPredictChanged = [];
      console.log(match.mapsPredict);
        console.log("OK");
        Object.keys(match.mapsPredict).forEach(key => {
          match.mapsPredictChanged.push(key + " - " + match.mapsPredict.get(key));
        });
    })
    console.log(this.matchesArr);
  }

  getMatches() {
    // let i = 0;
    this.writeButtonIsNotAvailable = true;
    this.matchesService.writeMatchesLinks()
      .subscribe({
        next: (res) => {
          this.matchesArr = res.matches;
          // this.changeMapPredictToArray();
          console.log(this.matchesArr);
          this.writeButtonIsNotAvailable = false;
        },
        error: (e) => console.error(e)
      });
    // let interval = setInterval(() => {
    //   if (i == this.matches || !this.writeButtonIsNotAvailable) {
    //     clearInterval(interval);
    //     this.progressService.mapComponentToLoading.set(this.moduleName, false);
    //   } else {
    //     this.matchesService.writeOneMatch(this.matchesUrl[i]).subscribe({
    //       next: (matchInfo) => {
    //         //this.matchesArr.push(matchInfo);
    //         this.matchesArr = [...this.matchesArr, matchInfo];
    //         this.fullTime += matchInfo.matchTime;
    //         this.progressComponent.getPredictableTime();
    //         this.progressService.mapComponentToLoading.set(this.moduleName, true);
    //         this.progressService.mapComponentToStartTime.set(this.moduleName, new Date().getTime());
    //       }, error: (e) => console.error(e)
    //     });
    //     i++;
    //   }
    // }, 600);
  }

  async getMatchesCountInDB() {
    let interval = setInterval(() => {
      this.matchesService.getProcessedMatchesCount().subscribe({
        next: (count) => {
          this.processedMatches = count.valueOf();
          this.progressService.mapComponentToAvailable.set(this.moduleName, this.matches - count.valueOf());
          this.progressComponent.refresh();
          if (this.matches == count.valueOf()) {
            this.writeButtonIsNotAvailable = false;
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
          // this.matches = this.progressService.mapComponentToTotal.get(this.moduleName)!.valueOf();
          this.matchesArr = matches;
          matches.forEach(elem => this.fullTime += elem.matchTime);
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
    this.matchesService.clearAllMatches().subscribe();
    this.progressService.mapComponentToTotal.set(this.moduleName, 0);
    this.progressService.mapComponentToAvailable.set(this.moduleName, 0);
    this.fullTime = 0;
    this.matches = 0;
    this.matchesArr = [];
    this.writeButtonIsNotAvailable = false;
  }

  stopLoading() {
    this.writeButtonIsNotAvailable = false;
  }

  async resetButton() {
    this.writeButtonIsNotAvailable = true;
    let interval = setInterval(() => {
      if (this.matchesArr.length == this.matches.valueOf()) {
        this.writeButtonIsNotAvailable = false;
        clearInterval(interval);
      }
    }, 1000);
  }

  columnsConstruct() {
    this.cols = [
      {header: 'Действующие матчи'}
    ];
  }
}
