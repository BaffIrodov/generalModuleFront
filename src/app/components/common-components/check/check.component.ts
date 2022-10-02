import { Component, OnInit } from '@angular/core';
import {CheckService} from "../../../services/common-services/check.service";
import {CalculatingService} from "../../../services/calculating-services/calculating.service";

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  isParserEnable: boolean;
  isCalculatingEnable: boolean;
  isImprovementEnable: boolean;

  isErrorsTableExist: boolean;

  isMatchesLinkTableExist: boolean;

  isPlayerOnMapResultsTableExist: boolean;
  isPlayerOnMapResultsTableFilled: boolean;

  isResultsLinkTableExist: boolean;
  isResultsLinkTableFilled: boolean;

  isRoundHistoryTableExist: boolean;
  isRoundHistoryTableFilled: boolean;

  isStatsResponseTableExist: boolean;

  isImprovementResultsTableExist: boolean;

  isMapsCalculatingQueueTableExist: boolean;
  isMapsCalculatingQueueTableFilled: boolean;

  isPlayerForceTableExist: boolean;
  isPlayerForceTableFilled: boolean;


  constructor(private checkService: CheckService,
              private calculatingService: CalculatingService) { }

  ngOnInit(): void {
    this.getEnabledServices();
    // таблицы parsing
    this.checkTableErrors();
    this.checkTableMatchesLink();
    this.checkTablePlayerOnMapResults();
    this.checkTableResultsLink();
    this.checkTableRoundHistory();
    this.checkTableStatsResponse();
    //

    // таблицы calculating
    this.checkTableImprovementResults();
    this.checkTableMapsCalculatingQueue();
    this.checkTablePlayerForce();
    //

    // таблицы improvement
    //
  }

  async getEnabledServices() {
    this.checkService.isParserServiceEnable()
      .subscribe({
        next: (res) => {
          this.isParserEnable = res;
        },
        error: (e) => console.error(e)
      });
    this.checkService.isCalculatingServiceEnable()
      .subscribe({
        next: (res) => {
          this.isCalculatingEnable = res;
        },
        error: (e) => console.error(e)
      });
    this.checkService.isImprovementServiceEnable()
      .subscribe({
        next: (res) => {
          this.isImprovementEnable = res;
        },
        error: (e) => console.error(e)
      });
  }

  checkTableErrors() {
    this.checkService.isErrorsTableExist()
      .subscribe({
        next: (res) => {
          this.isErrorsTableExist = res;
        },
        error: (e) => console.error(e)
      });
  }

  createTableErrors() {
    this.checkService.createErrorsTable()
      .subscribe({
        next: (res) => {
          console.log("Errors table created");
          this.checkTableErrors();
        },
        error: (e) => console.error(e)
      });
  }

  checkTableMatchesLink() {
    this.checkService.isMatchesLinkTableExist()
      .subscribe({
        next: (res) => {
          this.isMatchesLinkTableExist = res;
        },
        error: (e) => console.error(e)
      });
  }

  createTableMatchesLink() {
    this.checkService.createMatchesLinkTable()
      .subscribe({
        next: (res) => {
          console.log("Matches link table created");
          this.checkTableMatchesLink();
        },
        error: (e) => console.error(e)
      });
  }

  checkTablePlayerOnMapResults() {
    this.checkService.isPlayerOnMapResultsTableExist()
      .subscribe({
        next: (res) => {
          this.isPlayerOnMapResultsTableExist = res;
        },
        error: (e) => console.error(e)
      });
    this.checkService.isPlayerOnMapResultsTableFilled()
      .subscribe({
        next: (res) => {
          this.isPlayerOnMapResultsTableFilled = res;
        },
        error: (e) => console.error(e)
      });
  }

  createTablePlayerOnMapResults() {
    this.checkService.createPlayerOnMapResultsTable()
      .subscribe({
        next: (res) => {
          console.log("Player on map results table created");
          this.checkTablePlayerOnMapResults();
        },
        error: (e) => console.error(e)
      });
  }

  checkTableResultsLink() {
    this.checkService.isResultsLinkTableExist()
      .subscribe({
        next: (res) => {
          this.isResultsLinkTableExist = res;
        },
        error: (e) => console.error(e)
      });
    this.checkService.isResultsLinkTableFilled()
      .subscribe({
        next: (res) => {
          this.isResultsLinkTableFilled = res;
        },
        error: (e) => console.error(e)
      });
  }

  createTableResultsLink() {
    this.checkService.createResultsLinkTable()
      .subscribe({
        next: (res) => {
          console.log("ResultsLink table created");
          this.checkTableResultsLink();
        },
        error: (e) => console.error(e)
      });
  }

  checkTableRoundHistory() {
    this.checkService.isRoundHistoryTableExist()
      .subscribe({
        next: (res) => {
          this.isRoundHistoryTableExist = res;
        },
        error: (e) => console.error(e)
      });
    this.checkService.isRoundHistoryTableFilled()
      .subscribe({
        next: (res) => {
          this.isRoundHistoryTableFilled = res;
        },
        error: (e) => console.error(e)
      });
  }

  createTableRoundHistory() {
    this.checkService.createRoundHistoryTable()
      .subscribe({
        next: (res) => {
          console.log("Round history table created");
          this.checkTableRoundHistory();
        },
        error: (e) => console.error(e)
      });
  }

  checkTableStatsResponse() {
    this.checkService.isStatsResponseTableExist()
      .subscribe({
        next: (res) => {
          this.isStatsResponseTableExist = res;
        },
        error: (e) => console.error(e)
      });
  }

  createTableStatsResponse() {
    this.checkService.createStatsResponseTable()
      .subscribe({
        next: (res) => {
          console.log("Stats response table created");
          this.checkTableStatsResponse();
        },
        error: (e) => console.error(e)
      });
  }

  checkTableImprovementResults() {
    this.checkService.isImprovementResultsTableExist()
      .subscribe({
        next: (res) => {
          this.isImprovementResultsTableExist = res;
        },
        error: (e) => console.error(e)
      });
  }

  createTableImprovementResults() {
    this.checkService.createImprovementResultsTable()
      .subscribe({
        next: (res) => {
          console.log("Improvement results table created");
          this.checkTableImprovementResults();
        },
        error: (e) => console.error(e)
      });
  }

  checkTableMapsCalculatingQueue() {
    this.checkService.isMapsCalculatingQueueTableExist()
      .subscribe({
        next: (res) => {
          this.isMapsCalculatingQueueTableExist = res;
        },
        error: (e) => console.error(e)
      });
    this.checkService.isMapsCalculatingQueueTableFilled()
      .subscribe({
        next: (res) => {
          this.isMapsCalculatingQueueTableFilled = res;
        },
        error: (e) => console.error(e)
      });
  }

  createTableMapsCalculatingQueue() {
    this.checkService.createMapsCalculatingQueueTable()
      .subscribe({
        next: (res) => {
          console.log("Maps calculating queue table created");
          this.checkTableMapsCalculatingQueue();
        },
        error: (e) => console.error(e)
      });
  }

  async initMapsCalculatingQueueTable() {
    this.calculatingService.createQueue()
      .subscribe({
        next: (res) => {
          this.checkTableMapsCalculatingQueue()
        },
        error: (e) => console.error(e)
      });
  }

  checkTablePlayerForce() {
    this.checkService.isPlayerForceTableExist()
      .subscribe({
        next: (res) => {
          this.isPlayerForceTableExist = res;
        },
        error: (e) => console.error(e)
      });
    this.checkService.isPlayerForceTableFilled()
      .subscribe({
        next: (res) => {
          this.isPlayerForceTableFilled = res;
        },
        error: (e) => console.error(e)
      });
  }

  createTablePlayerForce() {
    this.checkService.createPlayerForceTable()
      .subscribe({
        next: (res) => {
          console.log("Player force table created");
          this.checkTablePlayerForce();
        },
        error: (e) => console.error(e)
      });
  }

  async initPlayerForceTable() {
    this.calculatingService.createPlayerForceTable()
      .subscribe({
        next: (res) => {
          console.log("playerForce таблица создана");
          this.checkTablePlayerForce();
        },
        error: (e) => console.error(e)
      });
  }
}
