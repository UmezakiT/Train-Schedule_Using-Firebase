$(document).ready(function(){

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAx1nW99OoTbG-Nnv3kIg1iT-Nb_CJQ42Y",
    authDomain: "classwork-fa931.firebaseapp.com",
    databaseURL: "https://classwork-fa931.firebaseio.com",
    projectId: "classwork-fa931",
    storageBucket: "classwork-fa931.appspot.com",
    messagingSenderId: "221262125677"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

  $("#submitButton").on("click",function(event){
    event.preventDefault();

    var trainData= {

      trainName: $("#inputTrainName").val().trim(),
      trainDestination: $("#inputDestination").val().trim(),
      trainTime: $("#inputTime").val().trim(),
      trainFrequency: parseInt($("#inputFrequency").val().trim())
    };

    // trainData.trainTime = moment(trainData.trainTime, "HH:mm").format("X");

    database.ref().push(trainData);

    $("#inputTrainName").val("");
    $("#inputDestination").val("");
    $("#inputTime").val("");
    $("#inputFrequency").val("");

  });

  database.ref().on("child_added", function(childSnapshot){

    console.log(childSnapshot.val());
    var trainName= childSnapshot.val().trainName;
    var trainDestination= childSnapshot.val().trainDestination;
    var trainTime = childSnapshot.val().trainTime;
    var trainFrequency= childSnapshot.val().trainFrequency;

    console.log(childSnapshot.key);
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    
    var time = trainTime
    var firstTrainConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var $tr = $("<tr>");
    $tr
      .attr("train-key", childSnapshot.key)
      .append(`<td>${trainName}</td>`)
      .append(`<td>${trainDestination}</td>`)
      .append(`<td>${trainFrequency}</td>`)
      .append(`<td>${nextTrain.format("hh:mm")}</td>`)
      .append(`<td>${tMinutesTillTrain}</td>`)

    $("tbody#train-info").append($tr);
    
    

  });


});