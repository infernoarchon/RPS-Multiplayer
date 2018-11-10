window.onload = function() {
    $(document).on("click", "#join-button", rps.initplayers);
    $(".game-control").on("click", function() {
        rps.gamelogic($(this).attr("id"))
    })
    

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
var playersentered = 0;
var player1;
var player2;
var player1choice = "non";
var player2choice = "non";
var playerturn;
var player1wins = 0;
var player2wins = 0;
var player1name;
var player2name;
var gamestatusdisplay

var play = database.ref("players")
var ref = database.ref("playersentered")
database.ref().on("value",function(snapshot) {
    var activeplayers = snapshot.val().playersentered
    // Set the playercount to database ref
    playersentered = activeplayers
    playerturn = snapshot.val().turn
    player1choice = snapshot.val().players.player1.choice
    player2choice = snapshot.val().players.player2.choice
    player1wins = snapshot.val().players.player1.wins
    player2wins = snapshot.val().players.player2.wins
    player1name = snapshot.val().players.player1.name
    player2name = snapshot.val().players.player2.name
    gamestatusdisplay = snapshot.val().gamestatus
    $(".game-status").text(gamestatusdisplay)
    $("#join-button").text("Join Room " + playersentered + "/2")
    $("#player1-enemy-name").text(snapshot.val().players.player1.name)
    $("#player2-enemy-name").text(snapshot.val().players.player2.name)
    $("#player1-score").text(snapshot.val().players.player1.wins)
    $("#player2-score").text(snapshot.val().players.player2.wins)
    $("#player1-enemy-score").text(snapshot.val().players.player1.wins)
    $("#player2-enemy-score").text(snapshot.val().players.player2.wins)
    if(playersentered === 2 && playersentered > 0) {
        $("#join-button").removeClass("btn-primary")
        $("#join-button").addClass("btn-secondary")
        ref.onDisconnect().set(activeplayers - 1)
    }
    if(playersentered < 2 && playersentered > 0) {
        $("#join-button").removeClass("btn-secondary")
        $("#join-button").addClass("btn-primary")
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
            player1 : {
                choice: "none",
                name : player1,
                wins : 0
            }
        })
        database.ref().update({
            gamestatus : "Waiting for additional players"
        })
        // Remove when finished with player 2
        database.ref().update({
            turn : 0
        })
        // ---------------------------

        $("#player1-name").text(player1)
        rps.initplayer1()
         }
        //  Player 2 initiation
        if (playersentered === 2) {
        player2 = $("#name-input").val().trim()
        database.ref().update({
            playersentered : playersentered
        })
        database.ref('players').update({
            player2 : {
                choice : "none",
                name : player2,
                wins : 0
            }
        })
        database.ref().update({
            turn : 1
        })
        $("#player2-name").text(player2)
        rps.initplayer2()
        database.ref().update({
            gamestatus :  player1name + "'s turn"
        })
        }
    },
    initplayer1 : function() {
        console.log("generate player1's UI")
    },
    initplayer2 : function() {
        console.log("genereate player2's UI")
    },
    gamelogic : function(x) {
        // Get player 1 choice
        if (x === "player1-rock" && playerturn === 1) {
            database.ref('players/player1').update({
                    choice : "rock"
            })
            playerturn++
            database.ref().update({
                turn : playerturn
            })
            database.ref().update({
                gamestatus :  player2name + "'s turn"
            })
        }
        // Get player 2 choice
        if (x === "player2-scissors" && playerturn === 2) {
            database.ref('players/player2').update({
                    choice : "scissors"
            })
        }
        // Analyze result
        if (player1choice === "rock" && player2choice === "scissors" && playerturn === 2) {
            player1wins++
            database.ref('players/player1').update({
                wins : player1wins
            })
            database.ref().update({
                gamestatus : player1name + " wins!"
            })
            playerturn++
            database.ref().update({
                turn : playerturn
            })
        }
        if (playerturn === 3) {
            setTimeout(rps.cleanup, 5000)
        }
        
    },
    cleanup : function() {
        playerturn = 1
        database.ref().update({
            turn : playerturn
        })
        database.ref().update({
            gamestatus :  player1name + "'s turn"
        })
        database.ref('players/player1').update({
            choice : "none"
        })
        database.ref('players/player2').update({
            choice : "none"
        })
    }
    
}

// Separate UIs with divs and button IDs which are visible depending on the order of coming in