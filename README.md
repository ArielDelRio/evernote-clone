# Notes-App

Notes App is an application to record notes and store them in the cloud in different formats and styles. It also allows you to save audio notes and supports the Markdown format for editing.

## About

Users can register in the app and create their own account, which will allow them to access and have all the notes associated with their account.

After entering the app, the user will see the dashboard where the previously stored notes will appear.


At any time you can create, modify and delete the notes, define the style and/or format you want.

Notes App automatic saves when it detects that a change has been made in the notes.

Warning: It is possible to interchange between the formats and Notes App will try to translate between these formats, but it is likely that not all the modifications will be supported, so aspects of the format may be lost when interchanging them.

## Technologies

The application was developed with [React](https://reactjs.org/) and [Material-UI](https://material-ui.com/) for the development of its interface.


For the server [NodeJS](https://nodejs.org/) was used with the framework [Express](https://expressjs.com/).


For the registration and authentication of users, as well as for the storage of the notes and their information, [Firebase](https://firebase.google.com/) was used.

A special treatment was reused in the use of firebase, since it was used on the server side to avoid connectivity problems between locked regions and firebase. And to keep listening for events at all times, I connect firebase on the server with the react app using [socket.io](https://socket.io/)

## License
[MIT](https://choosealicense.com/licenses/mit/)
