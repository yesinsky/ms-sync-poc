import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { OAuthSettings } from './auth-settings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthorized: boolean;
  public user: any;

  constructor(private msalService: MsalService) {
    this.isAuthorized = false;
    this.user = null;
   }

  async signIn(): Promise<boolean> {
    let result = await
      this.msalService.loginPopup(OAuthSettings)
      .catch((reason) => {
        console.log('Login failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.isAuthorized = true;
      return true;
    }
  }

  signOut(): void {
    //TODO: Not implemented
    this.user = null;
    this.isAuthorized = false;
  }

  async getAccessToken(): Promise<string> {
    let result = await
      this.msalService
      .acquireTokenSilent(OAuthSettings)
      .catch((reason) => {
        console.log('Get token failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      console.log('Token acquired', result.accessToken);
      return result.accessToken;
    }
    return null;
  }

}
