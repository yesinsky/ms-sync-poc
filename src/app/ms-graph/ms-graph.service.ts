import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Client } from "@microsoft/microsoft-graph-client";
import { User } from "../domain/user";

@Injectable({
  providedIn: "root",
})
export class MsGraphService implements OnDestroy{

  private _graphClient: Client;

  constructor(private authService: AuthService) {
    this._graphClient = Client.init({
      authProvider: async (done) => {
        let token = await this.authService.getAccessToken().catch((reason) => {
          done(reason, null);
        });

        if (token) {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      },
    });
  }

  ngOnDestroy(): void {
    //yet empty
  }

  public async getContacts(): Promise<any> {
    if (!this.authService.isAuthorized) return null;

    let selfContacts = await this._graphClient.api("/me/contacts").get();

    return selfContacts;
  }

  public async getUser(): Promise<User> {
    if (!this.authService.isAuthorized) return null;

    let graphUser = await this._graphClient.api("/me").get();

    let user = new User();
    user.displayName = graphUser.displayName;
    user.email = graphUser.mail || graphUser.userPrincipalName;

    return user;
  }
}
