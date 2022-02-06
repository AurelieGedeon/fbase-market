const { response } = require("express");
const express = require("express");

const app = express();
app.use(express.json());

const { initializeApp, getApps, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const credentials = require("./credentials.json");

function connectToFirestore() {
  if (!getApps().length) {
    initializeApp({
      credential: cert(credentials),
    });
  }
  return getFirestore();
}

app.listen(3000, () => console.log("Listening in on Port 3000"));
app.get("/", (req, res) => {
  res.send("Hello");
});

const db = connectToFirestore();
const prodRef = db.collection("produce");
const usRef = db.collection("user");
const dairyRef = db.collection("dairy");
const meatRef = db.collection("meat");

app.post("/produce", (req, res) => {
  const db = connectToFirestore();
  prodRef
    .add(req.body)
    .then(() => res.send("Produce added"))
    .catch(console.error);
});

app.post("/dairy", (req, res) => {
  const db = connectToFirestore();
  dairyRef
    .add(req.body)
    .then(() => res.send("Dairy product added"))
    .catch(console.error);
});

//posting into the API
app.post("/meat", (req, res) => {
  const db = connectToFirestore();
  meatRef
    .add(req.body)
    .then(() => res.send("Meat product added"))
    .catch(console.error);
});

//this one gets whole collections
app.get("/produce", (req, res) => {
  const db = connectToFirestore();
  prodRef
    .get()
    .then((snapshot) => {
      const produceList = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      res.send(produceList);
    })
    .catch(console.error);
});

app.get("/dairy", (req, res) => {
  const db = connectToFirestore();
  dairyRef
    .get()
    .then((snapshot) => {
      const dairyList = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      res.send(dairyList);
    })
    .catch(console.error);
});

app.get("/meat", (req, res) => {
  const db = connectToFirestore();
  meatRef
    .get()
    .then((snapshot) => {
      const meatList = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      res.send(meatList);
    })
    .catch(console.error);
});

//gets one doc from a collection
app.get("/produce/:produceId", (req, res) => {
  const { produceId } = req.params;
  const db = connectToFirestore();
  prodRef
    .doc(produceId)
    .get()
    .then((doc) => {
      let singleProduce = doc.data();
      console.log(doc.id, "=>", doc.data());
      res.send(singleProduce);
    })
    .catch(console.error);
});

app.get("/meat/:meatId", (req, res) => {
  const { meatId } = req.params;
  const db = connectToFirestore();
  meatRef
    .doc(meatId)
    .get()
    .then((doc) => {
      let singleMeatProduct = doc.data();
      console.log(doc.id, "=>", doc.data());
      res.send(singleMeatProduct);
    })
    .catch(console.error);
});

app.get("/dairy/:dairyId", (req, res) => {
  const { dairyId } = req.params;
  const db = connectToFirestore();
  dairyRef
    .doc(dairyId)
    .get()
    .then((doc) => {
      let singleDairyProduct = doc.data();
      console.log(doc.id, "=>", doc.data());
      res.send(singleDairyProduct);
    })
    .catch(console.error);
});

//this one updates an API
app.patch("/produce/:produceId", (req, res) => {
  const db = connectToFirestore();
  const { produceId } = req.params;
  // const { produceId, price } = req.body;
  prodRef
    .doc(produceId)
    .update(req.body)
    .then(() => res.send("Produce updated"))
    .catch(console.error);
});
