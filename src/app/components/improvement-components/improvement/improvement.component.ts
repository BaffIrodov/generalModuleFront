import {Component, OnInit} from '@angular/core';
import {ImprovementRequest} from "../../../domain/improvement-domain/improvementRequest";
import {ImprovementService} from "../../../services/improvement-services/improvement.service";

@Component({
  selector: 'app-improvement',
  templateUrl: './improvement.component.html',
  styleUrls: ['./improvement.component.css']
})
export class ImprovementComponent implements OnInit {

  constructor(private improvementService: ImprovementService) { }

  request: ImprovementRequest = new ImprovementRequest();
  requestValidating: boolean = true;

  ngOnInit(): void {
  }

  async startImprovement() {
    this.improvementService.simpleImprovement(this.request)
      .subscribe({
        next: (res) => {
          console.log("simple improvement ready")
        },
        error: (e) => console.error(e)
      });
  }

  validatePercent() {
    this.requestValidating = this.request.testDatasetPercent < 100;
  }

}
