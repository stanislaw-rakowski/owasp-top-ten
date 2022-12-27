# OWASP Top 5

## Frontend development

Enter frontend app folder:

`cd frontend`

Create `.env` file at the root of directory and fill it with:

```
VITE_SERVER_URL=http://localhost:5000
```

Install the dependencies:

`npm i`

Start the app in dev mode:

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Backend development

Enter backend app folder:

`cd backend`

Create `.env` file at the root of directory and fill it with:

```
MYSQLDATABASE=
MYSQLHOST=
MYSQLPASSWORD=
MYSQLPORT=
MYSQLUSER=
MYSQL_URL=
```

Install the dependencies:

`npm i`

Spin up the Docker container in one terminal (or use detached mode providing `-d` flag):

`docker-compose up`

Start the app in dev mode in second terminal:

`npm run dev`

The server is running at [http://localhost:5000](http://localhost:5000)

After finishing decompose the docker container:

`docker-compose down`
