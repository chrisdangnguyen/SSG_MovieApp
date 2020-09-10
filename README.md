# SSG_MovieApp

Before starting the app in your local environment: 
* Navigate to key.js file (./src/key.js) 
* Insert your own or a provided API key and access token in its corresponding 
  variables within the quotes
* Default List ID is provided, but can be replaced with an available LIST ID

Ex. (key.js file)
```javascript
export const API_KEY = "INSERT_API_KEY" //--> export const API_KEY = "XXXXXXXX"
export const ACCESS_TOKEN = "INSERT_ACCESS_TOKEN" //--> export const ACCESS_TOKEN = "XXXXXXXX"
export const LIST_ID = "7058012" //--> export const LIST_ID = "XXXXXXXX"
```

In the project directory, you can run:

###  `npm install` 

This will download all dependencies in the package.json file and generate a 
node_modules folder.

### `npm start`

* Open and view the movie application in [http://localhost:3000](http://localhost:3000) 

## Technologies
* React
* CSS
* Bootstrap
* Axios

## Features
* User can search for movies by typing an input
  * Selecting the specific movie from the search dropdown will return just that movie
  * Enter or click search will retrieve all movies related to the input
* User can view their movie list 
* User can mark and unmark movies from their movie list 

