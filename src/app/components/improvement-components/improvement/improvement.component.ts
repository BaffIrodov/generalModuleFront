import {Component, OnInit} from '@angular/core';
import {ImprovementRequest} from "../../../domain/improvement-domain/improvementRequest";
import {ImprovementService} from "../../../services/improvement-services/improvement.service";
import {config} from "rxjs";
import {ConfigMapAsList} from "../../../domain/improvement-domain/configMapAsList";
import {PatternTemplateNumber} from "../../../domain/improvement-domain/patternTemplateNumber";
import {ImprovementResultsRequest} from "../../../domain/improvement-domain/improvementResultsRequest";

@Component({
  selector: 'app-improvement',
  templateUrl: './improvement.component.html',
  styleUrls: ['./improvement.component.css']
})
export class ImprovementComponent implements OnInit {

  constructor(private improvementService: ImprovementService) {
  }

  request: ImprovementRequest = new ImprovementRequest();
  requestValidating: boolean = true;
  config: Map<String, Object>;
  configMap: Map<String, Object> = new Map<String, Object>();
  configList: ConfigMapAsList[] = [];

  patternName: String;
  patternOldValue: number;
  patternTemplateNumber: PatternTemplateNumber = new PatternTemplateNumber();

  configChanged = false;

  numberInactivePercent: number;
  numberSimple: number;
  numberChangeConfig: number;
  numberPattern: number;

  cols: any[];
  configuration: any;
  results: any[];

  async ngOnInit() {
    this.columnsConstruct();
    await this.getImprovementResults();
  }

  async improvementInactivePercent() {
    this.improvementService.improvementInactivePercent(this.request)
      .subscribe({
        next: (res) => {
          console.log("improvement with inactive percent ready")
        },
        error: (e) => console.error(e)
      });
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

  async improvementWithConfigAndPattern() {
    this.saveConfig();
    this.improvementService.improvementWithConfigAndPattern(this.request, this.patternTemplateNumber)
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
      this.configMap.set(k, v);
      this.configList.push(item);
      index++;
    })
  }

  validatePercent(id: String) {
    switch (id) {
      case "number-inactive-percent":
        this.request.testDatasetPercent = this.numberInactivePercent;
        break;
      case "number-simple":
        this.request.testDatasetPercent = this.numberSimple;
        break;
      case "number-change-config":
        this.request.testDatasetPercent = this.numberChangeConfig;
        break;
      case "number-pattern":
        this.request.testDatasetPercent = this.numberPattern;
        break;
    }
    this.requestValidating = this.request.testDatasetPercent < 100;
  }

  validatePattern() {
    return (!!this.patternTemplateNumber.incrementStep &&
      !!this.patternTemplateNumber.highLimit &&
      !!this.patternTemplateNumber.lowLimit &&
      !!this.patternTemplateNumber.configPropertyName)
  }

  isNumberValue(value: any) {
    return !isNaN(Number.parseInt(value.toString()));
  }

  onRowClick(configPropertyName: string, value: any) {
    this.patternName = configPropertyName;
    this.patternOldValue = Number.parseFloat(value.toString());
    this.patternTemplateNumber.configPropertyName = configPropertyName;
  }

  async getImprovementResults() {
    this.improvementService.getImprovementResults()
      .subscribe({
        next: (res) => {
          this.results = res;
        },
        error: (e) => console.error(e)
      });
  }

  columnsConstruct() {
    this.cols = [
      {field: 'accuracy', header: 'Точность'},
      {field: 'current_epoch', header: 'Номер эпохи'},
      {field: 'right_count', header: 'Правильных ответов'},
      {field: 'all_count', header: 'Всего матчей'}
    ];
    this.configuration = {field: 'full_config', header: 'Конфигурация'};
  }

}
