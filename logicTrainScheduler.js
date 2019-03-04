// Initialize Firebase
var config = {
    apiKey: "AIzaSyAHGgaEMAqUDvGbaijzZdwxvai0FqNKpKM",
    authDomain: "trainscheduler-dba76.firebaseapp.com",
    databaseURL: "https://trainscheduler-dba76.firebaseio.com",
    projectId: "trainscheduler-dba76",
    storageBucket: "trainscheduler-dba76.appspot.com",
    messagingSenderId: "967181379781"
};
firebase.initializeApp(config);

$(document).ready(function () {
    var rootRef = firebase.database().ref();
    
    var i = -1;

    $("#table1").append("<tr><td>" + "Train Name" + "</td><td>" + "Destination" + "</td><td>" + "Frequency" + " " + "(min)" + "</td><td>" + "Next Arrival" + "</td><td>" + "Minutes Away" + "</td><td>");

    $("#buttonSubmit").click(function () {
        event.preventDefault();
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var frequency = $("#frequency").val().trim();
        var firstTrainTime = $("#firstTrainTime").val().trim();

        var now = moment.utc().format("HH:mm");
        var frequency1 = moment().format(frequency,"mm");
        console.log(frequency1);
        //var y = now - 

        var x = moment(moment(now, "hh:mm").diff(moment(firstTrainTime, "hh:mm"))).format("hh:mm");
        var bbb = x.split("");
        console.log(bbb);
        var frequencyNumber = Number(frequency1);
        var bbb0 = Number(bbb[0]);
        var bbb1 = Number(bbb[1]);
        var bbb3 = Number(bbb[3]);
        var bbb4 = Number(bbb[4]);
        var minutes = bbb4 + (bbb3 * 10) + (bbb1 * 60) + (bbb0 * 600);
        var different = frequency1 - (minutes % frequency1);
        console.log(different);

        var arrival = (moment().add(different, "minutes")).format("hh:mm");
        
        i++;
        var user = "user" + i;
        console.log(user);
       
        rootRef.push({
            user:{
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            nextArrival: arrival,
            minutesAway: different
            }
        });  


        $("#table1").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + different + "</td><td>");
    })
});