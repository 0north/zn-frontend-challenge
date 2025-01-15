# ZeroNorth Front-End Coding challenge

This is the shell of a reactjs v18 app build with vite.

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
adding ports, calculate the total distance traveled and plot the chosen ports on a map.

1. Use this project as a template to create a new repo in your own Github account
2. Create a new branch to do your work in
3. After completing these steps to your satisfication, create a pull request and invite the ZeroNorth reviewers to review)

Specifically, we are looking for:

1. Use the following REST api to fetch the available ports - http://api.zeronorth.app/api/v1/ports?page=1&size=100. It takes two query parameters - page and size.

The endpoint is registered with mock service worker so no actual network request is made.

The response is a JSON object with the following properties:

- total: number - the total number of ports
- offset: number - the offset of the current page
- data: Port[] - an array of ports

Each port has the following properties:

- unlocode: string - the unlocode of the port
- id: string - the id of the port
- name: string - the name of the port
- latitude: number - the latitude of the port
- longitude: number - the longitude of the port
- timezone: string[] - the timezone of the port

2. Implement the following functionality in voyage-planner.tsx
   1. Populate the ports dropdown with the ports fetched in step #1
   2. Choose a port and click the "+" button to add it to the voyage
      1. Each port chosen should be added to the voyage and reflected in the Voyage section. Assume the ship is leaving the first port added immediately. When two or more ports are added show the estimated local time of arrival for each port and the distance between the ports.
      2. Once two or more ports are added, calculate the total distance travelled by the voyage. You can assume direct travel (pretend the ship is a blimp) and the vessel speed is 10 knots.
      3. Add the port as a pin on the Google Map
3. Adjust the UI as needed to make it look nice - focus on the voyage section, not the map.
4. Implement any test cases you feel are necessary

_NB_ Feel free to use any libraries you want to handle state/fetch/ui etc.
