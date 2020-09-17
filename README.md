This is a sample project to test Angular SPA app and MS Graph API to retrieve contact information (phone numbers) of logged user. It has two sample buttons: 'Login' and 'Load Data'. At first, the user needs to click the 'Login' button and fill credentials from the desired Azure Active Directory tenant into the dialog box. After authorization, the user can click the 'Load data' button that will load business phone numbers of Outlook (MS Exchange Online) contacts.

The app uses 'msal' + '@azure/msal-angular' libs for auth and '@microsoft/microsoft-graph-client' lib for Graph interaction.

Also it uses '@microsoft/microsoft-graph-types' types.

The app was created using 'ng generate application' bootstrapper.

Instructions to run the app:
1. Install Angular-CLI globally.
2. Clone the project repo at a local folder.
3. Run 'npm install' in the project folder.
4. Run 'ng build'.
5. Run 'ng serve'.