import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  constructor(private http: HttpClient) {
  }

  //Проверка состояния микросервисов
  isParserServiceEnable(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/debug/enabled');
  }
  isCalculatingServiceEnable(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8081/debug/enabled');
  }
  isImprovementServiceEnable(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8082/debug/enabled');
  }
  isTelegramBotEnable(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8083/debug/enabled');
  }

  //Проверка и дебаг таблицы errors
  isErrorsTableExist(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/debug/errors-exist');
  }
  createErrorsTable(): Observable<void> {
    return this.http.get<void>('http://localhost:8080/debug/create-errors');
  }

  //Проверка и дебаг таблицы matches_link
  isMatchesLinkTableExist(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/debug/matches-link-exist');
  }
  createMatchesLinkTable(): Observable<void> {
    return this.http.get<void>('http://localhost:8080/debug/create-matches-link');
  }

  //Проверка и дебаг таблицы bet_condition
  isBetConditionTableExist(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/debug/bet-condition-exist');
  }
  createBetConditionTable(): Observable<void> {
    return this.http.get<void>('http://localhost:8080/debug/create-bet-condition');
  }

  //Проверка и дебаг таблицы player_on_map_results
  isPlayerOnMapResultsTableExist(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/debug/player-on-map-results-exist');
  }
  isPlayerOnMapResultsTableFilled(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/debug/player-on-map-results-filled');
  }
  createPlayerOnMapResultsTable(): Observable<void> {
    return this.http.get<void>('http://localhost:8080/debug/create-player-on-map-results');
  }

  //Проверка и дебаг таблицы results_link
  isResultsLinkTableExist(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/debug/results-link-exist');
  }
  isResultsLinkTableFilled(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/debug/results-link-filled');
  }
  createResultsLinkTable(): Observable<void> {
    return this.http.get<void>('http://localhost:8080/debug/create-results-link');
  }

  //Проверка и дебаг таблицы round_history
  isRoundHistoryTableExist(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/debug/round-history-exist');
  }
  isRoundHistoryTableFilled(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/debug/round-history-filled');
  }
  createRoundHistoryTable(): Observable<void> {
    return this.http.get<void>('http://localhost:8080/debug/create-round-history');
  }

  //Проверка и дебаг таблицы stats_response
  isStatsResponseTableExist(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/debug/stats-response-exist');
  }
  createStatsResponseTable(): Observable<void> {
    return this.http.get<void>('http://localhost:8080/debug/create-stats-response');
  }

  //Проверка и дебаг таблицы improvement_results
  isImprovementResultsTableExist(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8081/debug/improvement-results-exist');
  }
  createImprovementResultsTable(): Observable<void> {
    return this.http.get<void>('http://localhost:8081/debug/create-improvement-results');
  }

  //Проверка и дебаг таблицы maps_calculating_queue
  isMapsCalculatingQueueTableExist(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8081/debug/maps-calculating-queue-exist');
  }
  isMapsCalculatingQueueTableFilled(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8081/debug/maps-calculating-queue-filled');
  }
  createMapsCalculatingQueueTable(): Observable<void> {
    return this.http.get<void>('http://localhost:8081/debug/create-maps-calculating-queue');
  }

  //Проверка и дебаг таблицы player_force
  isPlayerForceTableExist(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8081/debug/player-force-exist');
  }
  isPlayerForceTableFilled(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8081/debug/player-force-filled');
  }
  createPlayerForceTable(): Observable<void> {
    return this.http.get<void>('http://localhost:8081/debug/create-player-force');
  }

}
