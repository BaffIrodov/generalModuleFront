import {Component, Input, OnInit} from '@angular/core';
import {ProgressService} from "../../../services/common-services/progress.service";

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  constructor(public progressService: ProgressService) { }

  @Input() moduleName: string;

  availableCount: Number;
  totalCount: Number;

  ngOnInit(): void {
    if (this.progressService.mapComponentToTotal.get(this.moduleName) == undefined) {
      this.progressService.mapComponentToTotal.set(this.moduleName, 0);
    }
    this.availableCount = this.progressService.mapComponentToAvailable.get(this.moduleName) || 0;
    this.totalCount = this.progressService.mapComponentToTotal.get(this.moduleName) || -1;
  }

  refresh() {
    this.availableCount = this.progressService.mapComponentToAvailable.get(this.moduleName) || 0;
    this.totalCount = this.progressService.mapComponentToTotal.get(this.moduleName) || -1;
  }

  getProgress() {
    if (this.totalCount && this.availableCount) {
      return (100 - 100*(this.availableCount.valueOf() / this.totalCount.valueOf())).toFixed(2);
    } else return null;
  }

}
