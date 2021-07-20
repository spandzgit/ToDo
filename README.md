# Todo App. 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Description 
This is a ToDo App built using React. The base structure is created using create react app.\
Following are the features of this app -\
1.) Create/Edit/Delete ToDo's\
2.) Persisting the ToDos in localstorage\
3.) Searching/Filtering of ToDos\
4.) Reporting the ToDo's in a calendar view

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Future

For future enhancements, todos, ideas:

### ToDos
1.) Increase the fonts or use proper images/icons for the Action Controls Edit (e) and Delete (x)\
2.) Third party calendar component - showing # more items on a day - onClick loading the corresponding child component to show the rest.\
3.) Third party calendar component - showing other view - Week, Year etc - onClick loading the corresponding child component to show those views.\
4.) Add unit tests for DOM elements, functionalities & handlers.\
5.) Side nav links show Active / Not Active status as visual identifier of the app status.\
6.) Add Error handling across app.\
7.) Add app loading to handle actual async requests.


### Thoughts | Enhancements

1.) Add Status for ToDo's : ACTIVE | COMPLETED | ALL.\
2.) Add UI filtering to show ToDo's based on above status.\
3.) Add field for ToDo Due Date. Currently its defaulted to Today.\
4.) Make the list item li showing the ToDo double click editable with delete embeded.\
5.) Add in accessibility bits as needed for page flow.\
6.) Check for duplication - if a ToDo exists dont add throw custom message.\
7.) Check box on list item(ToDo) to mark Complete as status.\
8.) Show count of active Todo's as Items left to action on.\
9.) Add sort order of List Item - Due Date.