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

var ref = database.ref("playersentered")
database.ref().on("value",function(snapshot) {
    var activeplayers = snapshot.val().playersentered
    playersentered = activeplayers
    $("#join-button").text("Join Room " + playersentered + "/2")
    console.log(activeplayers)
    if(playersentered > 0) {
    ref.onDisconnect().set(activeplayers - 1)
    }
})


var rps = {
    start : function() {
        console.log("starts the game")
    },
    initplayers : function() {
        event.preventDefault();
        playersentered++
        if(playersentered === 1) {
        player1 = $("#name-input").val().trim()
        database.ref().update({
            playersentered : playersentered
        })
        database.ref('players').update({
            player1name : player1
        })
        console.log(player1)
        rps.initplayer1()
         }
        if (playersentered === 2) {
        $(document).off("click")
        $("#join-button").removeClass("btn-primary")
        $("#join-button").addClass("btn-secondary")
        player2 = $("#name-input").val().trim()
        database.ref().update({
            playersentered : playersentered
        })
        console.log(player2)
        database.ref('players').update({
            player2name : player2
        })
        rps.initplayer2()
        }
    },
    initplayer1 : function() {
        console.log("generate player1's UI")
    },
    initplayer2 : function() {
        console.log("genereate player2's UI")
    }
}