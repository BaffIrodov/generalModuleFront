import {Component, OnInit} from '@angular/core';
import {Errors} from "../../domain/errors";

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  constructor() { }

  results: Errors[] = [];

  cols: any[];

  ngOnInit(): void {
    this.columnsConstruct();
  }

  columnsConstruct() {
    this.cols = [
      { field: 'classAndLine', header: 'Класс и строка' },
      { field: 'descriptionError', header: 'Описание ошибки' },
      { field: 'verificationError', header: 'Обработано' },
      { field: 'payload', header: 'Информация' },
      { field: 'dateTime', header: 'Дата ошибки' },
    ];
  }
}
