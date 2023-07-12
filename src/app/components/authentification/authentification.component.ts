import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthentificationComponent implements OnInit {
  showDefaultComponent: number;
  showLoading: boolean;
  accountCreated: boolean;
  constructor() {
    this.showDefaultComponent = 1;
    this.showLoading = false;
    this.accountCreated = false;
  }

  ngOnInit(): void {

  }

  getValueFromChild(val: number) {
    this.showDefaultComponent = val;
  }

  shouldLoade(val: boolean) {
    this.showLoading = val;
  }

  accountCreatedEvent(val: boolean) {
    this.accountCreated = val;
  }
}
