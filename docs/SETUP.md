# Project Setup
## Installation and Dependencies
- Clone the repository: `git clone https://github.com/VD-25/resume-analyzer.git`
- In ```resume-analyzer``` project, install dependencies:
```
cd backend
npm install
cd ../frontend
npm install
```
1. Create a ```service-account.json``` file in folder ```\backend``` and paste the contents direct messaged via. Discord by PM: Dholakia, Vidhi2
1. Create a ```service-account.json``` file in folder ```\backend``` and paste the contents direct messaged via. Discord by PM: Dholakia, Vidhi.
2. Create a ```.env``` file in folder ```\backend``` containing: ```JWT_SECRET="tokenHere"```, tokenHere is your private JWT token direct messaged via. Discord by PM: Dholakia, Vidhi.
3. On a new line in the newly created ```.env```, paste the following content: ```GOOGLE_APPLICATION_CREDENTIALS=./service-account.json```
4. Run backend application by opening a new terminal then type: `cd backend && node index.js`
5. Run frontend application by opening a terminal then type: `cd frontend && npm start`. After that, type "y" on keyboard and hit Enter.
6. You will be greeted by our visual landing page, prompting you to 'Get Started'
7. After successfully signing up, you can log in and move between endpoints.
## How to Test
### Frontend (*Components*)
```bash
cd frontend
npm test
```
### Backend
```bash
cd backend
npm test
```