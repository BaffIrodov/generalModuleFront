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

  solution(): void {

  }
}
