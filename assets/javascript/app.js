$(document).ready(function () {


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBrccYbNDGz6qsfPmx_ckdFUGUDaP24Hjw",
    authDomain: "trainschedule-57b53.firebaseapp.com",
    databaseURL: "https://trainschedule-57b53.firebaseio.com",
    projectId: "trainschedule-57b53",
    storageBucket: "trainschedule-57b53.appspot.com",
    messagingSenderId: "88898417941"
  };
  firebase.initializeApp(config);

    var database = firebase.database();

    $("#trainbtn").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTime = $("#firstTime").val().trim()
        var frequency = $("#frequency").val().trim();
        var minutesAway = $("#minutesAway").val().trim();

        var currentTime = moment();
        console.log("current time: " + moment(currentTime).format("hh:mm"));

        //log everything to console
        console.log(trainName);
        console.log(destination);
        console.log(firstTime);
        console.log(frequency);
        console.log(currentTime);

        //new train information gather all together
        var newTrain = {
            train: trainName,
            trainGoing: destination,
            trainComing: firstTime,
            everyxMin: frequency,
            difference: minutesAway,

        };
        //newTrain upload to firebase
        database.ref().push(newTrain);


        //clear elements before adding new text
        $("#name").val("");
        $("#destination").val("");
        $("#firstTime").val("");
        $("#frequency").val("");
        $("#minutesaway").val("");

    });
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        //store everything into a variable.
        var trainName = childSnapshot.val().train;
        var destination = childSnapshot.val().trainGoing;
        var firstTime = childSnapshot.val().trainComing;
        var frequency = childSnapshot.val().everyxMin;
        var minutesAway = childSnapshot.val().difference;

        //Train Schedule informatiom
        //console.log(trainName);
        //console.log(destination);
        //console.logh(firstTime);
        //console.log(frequency);
        //console.log(minutesAway);

        $("#train-data").append('<tr> <td>' + trainName + '</td> <td>' + destination + '</td> <td>' 
        + firstTime + '</td> <td>' + frequency + '</td>' + '<td>'+ minutesAway +'</td> </tr>');





    })






})