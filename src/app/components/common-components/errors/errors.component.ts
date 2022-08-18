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
  selectedRows: Errors[] = [];

  showArchive = false;

  cols: any[];

  ngOnInit(): void {
    this.columnsConstruct();
    this.search();
  }

  search() {
    this.showArchive? this.getArchiveErrors(): this.getNotArchiveErrors();
  }

  getArchiveErrors(): void {
    this.errorsServise.getArchiveErrors().subscribe({
      next: (error) => {
        this.results = error;
      }, error: (e) => console.error(e)
    });
  }

  getNotArchiveErrors(): void {
    this.errorsServise.getNotArchiveErrors().subscribe({
      next: (error) => {
        this.results = error;
      }, error: (e) => console.error(e)
    });
  }

  getAllErrors(): void {
    this.errorsServise.getAllErrors().subscribe({
      next: (error) => {
        this.results = error;
      }, error: (e) => console.error(e)
    });
  }

  setErrorProcessed() {
    this.errorsServise.setSelectedRowsProcessed(this.selectedRows).subscribe({
      next: () => {
        console.log("Позиции переведены в архив");
        this.selectedRows = [];
        this.search();
      }, error: (e) => console.error(e)
    });
  }

  selectAll() {
    this.selectedRows = this.results;
  }

  deselect() {
    this.selectedRows = [];
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
