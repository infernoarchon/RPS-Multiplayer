window.onload = function() {
    $(document).on("click", "#join-button", rps.initplayers);
    

}

var config = {
    apiKey: "AIzaSyB8SBY9R87lUu2ZOALovpBrRmplLBKycps",
    authDomain: "rock-paper-scissors-e2497.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-e2497.firebaseio.com",
    projectId: "rock-paper-scissors-e2497",
    storageBucket: "rock-paper-scissors-e2497.appspot.com",
    messagingSenderId: "514691615651"
  };
firebase.initializeApp(config);
var database = firebase.database()
var playersentered;
var player1;
var player2;




var rps = {
    start : function() {
        console.log("starts the game")
    },
    initplayers : function() {
        event.preventDefault();
        playersentered++
        $("#join-button").text("Join Room " + playersentered +  "/2")
        player1 = $("#name-input").val().trim()
        database.ref().set({
            playersentered : playersentered
        })
        database.ref().push({
            1
        })
        rps.initplayer1()
        // if (playersentered === 2) {
        //     $("#join-button").text("Join Room 2/2")
        //     $(document).off("click")
        //     $("#join-button").removeClass("btn-primary")
        //     $("#join-button").addClass("btn-secondary")
        //     player2 = $("#name-input").val().trim()
        //     database.child("players").ref().set({
        //         player1name : player1,
        //     })
        //     rps.initplayer2()
        // }
    },
    initplayer1 : function() {
        console.log("generate player1's UI")
    },
    initplayer2 : function() {
        console.log("genereate player2's UI")
    }
}