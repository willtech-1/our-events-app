## How to use the app?
**Signup and Signin**
* In order for user to use the application, user need to signup first and then sign in with the same credentials, 
and then that user will be registered as a normal user by default not admin
* In order for user to be admin, user role need to be 1, so when user signup his/her role is 0 by default;
Registered Admin credentials are Email: jason@gmail.com, Password:j123

## The App
**Registered User**
* Normal registered user will be redirected to the dashboard after signing in and their routes are protected, they can see
all the upcoming events details, most popular events, they can search for events and all select events they want to see based their choice
and also buy event

**Admin**
* Admin user can create, read, update and delete an event. Their routes are also protected as well, admin is also able to create
delete categories as well. Registered Admin credentials are Email: jason@gmail.com, Password:j123

## Project installation
**Backend**
1. Open your terminal (Ctrl+Shift+`) 
2. Then change your directory to the backend folder type cd backend or drag and drop backend folder on the terminal
```bash
cd backend
```
3. To check whether you are at the right directory type ls on your terminal and you will get list of your files in that directory
4. Then type npm install on your terminal to install node_modules for all the dev dependencies for the backend of the project
```bash
npm install
```
5. Then type npm start to start your backend development server of the application, it will run on http://localhost:8080
```bash
npm start
```

**Frontend**
1. Navigate to your terminal or (Ctrl+shitft+`)
2. Then change your directory to the backend folder cd backend and then change it to the frontend folder cd frontend or drag and drop frontend folder on the terminal
```bash
cd backend/frontend
```
3. To check whether you are at the right directory type ls on your terminal and you will get list of your files in that directory
4. Then type npm install on your terminal to install node_modules for all the dev dependencies for the frontend of the project
```bash
npm install
```
5. Then type npm start to start your frontend development of the application, it will open your browser on http://localhost:3080
```bash
npm start
```


## Application Security
Helmet module is utilized for well-known web vulnerabilities to set up various HTTP headers to prevent attacks like Cross-Site-Scripting(XSS)

## 🌱 Credit
Hyperion Dev https://hyperiondev.com

Where application has been deployed
I deployed this application both frontend and backend on Heroku because it is easier to deploy mern stack application on the platform
at it is also easy to deploy an application that has API keys on their cloud platform.

Deployed App Link
()
