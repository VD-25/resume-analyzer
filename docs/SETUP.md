# Project Setup

## Installation and Dependencies

<<<<<<< HEAD
- Clone the repo: `git clone https://github.com/VD-25/resume-analyzer.git`

1. Create a ```service-account.json``` file in folder ```\backend``` and paste the contents direct messaged via. Discord by PM: Dholakia, Vidhi2
2. Create a ```.env``` file in folder ```\backend``` containing: ```JWT_SECRET="tokenHere"```, tokenHere is your private JWT token direct messaged via. Discord by PM: Dholakia, Vidhi.
3. On a new line in the newly created ```.env```, paste the following content: ```GOOGLE_APPLICATION_CREDENTIALS=./service-account.json```

- Scripts

```bash
chmod a+x *.sh
```

- Install dependencies:
```bash
./install.sh
```

- Run tests:
```bash
./tests.sh
```

- Run app:
```bash
cd ./backend & npm start
# in new terminal
cd ./frontend & npm start
```
- You should be lead to the homepage. Sign up, log in, then navigate between endpoints.
