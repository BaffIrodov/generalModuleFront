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

  pressButton = 0;
  matches: Number;
  matchesArr: MatchesRequest[];
  time: number = 0;

  getMatches(): void {
    this.clearMatches();
    let t0 = performance.now();
    this.matchesService.writeMatchesLinks().subscribe({
      next: (matchesLink) => {
        console.log(matchesLink);
        matchesLink.forEach(element => {
          this.matchesArr.push(element);
        })
        this.matches = matchesLink.length;
      }, error: (e) => console.error(e)
    });
    let t1 = performance.now();
    console.log("Время парсинга: " + (t1-t0));
    this.resetButton();
  }

  clearMatches(): void{
    this.matchesArr = [];
    this.matches = 0;
  }

  async resetButton() {
    this.pressButton = 1;
    new Promise(f => setTimeout(f, 2000))
      .finally(() => this.pressButton = 0);
  }
}
