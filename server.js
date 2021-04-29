const express = require("express");
const app = express();
const firebase = require("firebase-admin");
const clientFirebase = require("firebase");
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

clientFirebase.initializeApp({
  apiKey: "AIzaSyC-rP19P1Nz6zmkX3DK5O_vE4KCGnH_GDE",
  authDomain: "evernote-app-88845.firebaseapp.com",
  projectId: "evernote-app-88845",
  storageBucket: "evernote-app-88845.appspot.com",
  messagingSenderId: "1030117439402",
  appId: "1:1030117439402:web:4600f563fbd1904e369dd3",
  measurementId: "G-1946BQPB1X",
});

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("build"));

const server = http.createServer(app);
//const io = socketIo(server);

// dev
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

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
      //timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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

app.post("/auth/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  clientFirebase
    .auth()
    .setPersistence(clientFirebase.auth.Auth.Persistence.NONE)
    .then(() => {
      clientFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((credentialUser) => {
          return res.send(credentialUser.user);
        })
        .catch((error) => {
          console.log("Error Code", error.code);
          console.log("Error message", error.message);
          return res.status(503).send(error);
        });
    });
});

app.post("/auth/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  clientFirebase
    .auth()
    .setPersistence(clientFirebase.auth.Auth.Persistence.NONE)
    .then(() => {
      clientFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log(userCredential.user);

          clientFirebase
            .firestore()
            .collection("users")
            .doc(userCredential.user.uid)
            .set({ email })
            .catch(console.error);

          return res.send(userCredential.user);
        })
        .catch((error) => {
          console.log("Error Code", error.code);
          console.log("Error message", error.message);
          return res.status(503).send(error);
        });
    });
});

app.post("/auth/verify", async (req, res) => {
  const token = req.body.token;
  console.log("verify token", token);
  firebase
    .auth()
    .getUser(token)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      res.status(200).send();
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
      return res.status(503).send(error);
    });
});

// start express server on port 5000
server.listen(process.env.PORT || "5001", () => {
  console.log(`server started on port ${process.env.PORT || "5001"}`);
});
