# ZeroNorth Front-End Coding challenge

This is the shell of a reactjs v18 app using Redux

To get started, you will need to fork the project, implement the functionality requested 
then submit a pull request

## Running the project

In the project directory, first run `npm install` to install all the react dependencies

Then you can start the project with `npm start
`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Assignment
This application is a mini-simulation of the functionality of the ZeroNorth solution.  
The end-goal is to complete the UI that is used to generate a voyage by progressively 
adding ports, calculate the total distance travled and plot the chosen ports on a map.

1) Use this project as a template to create a new repo in your own Github account
2) Create a new branch to do your work in
3) After completing these steps to your satisification, create a pull request and invite the ZeroNorth reviewers to review)



Specifically, we are looking for:


1) Use the following REST api to fetch the available ports.  [https://8u9tblsay0.execute-api.us-east-1.amazonaws.com/default/zn-frontend-challenge-port-service](https://8u9tblsay0.execute-api.us-east-1.amazonaws.com/default/zn-frontend-challenge-port-service)
   The API returns 10 ports at a time and takes one query parameter `offset` which indicates what offset to start from.  The
return data looks like:

    `{
        "total":405,  
        "offset":0,
        "data":[{"uncode":"ABCD","name":"Port of New York",lat:57.241,lng:23.511}]
      }`

2) Store the data in the ports redux store
3) Implement the following functionality in voyage-planner.tsx
   1) Populate the ports dropdown with the ports fetched in step #1 (feel free to use a typeahead search or other control if desired)
   2) Choose a port and click the "+" button to add it to the voyage
      1) Each port chosen should be added to the voyage redux store and reflected in the Voyage section.  You should create a new react class to hold the voyage port, and show the estimated time of arrival assuming the ship is leaving the first port immediately
      2) Once two or more ports are added, calculate the total distance travelled by the voyage.  You can assume direct travel (pretend the ship is a blimp)
      3) Add the port as a pin on the Google Map
4) Adjust the CSS as needed to make it look nice
5) Implement any test cases you feel are necessary
