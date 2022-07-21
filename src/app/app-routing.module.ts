import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResultsComponent} from "./components/results/results.component";
import {StatsComponent} from "./components/stats/stats.component";
import {MatchesComponent} from "./components/matches/matches.component";
import {DebugComponent} from "./components/debug/debug.component";

const routes: Routes = [
  { path: '', redirectTo: 'results', pathMatch: 'full' },
  { path: 'results', component: ResultsComponent},
  { path: 'stats', component: StatsComponent},
  { path: 'matches', component: MatchesComponent},
  { path: 'debug', component: DebugComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
