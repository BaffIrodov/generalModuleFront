import {Component, OnInit} from '@angular/core';
import {MatchesService} from "../../services/matches.service";
import {MatchesRequest} from "../../domain/matchesRequest";

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

  getMatches(): void {
    this.clearMatches();
    this.matchesService.writeMatchesLinks().subscribe({
      next: (matchesLink) => {
        //console.log(matchesLink);
        matchesLink.matches.forEach(element => {
          this.matchesArr.push(element);
        })
        this.matches = matchesLink.matches.length;
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
      if (this.matches) {
        this.writeButtonIsAvailable = false;
        clearInterval(interval);
      }
    }, 1000);
  }
}
