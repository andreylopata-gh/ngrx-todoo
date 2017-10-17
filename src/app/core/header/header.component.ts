import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthActions } from '../../auth';
import { IAppState, ROOT_AUTH_SELECTORS } from '../../store';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	isLoading: boolean;
	err: any;
	currentUser: any = null;
	menu: any[];

	constructor(
		private store: Store<IAppState>,
		private authActions: AuthActions) {

		this.menu = [];

		store.select(ROOT_AUTH_SELECTORS.currentUser).subscribe((user: any) => {
			this.currentUser = user;
		});

		store.select(ROOT_AUTH_SELECTORS.error).subscribe((err: any) => {
			this.err = err;
		});
		store.select(ROOT_AUTH_SELECTORS.isLoading).subscribe((isLoading: boolean) => {
			this.isLoading = isLoading;
		});
	}

	ngOnInit(): void {}

}
