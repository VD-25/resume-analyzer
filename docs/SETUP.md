# Project Setup

## Installation and dependencies

- Clone the repo: `git clone https://github.com/VD-25/resume-analyzer.git`
- Install dependencies:
```bash
cd backend
npm install
cd ../frontend
npm install
```
- create a .env file in both frontend and backend with JWT_SECRET="tokenHere" where tokenHere is your JWT token.
- Run backend application by opeing a new terminal then type: `cd backend && node index.js`. After that, type "y" on keyboard and hit Enter.
- Run frontend application by opening a terminal then type: `cd frontend && npm start`.
- You should be lead to the homepage. Sign up, log in, then navigate between endpoints.


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
