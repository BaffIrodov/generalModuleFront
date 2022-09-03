import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResultsComponent} from "./components/parsing-components/results/results.component";
import {StatsComponent} from "./components/parsing-components/stats/stats.component";
import {MatchesComponent} from "./components/parsing-components/matches/matches.component";
import {DebugComponent} from "./components/common-components/debug/debug.component";
import {ErrorsComponent} from "./components/common-components/errors/errors.component";
import {CalculatingComponent} from "./components/calculating-components/calculating/calculating.component";
import {ImprovementComponent} from "./components/improvement-components/improvement/improvement.component";

const routes: Routes = [
  { path: '', redirectTo: 'results', pathMatch: 'full' },
  { path: 'results', component: ResultsComponent},
  { path: 'stats', component: StatsComponent},
  { path: 'matches', component: MatchesComponent},
  { path: 'debug', component: DebugComponent},
  { path: 'errors', component: ErrorsComponent},
  { path: 'calculating', component: CalculatingComponent},
  { path: 'improvement', component: ImprovementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
