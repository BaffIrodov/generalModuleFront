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

  solution(): void {
    if (this.solut == false) {
      this.pressButton = 0;
    } else {
      this.matchesService.writeMatchesLinks().subscribe({
        next: (size) => {
          console.log(size);
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
