import {Component, OnInit} from '@angular/core';
import {Errors} from "../../../domain/common-domain/errors";
import {ErrorsService} from "../../../services/common-services/errors.service";

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  constructor(private errorsServise: ErrorsService) {
  }

  results: Errors[] = [];

  cols: any[];

  ngOnInit(): void {
    this.columnsConstruct();
  }

  getAllErrors(): void {
    this.errorsServise.getAllErrors().subscribe({
      next: (error) => {
        this.results = error;
      }, error: (e) => console.error(e)
    });
    console.log(this.results);
  }

  clearErrors(): void {
    this.results = [];
  }

  columnsConstruct() {
    this.cols = [
      {field: 'classAndLine', header: 'Класс и строка'},
      {field: 'descriptionError', header: 'Описание ошибки'},
      {field: 'verificationError', header: 'Обработано'},
      {field: 'payload', header: 'Информация'},
      {field: 'dateTime', header: 'Дата ошибки'},
    ];
  }
}
