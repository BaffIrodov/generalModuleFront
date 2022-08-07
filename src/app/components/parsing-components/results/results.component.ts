import { Component, OnInit } from '@angular/core';
import {ResultsService} from "../../../services/parsing-services/results.service";
import {ResultsRequest} from "../../../domain/parsing-domain/resultsRequest";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private resultsService: ResultsService) { }

  resultsRequest = new ResultsRequest();
  writeButtonIsAvailable = false;
  parseDone: boolean;

  ngOnInit(): void {
  }

  requestValidate() {
    return (!!this.resultsRequest.pageNumber &&
      !isNaN(Number.parseInt(this.resultsRequest.pageNumber.toString())));
  }

  getButtonText() {
    let defaultText = 'Запуск записи ссылок с results в базу данных';
    if(!!this.resultsRequest.pageNumber) {
      const parsedPageNumber = Number.parseInt(this.resultsRequest.pageNumber.toString());
      !isNaN(parsedPageNumber)?
        defaultText += ' | Количество страниц: ' + parsedPageNumber:
        null;
    }
    return defaultText;
  }

  writeLinks(): void {
    this.parseDone = false;
    this.resultsService.writeResultsLinks(Number.parseInt(this.resultsRequest.pageNumber.toString()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.parseDone = true;
        },
        error: (e) => console.error(e)
      });
    this.disableWriteButton();
  }

  async disableWriteButton() {
    this.writeButtonIsAvailable = true;
    let interval = setInterval(() => {
      if (this.parseDone) {
        this.writeButtonIsAvailable = false;
        clearInterval(interval);
      }
    }, 200);
  }

}
