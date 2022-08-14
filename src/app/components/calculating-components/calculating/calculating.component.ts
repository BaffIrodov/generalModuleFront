import { Component, OnInit } from '@angular/core';
import {CalculatingService} from "../../../services/calculating-services/calculating.service";
import {MapsCalculatingQueueResponse} from "../../../domain/calculating-domain/MapsCalculatingQueueResponse";

@Component({
  selector: 'app-calculating',
  templateUrl: './calculating.component.html',
  styleUrls: ['./calculating.component.css']
})
export class CalculatingComponent implements OnInit {

  actualResponse: MapsCalculatingQueueResponse = new MapsCalculatingQueueResponse();
  loading = false;

  constructor(private calculatingService: CalculatingService) { }

  ngOnInit(): void {
    this.getCurrentQueueSize();
  }

  async getCurrentQueueSize() {
    this.calculatingService.getCurrentQueueSize()
      .subscribe({
        next: (res) => {
          this.actualResponse = res;
        },
        error: (e) => console.error(e)
      });
  }

  async createQueue() {
    this.loading = true;
    this.calculatingService.createQueue()
      .subscribe({
        next: (res) => {
          this.actualResponse = res;
          this.getCurrentQueueSize();
          this.loading = false;
        },
        error: (e) => console.error(e)
      });
  }

  async debug() {
    this.loading = true;
    this.calculatingService.debug()
      .subscribe({
        next: (res) => {
          //this.actualResponse = res;
        },
        error: (e) => console.error(e)
      });
  }

}
