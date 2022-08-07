import { Component, OnInit } from '@angular/core';
import {ResultsService} from "../../../services/parsing-services/results.service";
import {DebugService} from "../../../services/common-services/debug.service";

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  constructor(private debugService: DebugService) { }

  ngOnInit(): void {
  }

  setResultsLinkProcessed(value: boolean): void {
    this.debugService.resultsLinkSetProcessed(value)
      .subscribe({
        next: (res) => {
          console.log("results link сброшены в состояние " + value.toString());
        },
        error: (e) => console.error(e)
      });
  }

}
