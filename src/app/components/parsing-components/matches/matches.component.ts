import {Component, OnInit} from '@angular/core';
import {MatchesService} from "../../../services/parsing-services/matches.service";
import {MatchesRequest} from "../../../domain/parsing-domain/matchesRequest";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  constructor(private matchesService: MatchesService) {
  }

  ngOnInit(): void {
  }

  getButtonText() {
    let defaultText = 'Распарсить Matches';
    return defaultText;
  }

  writeButtonIsAvailable = false;
  matches: number;
  matchesArr: MatchesRequest[];
  fullTime: number;
  processedMatches: number;

  getMatchesCount() {
    this.matchesService.getTotalMatchesCountForParsing().subscribe({
      next: (count) => {
        this.matches = count.valueOf();
      },  error: (e) => console.error(e)
    });
    this.getMatches();
  }

  getMatches(): void {
    this.clearMatches();
    this.matchesService.writeMatchesLinks().subscribe({
      next: (matchesLink) => {
        //console.log(matchesLink);
        matchesLink.matches.forEach(element => {
          this.matchesArr.push(element);
        })
        //this.matches = matchesLink.matches.length;
        this.fullTime = matchesLink.fullTime;
      }, error: (e) => console.error(e)
    });
    this.resetButton();
  }

  clearMatches(): void {
    this.matchesArr = [];
    this.matches = 0;
  }

  async resetButton() {
    this.writeButtonIsAvailable = true;
    let interval = setInterval(() => {
      if (this.matchesArr.length == this.matches) {
        this.writeButtonIsAvailable = false;
        clearInterval(interval);
      }
    }, 1000);
  }
}
