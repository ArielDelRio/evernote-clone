const express = require("express");
const app = express();
const firebase = require("firebase-admin");
const cors = require("cors");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

var serviceAccount = require("./evernote-app-88845-firebase-adminsdk-9vxl6-adffdbaab6.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("build"));

const server = http.createServer(app);
const io = socketIo(server);

// dev
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

io.on("connection", (socket) => {
  console.log("New client connected");

  getNotes(socket);

  socket.on("disconnect", () => console.log("Client disconnected"));
});

const getNotes = (socket) => {
  const doc = firebase.firestore().collection("notes").orderBy("timestamp");

  doc.onSnapshot(
    (serverUpdate) => {
      const notes = serverUpdate.docs.map((_doc) => {
        const data = _doc.data();
        data["id"] = _doc.id;
        return data;
      });
      socket.emit("GET_NOTES", notes);
    },
    (err) => {
      console.log(`Encountered error: ${err}`);
    }
  );
};

app.post("/notes", async (req, res) => {
  const title = req.body.title;
  const type = req.body.type;

  const newNote = await firebase.firestore().collection("notes").add({
    title: title,
    type: type,
    body: "",
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
  res.send(newNote);
});

app.put("/notes/:id", async (req, res) => {
  const note = req.body.note;
  const noteId = req.params.id;

  const updatedNote = await firebase
    .firestore()
    .collection("notes")
    .doc(noteId)
    .update({
      title: note.title,
      type: note.type,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

  res.send(updatedNote);
});

app.delete("/notes/:id", async (req, res) => {
  const noteId = req.params.id;

  const noteDeleted = firebase
    .firestore()
    .collection("notes")
    .doc(noteId)
    .delete();

  res.send(noteDeleted);
});

app.post("/auth/logout", async (req, res) => {
  const logout = await firebase.auth().signOut();
  console.log(logout);

  res.send(logout);
});

app.post("/auth/singin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });

  // firebase
  //     .auth()
  //     .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //     .then(() => {
  //       firebase
  //         .auth()
  //         .signInWithEmailAndPassword(email, password)
  //         .then((userCredential) => {
  //           console.log(userCredential);
  //           authenticate(userCredential);
  //           setvalidation(CLEAR_VALIDATION);
  //           setloading(false);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           const validationInfo = validator(error);
  //           setvalidation(validationInfo);
  //           setloading(false);
  //         });
  //     });
});

// start express server on port 5000
server.listen(process.env.PORT || "5001", () => {
  console.log(`server started on port ${process.env.PORT || "5001"}`);
});
