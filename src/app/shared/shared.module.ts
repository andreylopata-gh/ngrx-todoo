import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LaddaModule } from 'angular2-ladda';
import { NgxMaskModule } from 'ngx-mask';

import { CSelectComponent } from './c-select/c-select.component';

@NgModule({
	imports: [
		CommonModule,
		HttpModule,
		LaddaModule.forRoot({
			style: 'expand-left',
			spinnerSize: 20,
			spinnerColor: '#e20f00',
			spinnerLines: 12,
		}),
		NgxMaskModule,
	],
	declarations: [
		CSelectComponent,
	],
	exports: [
		CommonModule,
		FormsModule,
		HttpModule,
		LaddaModule,
		NgxMaskModule,
		CSelectComponent,
	],
})
export class SharedModule {
}
