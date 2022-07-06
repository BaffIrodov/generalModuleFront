import { Component, OnInit } from '@angular/core';
import {ResultsService} from "../../services/results.service";
import {ResultsRequest} from "../../domain/resultsRequest";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private resultsService: ResultsService) { }

  resultsRequest = new ResultsRequest();
  writeButtonIsAvailable = false;

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
    this.resultsService.writeResultsLinks(Number.parseInt(this.resultsRequest.pageNumber.toString()))
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.disableWriteButton();
  }

  async disableWriteButton() {
    this.writeButtonIsAvailable = true;
    new Promise(f => setTimeout(f, 10000))
      .finally(() => this.writeButtonIsAvailable = false);
  }

}
