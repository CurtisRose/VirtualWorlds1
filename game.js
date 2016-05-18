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
	scene = PIXI.Texture.fromImage("Scene.png"),
	character = PIXI.Texture.fromImage("character.png"),
	sceneSprite = new PIXI.Sprite(scene),
	sprite = new PIXI.Sprite(character);
//Global variables for Jump() function.
var startJumpSpeed = 12,
	jumpSpeed = startJumpSpeed,
	gravity = 0.7,
	jumping;
    goingDown = false,
	inAir = false;
//Global variables for UserInput() function.
	var keyArrowDown = false,
    keyArrowUp = false,
	keyArrowLeft = false,
	keyArrowRight = false,
	characterSpeed = 5;



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
	}
	if (key.keyCode == 83 || key.keyCode == 40) {
		keyArrowDown = false;
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
	if (keyArrowUp && !inAir) {
		inAir = true;
		jumping = setInterval(Jump, 30);
	}
	if (keyArrowDown) {
		//sprite.position.y += characterSpeed;
	}
}

function PrepareArtwork() {
	//Scale scene to fit window.
	sceneSprite.scale.x = 1.5;
	sceneSprite.scale.y = 1.5;
	//Scale character to look nicer.
	sprite.scale.x = 1.8;
	sprite.scale.y = 1.8;
	//Set rotation anchor at center of character sprite.
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	//Position scene at top left to fill window.
	sceneSprite.position.x = 0;
	sceneSprite.position.y = 0;
	//Position character sprite at arbitrary x axis but on floor on y axis.
	sprite.position.x = 200;
	sprite.position.y = floor;
	//Stage the sprites.
	stage.addChild(sceneSprite);
	stage.addChild(sprite);
}

function Update() {
	UserInput();
}

function Start() {
	PrepareArtwork();
	return setInterval(Update, 30);
}
Start();