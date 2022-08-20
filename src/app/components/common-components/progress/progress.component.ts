import {Component, Input, OnInit} from '@angular/core';
import {ProgressService} from "../../../services/common-services/progress.service";

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  constructor(public progressService: ProgressService) {
  }

  @Input() moduleName: string;

  availableCount: Number;
  totalCount: Number;
  startTime: Number;

  predictableTime = "";

  ngOnInit(): void {
    if (this.progressService.mapComponentToTotal.get(this.moduleName) == undefined) {
      this.progressService.mapComponentToTotal.set(this.moduleName, 0);
    }
    if (this.progressService.mapComponentToStartTime.get(this.moduleName) == undefined) {
      this.progressService.mapComponentToStartTime.set(this.moduleName, new Date().getTime());
    }
    this.availableCount = this.progressService.mapComponentToAvailable.get(this.moduleName) || 0;
    this.totalCount = this.progressService.mapComponentToTotal.get(this.moduleName) || 0;
    this.startTime = this.progressService.mapComponentToStartTime.get(this.moduleName) || 0;
  }

  refresh() {
    this.availableCount = this.progressService.mapComponentToAvailable.get(this.moduleName) || 0;
    this.totalCount = this.progressService.mapComponentToTotal.get(this.moduleName) || 0;
  }

  getProgress() {
    if (this.totalCount != 0 && this.availableCount >= 0) {
      return (100 - 100 * (this.availableCount.valueOf() / this.totalCount.valueOf()))
        .toFixed(2);
    } else return null;
  }

  getPredictableTime() {
    if (this.availableCount && this.totalCount && this.startTime) {
      let result = ""
      let interval = setTimeout(() => {
        const finishedPart = 1 - (this.availableCount.valueOf() / this.totalCount.valueOf());
        const notFinishedPart = (this.availableCount.valueOf() / this.totalCount.valueOf());
        const timeToFinished = new Date().getTime() - this.startTime.valueOf();
        const predictableFullTime = timeToFinished / finishedPart;
        const timeLeft = predictableFullTime - timeToFinished;
        const predictableDate = new Date().getTime() + timeLeft;
        if (timeLeft != Infinity) {
          result = "Осталось времени: " +
            (timeLeft / 1000 / 60 / 60).toFixed(0) + ":" +
            (timeLeft / 1000 / 60 % 60).toFixed(0) + ":" +
            (timeLeft / 1000 % 60).toFixed(0)
        }
        console.log(result);
        console.log(this.progressService.mapComponentToLoading.get(this.moduleName));
        this.predictableTime = result;
        if(this.progressService.mapComponentToLoading.get(this.moduleName) != false) {
          this.getPredictableTime();
        }
        clearInterval(interval);
      }, 2000);
    } else this.predictableTime = "";


  }

}
