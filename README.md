# Oslo Bysykkel sykkeloversikt

## Run application locally

### Dependencies
Install yarn with the following command: `npm install --global yarn`

### Run application locally
`yarn start`
Open http://localhost:8080/ in browser

### Run tests
`yarn test`

## Run application on docker
1. Build docker image: `docker build . -t bysykkeloversikt`
2. Run docker image: `docker run -p 49160:8080 -d bysykkeloversikt`
3. Run and test application: Open http://localhost:49160/ in browser
