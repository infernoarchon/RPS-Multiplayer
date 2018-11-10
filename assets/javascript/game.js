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
var gamestatusdisplay;
var player1imagedisplay = true;
var player2imageurl;

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
    player1imagedisplay = snapshot.val().player1image
    player2imageurl = snapshot.val().player2img
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
    if(playerturn === 1 && player1imagedisplay === false) {
        player1imagedisplay = true
        $("#player1-c").attr("src","")
        $("#player2-ec").attr("src","./assets/images/blank.svg")
    }
    if(player2imageurl === "showrock") {
        $("#player2-ec").attr("src","./assets/images/enemyRock.svg")
    }
    if(player2imageurl === "showpaper") {
        $("#player2-ec").attr("src","./assets/images/enemyPaper.svg")
    }
    if(player2imageurl === "showscissors") {
        $("#player2-ec").attr("src","./assets/images/enemyScissors.svg")
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
            },
            player2 : {
                choice: "none",
                name : "________",
                wins : 0
            }
        })
        database.ref().update({
            gamestatus : "Waiting for additional players"
        })
        $("#player2-ec").attr("src","./assets/images/blank.svg")
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
        $("#player1-card").removeClass("invisible")
        $("#intro-card").addClass("invisible")
    },
    initplayer2 : function() {
        $("#player2-card").removeClass("invisible")
        $("#intro-card").addClass("invisible")
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
            $("#player1-c").attr("src","./assets/images/playerRock.svg")
        }
        if (x === "player1-paper" && playerturn === 1) {
            database.ref('players/player1').update({
                    choice : "paper"
            })
            playerturn++
            database.ref().update({
                turn : playerturn
            })
            database.ref().update({
                gamestatus :  player2name + "'s turn"
            })
            $("#player1-c").attr("src","./assets/images/playerPaper.svg")
        }
        if (x === "player1-scissors" && playerturn === 1) {
            database.ref('players/player1').update({
                    choice : "scissors"
            })
            playerturn++
            database.ref().update({
                turn : playerturn
            })
            database.ref().update({
                gamestatus :  player2name + "'s turn"
            })
            $("#player1-c").attr("src","./assets/images/playerScissors.svg")
        }
        // Get player 2 choice
        if (x === "player2-rock" && playerturn === 2) {
            database.ref('players/player2').update({
                    choice : "rock"
            })
            $("#player2-c").attr("src","./assets/images/playerRock.svg")
        }
        if (x === "player2-paper" && playerturn === 2) {
            database.ref('players/player2').update({
                    choice : "paper"
            })
            $("#player2-c").attr("src","./assets/images/playerPaper.svg")
        }
        if (x === "player2-scissors" && playerturn === 2) {
            database.ref('players/player2').update({
                    choice : "scissors"
            })
            $("#player2-c").attr("src","./assets/images/playerScissors.svg")
        }
        // Analyze result if player 1 chooses rock
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
            database.ref().update({
                player2img : "showscissors"
            })
            $("#player1-ec").attr("src","./assets/images/enemyRock.svg")
            
        }
        if (player1choice === "rock" && player2choice === "rock" && playerturn === 2) {
            database.ref().update({
                gamestatus : "It's a draw!"
            })
            playerturn++
            database.ref().update({
                turn : playerturn
            })
            database.ref().update({
                player2img : "showrock"
            })
            $("#player1-ec").attr("src","./assets/images/enemyRock.svg")
        }
        if (player1choice === "rock" && player2choice === "paper" && playerturn === 2) {
            player2wins++
            database.ref('players/player2').update({
                wins : player2wins
            })
            database.ref().update({
                gamestatus : player2name + " wins!"
            })
            playerturn++
            database.ref().update({
                turn : playerturn
            })
            database.ref().update({
                player2img : "showpaper"
            })
            $("#player1-ec").attr("src","./assets/images/enemyRock.svg")
        }
         // Analyze result if player 1 chooses paper
         if (player1choice === "paper" && player2choice === "rock" && playerturn === 2) {
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
            database.ref().update({
                player2img : "showrock"
            })
            $("#player1-ec").attr("src","./assets/images/enemyPaper.svg")
        }
        if (player1choice === "paper" && player2choice === "paper" && playerturn === 2) {
            database.ref().update({
                gamestatus : "It's a draw!"
            })
            playerturn++
            database.ref().update({
                turn : playerturn
            })
            database.ref().update({
                player2img : "showpaper"
            })
            $("#player1-ec").attr("src","./assets/images/enemyPaper.svg")

        }
        if (player1choice === "paper" && player2choice === "scissors" && playerturn === 2) {
            player2wins++
            database.ref('players/player2').update({
                wins : player2wins
            })
            database.ref().update({
                gamestatus : player2name + " wins!"
            })
            playerturn++
            database.ref().update({
                turn : playerturn
            })
            database.ref().update({
                player2img : "showscissors"
            })
            $("#player1-ec").attr("src","./assets/images/enemyPaper.svg")

        }
         // Analyze result if player 1 chooses scissors
         if (player1choice === "scissors" && player2choice === "paper" && playerturn === 2) {
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
            database.ref().update({
                player2img : "showpaper"
            })
            $("#player1-ec").attr("src","./assets/images/enemyScissors.svg")
        }
        if (player1choice === "scissors" && player2choice === "scissors" && playerturn === 2) {
            database.ref().update({
                gamestatus : "It's a draw!"
            })
            playerturn++
            database.ref().update({
                turn : playerturn
            })
            database.ref().update({
                player2img : "showscissors"
            })
            $("#player1-ec").attr("src","./assets/images/enemyScissors.svg")

        }
        if (player1choice === "scissors" && player2choice === "rock" && playerturn === 2) {
            player2wins++
            database.ref('players/player2').update({
                wins : player2wins
            })
            database.ref().update({
                gamestatus : player2name + " wins!"
            })
            playerturn++
            database.ref().update({
                turn : playerturn
            })
            database.ref().update({
                player2img : "showrock"
            })
            $("#player1-ec").attr("src","./assets/images/enemyScissors.svg")

        }

        // Print result for 5 seconds and cleanup
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
        database.ref().update({
            player1image : false,
            player2img: "none"
        })
        $("#player2-c").attr("src","")
        $("#player1-ec").attr("src","")

    }
    
}

// Separate UIs with divs and button IDs which are visible depending on the order of coming in