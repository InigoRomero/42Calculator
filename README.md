# calculatorReact&Node
calculator where you can only access if you are 42, because we are cool
# USAGE

```shell
cd calculator
mv server/envEXAMPLE server/.env
Fill .env with your SERECRET and UID
Docker-compose build
Docker-compose up
docker-compose exec client  npm install axios
docker-compose exec client  npm install react-json-view
docker-compose exec server  npm install express
docker-compose exec server  npm install express-session
docker-compose exec server  npm install dotenv
reaload One file to auto Save de container
```
Then open http://localhost:3000 :)
# web Flow
### Login
![Login](https://github.com/InigoRomero/calculatorReact/blob/main/captures/Login.png)
### Auth
![auth](https://github.com/InigoRomero/calculatorReact/blob/main/captures/auth.png)
### Loading
![Loading](https://github.com/InigoRomero/calculatorReact/blob/main/captures/loading.png)
### Home
![home](https://github.com/InigoRomero/calculatorReact/blob/main/captures/home.png)


Steps to follow if I had more time:
### To DO

- [ ] Create sessions
- [ ] add more function to calculator
- [ ] Get better loading and calculator style
- [ ] get the user of 42 info in DB and not in json
- [ ] Clean and organizate better de code
# DOC
- https://medium.com/@nitinpatel_20236/how-to-build-a-simple-calculator-application-with-react-js-bc10a4568bbd
- https://www.digitalocean.com/community/tutorials/react-axios-react-es
- https://medium.com/@nitinpatel_20236/how-to-build-a-simple-calculator-application-with-react-js-bc10a4568bbd
- https://github.com/ebouther/NodeJs-API-42-Exemple
- https://www.npmjs.com/package/client-oauth2
- https://www.cloudbees.com/blog/using-docker-compose-for-nodejs-development/
