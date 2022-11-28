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

  testDataPercent: number;
  testDataCount: number;
  inactiveRepeatNumber: number;

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

  async improvementShuffling() {
    this.improvementService.improvementShuffling(this.request)
      .subscribe({
        next: (res) => {
          console.log("improvement shuffling ready")
        },
        error: (e) => console.error(e)
      });
  }

  async improvementConsensus() {
    this.improvementService.improvementConsensus(this.request)
      .subscribe({
        next: (res) => {
          console.log("improvement consensus ready")
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

  validatePercent() {
    this.request.testDatasetPercent = this.testDataPercent;
    this.requestValidating = this.request.testDatasetPercent < 100;
  }

  validateCount() {
    this.request.testDatasetCount = this.testDataCount;
    this.requestValidating = this.request.testDatasetCount <= 1000;
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
