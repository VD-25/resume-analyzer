# Project Setup

### Cloning Repository
1. Clone the repository: `git clone https://github.com/VD-25/resume-analyzer.git`
2. Change directory with ```cd resume-analyzer```

### Setting Up Tokens & Keys:
1. Create a ```service-account.json``` file in folder ```\backend``` and paste the contents direct messaged via. Discord by PM: Dholakia, Vidhi.
2. Create a ```.env``` file in folder ```\backend``` and paste the contents direct messaged via. Discord by PM: Dholakia, Vidhi.

### Installing Dependencies with Scripts:
Step 1:
```bash
chmod a+x *.sh
```
Step 2:
```bash
./install.sh
```
-----
### Running Application:

Step 1: In Current Terminal
```bash
cd ./backend & npm start
```
Step 2: In New Terminal
```bash
cd resume-analyzer
cd ./frontend & npm start
```
Step 3: Press ```y``` and hit _Enter_ key when prompted: "Would you like to run the app on another port instead? » (Y/n)"

-----
### Running Tests:
```bash
./tests.sh
```

- You should be lead to the homepage. Sign up, log in, then navigate between endpoints.

