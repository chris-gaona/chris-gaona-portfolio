#chris-gaona-portfolio
Chris Gaona Portfolio for Techdegree & Treehouse - Capstone Project

##Instructions
Run `git clone https://github.com/chris-gaona/chris-gaona-portfolio.git`.

Then...
`cd chris-gaona-portfolio`

and then...
`npm install` to install all dependencies

Once that's complete you can run `npm start` to start the server and navigate to your browser of choice and go to localhost:3000.

In order to seed the database you can simply uncomment `require('./config/seed.js');` in the src/app.js file.

Although there are quite a few build commands you could run to build pieces of the dist directory, the only one you need to run is `npm run build`, or you could run `npm run build:dev` to build the dist directory with mocha/chai tests and jshint checks.

Run `npm start:dev` to start the server with nodemon for development

Or you could run `npm run watch` - my favorite - to start the server with nodemon and watch for file changes to run the various npm build scripts without having to do a thing.
