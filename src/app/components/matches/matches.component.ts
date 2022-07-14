import {Component, OnInit} from '@angular/core';
import {MatchesService} from "../../services/matches.service";

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
  links: String[];

  solution(): void {
    if (this.solut == false) {
      this.pressButton = 0;
      this.matches = 0;
    } else {
      this.matchesService.writeMatchesLinks().subscribe({
        next: (matchesLink) => {
          console.log(matchesLink);
          /*this.links = matchesLink.map(function (el){return el.link});
          console.log("Test1");
          console.log(this.links);
          let array = matchesLink;
          this.links = array.map(item => item.link);
          console.log("Test2");
          console.log(this.links);*/
          this.links = matchesLink;
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
