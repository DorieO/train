

  // Initialize Firebase
  	var config = {
    apiKey: "AIzaSyCpI90Yzs89gXmRNW56r2gZNaW26kYMsA0",
    authDomain: "train-fdc1c.firebaseapp.com",
    databaseURL: "https://train-fdc1c.firebaseio.com",
    storageBucket: "",
  };
  firebase.initializeApp(config);

	var database = firebase.database();

	$("#passengerInfoBtn").on("click", function(){

	var trainName = $("#trainNameInput").val().trim();
	var trainDest = $("#trainDestInput").val().trim();
	var firstTrainTime = moment($("#firstTrainTimeInput").val().trim(), "hh:mm").format("Start");
	var trainFreq = moment ($("#trainFreqInput").val().trim(), "hh:mm".format("times"));

	var newTrip = {
		train: trainName,
		destination: trainDest,
		time: firstTrainTime,
		frequency: trainFreq,
	}

	database.ref().push(newTrip);

	console.log(newTrip.train);
	console.log(newTrip.destination);
	console.log(newTrip.time);
	console.log(newTrip.frequency);

	alert("Train successfully added");

	$("#trainNameInput").val("");
	$("#trainDestInput").val("");
	$("#firstTrainTimeInput").val("");
	$("#trainFreqInput").val("");

	return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// 
	var trainName = childSnapshot.val().train;
	var trainDest = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().time;
	var trainFreq = childSnapshot.val().frequency;

	// 
	console.log(trainName);
	console.log(trainDest);
	console.log(firstTrainTime);
	console.log(trainFreq);
//do something to make time in muntes for time calculations

	var firstTrainTimeNice = moment.unix(firstTrainTime).format("hh:mm");
	
	var calcDeparts = moment().add(moment.unix(firstTrainTime,"start"), "times");
///loop? to calculate departures/arrivals?
	console.log(calcDeparts);

	var firstTrainTimeConverted = moment(firstTrainTime,"hh:mm").subtract(1, years);
	console.log(firstTrainTimeConverted);

	var currentTime = moment();
	console.log ("CURRENT TIME" + moment(currentTime).format("hh:mm"));

	var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME" + diffTime);

	var tRemainder = diffTime % trainFreq;
	console.log(tRemainder);

	var tMinutesTillTrain = trainFreq -tRemainder;
	console.log("MINUTES TILL TRAIN; " + tMinutesTillTrain);

	var nextTrain = moment().add(tMinutesTillTrain, "minutes")
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))




	//$("#trainSchedule > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + firstTrainTimeNice + "</td><td>");
	//+ empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");

//</script>
 });   