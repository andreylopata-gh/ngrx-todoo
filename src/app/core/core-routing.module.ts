import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../auth/auth.guard';

export const APP_ROUTES: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(APP_ROUTES),
	],
	exports: [RouterModule],
})
export class CoreRoutingModule {
}
