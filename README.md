# React Note App

Note App is a web app for manage your note, built with React, Redux, JavaScript, CSS, and Bootstrap.

## Dependencies

- ReactJs
- Axios
- Redux Toolkit
- Bootstrap
- Moment

## Setup

This code using node version v16.13.1

```bash
git clone https://github.com/tommyfq/note-app
cd note-app
npm install
```

make file `.env` and write code below

```bash
PORT=8081
```

## Running Program

```bash
cd note-app
npm start
```

## Usage
Once the application is running, open your web browser and go to `http://localhost:3000`. From there, you can create a new note by clicking on the "Add Notes" button and filling out the form. You can view a list of all notes by clicking on the "Notes" button. To view, edit, or delete an individual note, click on its title in the notes list.

## High Level Overview

- `package.json`: This file contains information about the project, such as its name, version, and dependencies. It also contains scripts that can be run to start the application.

- `server.js`: This is the main server file that sets up the Express app, connects to the database, and defines the API endpoints for handling HTTP requests. It also listens for incoming requests on a specified port and sends responses back to the client.

- `models/note.model.js`: This file defines the schema for the Note model that is used to store notes in the database. It specifies the properties of a note, such as its title, description, and date created.

- `routes/notes.js`: This file defines the API endpoints for handling CRUD operations on notes. It uses the Note model to interact with the database and returns JSON responses to the client.

- `client/src/App.js`: This is the main React component that defines the structure of the application's UI. It sets up the routing for navigating between different pages and contains the logic for adding and editing notes.

- `client/src/components/AddNote.js`: This component is used for adding new notes to the database. It contains a form that allows the user to input a note's title and description and sends a POST request to the server to create a new note.

- `client/src/components/NotesList.js`: This component displays a list of all the notes in the database. It sends a GET request to the server to retrieve the notes and maps over them to create a list of Note components.

- `client/src/components/Note.js`: This component displays the details of a single note. It receives the note data as props and renders the title, description, and date created.

- `client/src/index.js`: This file sets up the React app and renders the App component to the DOM.

Overall, the program works by setting up an Express server that handles HTTP requests from the client and interacts with a MongoDB database to store and retrieve notes. The client is built using React and communicates with the server using API endpoints to perform CRUD operations on the notes. The different components in the client/src directory handle the UI logic for displaying and manipulating the notes.

## Notes

This code using extension Better Comments (<https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments>) for better experience reading documentation code