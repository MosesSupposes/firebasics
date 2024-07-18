document.addEventListener("DOMContentLoaded", (event) => {
  const app = firebase.app();

  const db = firebase.firestore();

  // const myPost = db.collection("posts").doc("firstpost");

  // myPost.get().then((doc) => {
  //   const data = doc.data();
  //   document.write(data.title + `<br>`);
  //   document.write(data.createdAt);
  // });

  // myPost.onSnapshot((doc) => {
  //   const data = doc.data();
  //   document.querySelector("#title").innerHTML = data.title;
  // });

  // const productsRef = db.collection("products");
  // const query = productsRef.where("price", "==", 1);
  // const query = productsRef.orderBy("price", "desc").limit(1);
  // query
  //   .get()
  //   .then((products) => {
  //     products.forEach((doc) => {
  //       data = doc.data();
  //       document.write(`${data.name} at ${data.price}`);
  //       console.log({ doc });
  //     });
  //   })
  //   .catch(console.log);
});

function uploadFile(files) {
  const storageRef = firebase.storage().ref();
  const horseRef = storageRef.child("horse.jpg");

  const file = files.item(0);

  const task = horseRef.put(file);

  task.then((snapshot) => {
    console.log(snapshot);
    const url = snapshot.downloadURL;
    document.querySelector("#imgUpload").setAttribute("src", url);
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
