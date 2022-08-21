import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {ConfirmationService} from 'primeng/api';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {BlockUIModule} from 'primeng/blockui';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PickListModule} from 'primeng/picklist';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SliderModule} from 'primeng/slider';
import {SpinnerModule} from 'primeng/spinner';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeTableModule} from 'primeng/treetable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultsComponent } from './components/parsing-components/results/results.component';
import { ResultComponent } from './components/parsing-components/result/result.component';
import { StatsComponent } from './components/parsing-components/stats/stats.component';
import { MatchesComponent } from './components/parsing-components/matches/matches.component';
import { DebugComponent } from './components/common-components/debug/debug.component';
import { ErrorsComponent } from './components/common-components/errors/errors.component';
import { CalculatingComponent } from './components/calculating-components/calculating/calculating.component';
import { ProgressComponent } from './components/common-components/progress/progress.component';
import {SplitterModule} from "primeng/splitter";

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    ResultComponent,
    StatsComponent,
    MatchesComponent,
    DebugComponent,
    ErrorsComponent,
    CalculatingComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    DropdownModule,
    SplitButtonModule,
    CheckboxModule,
    PanelModule,
    ScrollPanelModule,
    DialogModule,
    FileUploadModule,
    TooltipModule,
    SpinnerModule,
    InputMaskModule,
    InputSwitchModule,
    DataViewModule,
    TabViewModule,
    KeyFilterModule,
    MessagesModule,
    MessageModule,
    FieldsetModule,
    TreeTableModule,
    MultiSelectModule,
    PickListModule,
    MenubarModule,
    DataViewModule,
    MenuModule,
    RadioButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
    OverlayPanelModule,
    TieredMenuModule,
    ProgressSpinnerModule,
    BlockUIModule,
    AutoCompleteModule,
    ToastModule,
    OrganizationChartModule,
    ToggleButtonModule,
    ScrollPanelModule,
    SidebarModule,
    ColorPickerModule,
    SelectButtonModule,
    SliderModule,
    SplitterModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
