import {Component, OnInit} from '@angular/core';
import {ImprovementRequest} from "../../../domain/improvement-domain/improvementRequest";
import {ImprovementService} from "../../../services/improvement-services/improvement.service";
import {config} from "rxjs";
import {ConfigMapAsList} from "../../../domain/improvement-domain/configMapAsList";

@Component({
  selector: 'app-improvement',
  templateUrl: './improvement.component.html',
  styleUrls: ['./improvement.component.css']
})
export class ImprovementComponent implements OnInit {

  constructor(private improvementService: ImprovementService) { }

  request: ImprovementRequest = new ImprovementRequest();
  requestValidating: boolean = true;
  config: Map<String, Object>;
  configList: ConfigMapAsList[] = [];

  configChanged = false;

  ngOnInit(): void {
  }

  async improvementNoConfig() {
    this.improvementService.improvementNoConfig(this.request)
      .subscribe({
        next: (res) => {
          console.log("improvement no config ready")
        },
        error: (e) => console.error(e)
      });
  }

  async improvementWithConfig() {
    this.improvementService.improvementWithConfig(this.request)
      .subscribe({
        next: (res) => {
          console.log("improvement with config ready")
        },
        error: (e) => console.error(e)
      });
  }

  async getConfig() {
    this.improvementService.getConfig()
      .subscribe({
        next: (res) => {
          this.config = res;
          this.convertConfigToList(res)
        },
        error: (e) => console.error(e)
      });
  }

  saveConfig() {
    this.request.configList = this.configList;
    this.configChanged = false;
  }

  convertConfigToList(config: Object) {
    const propertyNames = Object.getOwnPropertyNames(config);
    const propertyValues = Object.values(config);
    let index = 0;
    propertyNames.forEach(k => {
      let v = propertyValues[index];
      let item = new ConfigMapAsList();
      item.name = k;
      item.value = v;
      this.configList.push(item);
      index++;
    })
  }

  validatePercent() {
    this.requestValidating = this.request.testDatasetPercent < 100;
  }

}
