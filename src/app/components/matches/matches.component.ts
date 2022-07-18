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

  solut = false;
  pressButton = -1;
  matches: Number;
  //links: String[] = [];
  //teams: Array<String[]> = [];
  matchN: MatchesRequest[];

  solution(): void {
    if (this.solut == false) {
      this.pressButton = 0;
      this.matches = 0;
    } else {
      //this.links = [];
      this.matchN = [];
      this.matchesService.writeMatchesLinks().subscribe({
        next: (matchesLink) => {
          console.log(matchesLink);
          matchesLink.forEach(el => {
            //this.links.push(el.matchesUrl);
            //this.teams.push([el.leftTeam, el.rightTeam]);
            this.matchN.push(el);
          })
          //console.log(this.links);
          this.matches = matchesLink.length;
        }, error: (e) => console.error(e)
      });

      this.resetButton();
    }
  }

  answer(ans: number): void {
    if (ans == 1) {
      this.solut = true;
    } else {
      this.solut = false;
    }
  }

  async resetButton() {
    this.pressButton = 1;
    new Promise(f => setTimeout(f, 2000))
      .finally(() => this.pressButton = -1);
  }
}
