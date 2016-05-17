var gameport = document.getElementById("gameport");
document.addEventListener("keydown", checkKeyPressed, false);
document.addEventListener("keyup", checkKeyReleased, false);

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x000000});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var texture = PIXI.Texture.fromImage("alien.png");

var sprite = new PIXI.Sprite(texture);

sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;

sprite.position.x = 200;
sprite.position.y = 200;

stage.addChild(sprite);

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

var tick = function() {
	if (keyArrowLeft) {
		sprite.position.x -= characterSpeed;
	}
	if (keyArrowRight) {
		sprite.position.x += characterSpeed;
	}
	if (keyArrowUp) {
		sprite.position.y -= characterSpeed;
	}
	if (keyArrowDown) {
		sprite.position.y += characterSpeed;
	}
	
	setTimeout(tick, tickSpeed);
};
tick();

