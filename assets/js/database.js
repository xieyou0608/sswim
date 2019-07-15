var firebaseConfig = {
    apiKey: "AIzaSyA9uHGYSdg7_PLPrkSO4EwoPgzZySLd6No",
    authDomain: "sswim-a0e49.firebaseapp.com",
    databaseURL: "https://sswim-a0e49.firebaseio.com",
    projectId: "sswim-a0e49",
    storageBucket: "",
    messagingSenderId: "736260088520",
    appId: "1:736260088520:web:b38b6f4bf484951f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database().ref().child("form")

function sendData(data){
    database.update(data)
}