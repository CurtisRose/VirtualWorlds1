//Preparing game and event listenters.
var gameport, context;
gameport = document.getElementById("gameport");
//context = gameport.getContext("2d");
document.addEventListener("keydown", checkKeyPressed, false);
document.addEventListener("keyup", checkKeyReleased, false);
//ctx.font = "30px Arial";
//ctx.fillText("Hello World",10,50);

//Global variables for screen.
var width = 600,
	height = 600,
	renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor: 0x000000});
gameport.appendChild(renderer.view);
//Global variables for PrepareArtwork() function.
var floor = height - 130,
	stage = new PIXI.Container(),
	background = new PIXI.Container(),
	characters = new PIXI.Container(),
	sky = new PIXI.Texture.fromImage("Sky.png"),
	ground = new PIXI.Texture.fromImage("Ground.png"),
	clouds = new PIXI.Texture.fromImage("Clouds.png"),
	character = PIXI.Texture.fromImage("character.png"),
	goblin = PIXI.Texture.fromImage("goblin.png"),
	skySprite = new PIXI.Sprite(sky),
	groundSprite = new PIXI.Sprite(ground),
	cloudsSprite = new PIXI.Sprite(clouds),
	cloudsSprite2 = new PIXI.Sprite(clouds),
	cloudsSprite3 = new PIXI.Sprite(clouds),
	sprite = new PIXI.Sprite(character),
	goblinSprite = new PIXI.Sprite(goblin),
	endGame = new PIXI.Text("Game Over", {font:"50px Arial", fill:"red"});
	pressEnter = new PIXI.Text("Press Enter to Play Again", {font:"25px Arial", fill:"black"});
	//Positioning second clouds.
	cloudsSprite2.position.x = 600;
	cloudsSprite3.position.x = 600;
	cloudsSprite3.scale.x = -1;
//Global variables for Jump() function.
var startJumpSpeed = 12,
	jumpSpeed = startJumpSpeed,
	gravity = 0.7,
	jumping;
    goingDown = false,
	inAir = false,
	jumpAgain = true;
//Global variables for UserInput() function.
var keyArrowDown = false,
    keyArrowUp = false,
	keyArrowLeft = false,
	keyArrowRight = false,
	characterSpeed = 5;
//Global variables for GoblinMovement() function.
var goblinStartSpeed = 2,
	goblinSpeed = goblinStartSpeed,
	momentum = 0.3,
	onLeft = false,
	onRight = true,
	turning = false;
//Global variables for CheckEndCondition() function.
var gameOver = false,
	playing,
	startNewGame = false,
	threatDistance = 40;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
animate();

function checkKeyPressed(key){
    if (key.keyCode == 65 || key.keyCode == 37) {
        keyArrowLeft = true;
    }
    if (key.keyCode == 68 || key.keyCode == 39) {
		keyArrowRight = true;
    }
	if (key.keyCode == 87 || key.keyCode == 38) {
		keyArrowUp = true;
	}
	if (key.keyCode == 83 || key.keyCode == 40) {
		keyArrowDown = true;
	}
	if (key.keyCode == 13) {
		startNewGame = true;
	}	
}

function checkKeyReleased(key){
    if (key.keyCode == 65 || key.keyCode == 37) {
        keyArrowLeft = false;
    }
    if (key.keyCode == 68 || key.keyCode == 39) {
		keyArrowRight = false;
    }
	if (key.keyCode == 87 || key.keyCode == 38) {
		keyArrowUp = false;
		jumpAgain = true;
	}
	if (key.keyCode == 83 || key.keyCode == 40) {
		keyArrowDown = false;
	}
	if (key.keyCode == 13) {
		startNewGame = false;
	}
}

var Jump = function() {
	if (jumpSpeed >= 0 && !goingDown) {
		sprite.position.y -= jumpSpeed;
		jumpSpeed -= gravity;
	} 
	else {
		goingDown = true;
		sprite.position.y += jumpSpeed;
		jumpSpeed += gravity;
		if (sprite.position.y >= floor) {
			clearInterval(jumping);
			goingDown = false;	
			inAir = false;
			sprite.position.y = floor;
			jumpSpeed = startJumpSpeed;
		}
	}
}

function UserInput() {
	if (keyArrowLeft) {
		if (sprite.position.x >= 0 + 30) {
			sprite.position.x -= characterSpeed;
		}
	}
	if (keyArrowRight) {
		if (sprite.position.x <= width - 30) {
			sprite.position.x += characterSpeed;
		}
	}
	if (keyArrowUp && !inAir && jumpAgain) {
		jumpAgain = false;
		inAir = true;
		jumping = setInterval(Jump, 30);
	}
	if (keyArrowDown) {
		//sprite.position.y += characterSpeed;
	}
}

function PrepareArtwork() {
	//Scale scene to fit window.
	cloudsSprite.scale.x = 1.5;
	cloudsSprite.scale.y = 1.5;
	cloudsSprite2.scale.x = 1.5;
	cloudsSprite2.scale.y = 1.5;
	groundSprite.scale.x = 1.5;
	groundSprite.scale.y = 1.5;
	skySprite.scale.x = 1.5;
	skySprite.scale.y = 1.5;
	//Scale character to look nicer.
	sprite.scale.x = 1.8;
	sprite.scale.y = 1.8;
	//Scale goblin to look nicer.
	goblinSprite.scale.x = 1.8;
	goblinSprite.scale.y = 1.8;
	//Set rotation anchor at center of character sprite.
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	//Set rotation anchor at center of goblin sprite.
	goblinSprite.anchor.x = 0.5;
	goblinSprite.anchor.y = 0.5;
	//Position character sprite at arbitrary x axis but on floor on y axis.
	sprite.position.x = 200;
	sprite.position.y = floor;
	//Position goblin sprite at arbitrary x axis, away from character.
	goblinSprite.position.x = 500;
	goblinSprite.position.y = floor;
	//Setting the "Game Over" text position.
	endGame.position.x = 190;
	endGame.position.y = 280;
	pressEnter.position.x = 175;
	pressEnter.position.y = 350;
	//Stage the sprites.
	stage.addChild(background);
	background.addChild(skySprite);
	background.addChild(cloudsSprite);
	background.addChild(cloudsSprite3);
	background.addChild(cloudsSprite2);
	background.addChild(groundSprite);
	stage.addChild(characters);
	characters.addChild(sprite);
	characters.addChild(goblinSprite);
}

function GoblinMovement() {
	if (goblinSprite.position.x >= sprite.position.x) {
		goblinSprite.position.x -= goblinSpeed;
		goblinSprite.scale.x = -1.8;
	}
	else if (goblinSprite.position.x <= sprite.position.x) {
		goblinSprite.position.x += goblinSpeed;
		goblinSprite.scale.x = 1.8;
	}
}

function CheckEndCondition() {
	if (!inAir) {
		if (Math.abs(sprite.position.x - goblinSprite.position.x) <= threatDistance) {
			gameOver = true;
			clearInterval(Scoreboard);
		}
	}
}

function MoveClouds() {
	cloudsSprite.position.x -= 2;
	cloudsSprite2.position.x -= 2;
	cloudsSprite3.position.x -= 3;
	if (cloudsSprite.position.x <= -600) {
		cloudsSprite.position.x = 600;
	}
	if (cloudsSprite2.position.x <= -600) {
		cloudsSprite2.position.x = 600;
	}
	if (cloudsSprite3.position.x <= 0) {
		cloudsSprite3.position.x = 1000;
	}
}

function Update() {
	MoveClouds();
	if (!gameOver) {
		UserInput();
		GoblinMovement();
		CheckEndCondition();
	}
	else {
		//Game Over
		stage.addChild(endGame);
		stage.addChild(pressEnter);
		//Restart game by hitting enter.
		if (startNewGame) {
			gameOver = false;
			PrepareArtwork();
		}
	}
}

function Start() {
	PrepareArtwork();
	playing = setInterval(Update, 30);
}
Start();