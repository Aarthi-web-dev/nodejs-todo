const admin = require("firebase-admin");

const serviceAccount = require("./firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://authetication-75858-default-rtdb.firebaseio.com/"
});

const auth = admin.auth();
module.exports = { auth };