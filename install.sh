cd ./backend
npm install
echo RUNNING BACKEND UNIT TESTS------------------------------------
npm test
cd ..frontend
npm install
echo RUNNING FRONTEND UNIT TESTS-----------------------------------
npm test
cd ../backend
npm start # starts backend nodejs
