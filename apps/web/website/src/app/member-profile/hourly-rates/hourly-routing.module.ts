import { HourlyRatesComponent } from './hourly-rates/hourly-rates.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: "",
        component: HourlyRatesComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class HourlyRatesRoutingModule {

}