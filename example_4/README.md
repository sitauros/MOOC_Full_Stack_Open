# Render Project

**Frontend folder:** /frontend 
**Backend folder:** /backend

## Installation
1) Place frontend and backend in same directory or alter `package.json` script paths for `build:ui` and `deploy:full`
2) Run `npm install` for both directories to install modules
3) Host your Render project as a `Web Service` and setup Git repository in `/frontend` (see course instructions below)
4) Set command prompt to use Bash as default shell:  
`npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe" `
Delete current script-shell setting:  
`npm config delete script-shell`  
View current script-shell setting:  
`npm config get script-shell`
5) Run `/frontend` script commands in command prompt:  
   * Create production build only: `npm run build:ui`
   * Create production build + deploy to Render: `npm run deploy:full`

## Links
* Link to course instructions: [Part 3b](https://fullstackopen.com/en/part3/deploying_app_to_internet#streamlining-deploying-of-the-frontend)
* Some [notes](https://stackoverflow.com/questions/23243353/how-to-set-shell-for-npm-run-scripts-in-windows/46006249#46006249) on using npm config above
  * Directory path to Git Bash may not be in (x86) folder