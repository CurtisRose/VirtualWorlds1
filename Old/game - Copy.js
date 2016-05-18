
var renderer = PIXI.autoDetectRenderer(width - 200, height - 200, {backgroundColor: 0x000000});
gameport.appendChild(renderer.view);
//Global variables for PrepareArtwork() function;
var width = 600,
    height = 600,
	floor = height - 130,
	stage = new PIXI.Container(),
	scene = PIXI.Texture.fromImage("Scene.png"),
	character = PIXI.Texture.fromImage("character.png"),
	sceneSprite = new PIXI.Sprite(scene),
	sprite = new PIXI.Sprite(character);
//Global variables for Jump() function.
var jumpHeight = 100,
	jumpSpeed = 12,
	gravity = 0.7,
	jumping;
    goingDown = false,
	inAir = false;



function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
animate();

var keyArrowDown = false,
    keyArrowUp = false,
	keyArrowLeft = false,
	keyArrowRight = false;
var characterSpeed = 3;
var tickSpeed =  30;

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
	if (sprite.position.y >= floor - jumpHeight && !goingDown) {
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
			jumpSpeed = 10;
		}
	}
}

var userInput = function() {
	if (keyArrowLeft) {
		sprite.position.x -= characterSpeed;
	}
	if (keyArrowRight) {
		sprite.position.x += characterSpeed;
	}
	if (keyArrowUp && !inAir) {
		inAir = true;
		jumping = setInterval(Jump, 30);
	}
	if (keyArrowDown) {
		//sprite.position.y += characterSpeed;
	}
};

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
	userInput();
}

function Start() {
	var gameport = document.getElementById("gameport");
	document.addEventListener("keydown", checkKeyPressed, false);
	document.addEventListener("keyup", checkKeyReleased, false);
	PrepareArtwork();
	return setInterval(Update, 30);
}
Start();