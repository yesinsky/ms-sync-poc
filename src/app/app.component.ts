import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MsGraphService } from './ms-graph/ms-graph.service';
import { Contact, ResponseStatus } from "@microsoft/microsoft-graph-types";
import { map } from "rxjs/operators";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'ms-sync-poc';
  content: string = null;
  status: boolean;

  constructor(
    private authService: AuthService,
    private graphService: MsGraphService) {

    this.status = this.authService.isAuthorized;
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  async performLogin() {
    this.status = await this.authService.signIn();
  }

  async performBusinessAction() {
    if (!!this.authService.isAuthorized) {
      let contactsRaw = await this.graphService.getContacts();
      let contacts: [Contact] = contactsRaw.value;
      this.content = JSON.stringify(contacts.map((val,ind) => val.businessPhones));
      console.log(contacts);
    } else {
      alert("Unauthorized");
    }
  }
}

