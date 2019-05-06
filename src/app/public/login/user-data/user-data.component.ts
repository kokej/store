import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-user-data',
    templateUrl: './user-data.component.html',
    styleUrls: [ './user-data.component.scss' ]
})
export class UserDataComponent {
    @Input() user;
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onLogoutUser: EventEmitter<any> = new EventEmitter();
    constructor() {}

    logoutUser() {
        this.onLogoutUser.emit();
    }
}
