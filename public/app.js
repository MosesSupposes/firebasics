document.addEventListener("DOMContentLoaded", (event) => {
  const app = firebase.app();
});

function uploadFile(files) {
  const storageRef = firebase.storage().ref();
  const horseRef = storageRef.child("horse.jpg");

  const file = files.item(0);

  const task = horseRef.put(file);

  task
    .then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          document.querySelector("#imgUpload").setAttribute("src", url);
        })
        .catch((error) => {
          console.log("Error getting download URL:", error);
        });
    })
    .catch((error) => {
      console.log("Error uploading file:", error);
    });
}

function updatePost(e) {
  const db = firebase.firestore();
  const myPost = db.collection("posts").doc("firstpost");
  myPost.update({ title: e.target.value });
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      document.write(`Hello ${user.displayName}`);
    })
    .catch(console.log);
}
