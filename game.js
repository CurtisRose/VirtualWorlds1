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

function checkKeyPressed(key){
    if(key.keyCode == 37) {
        keyArrowLeft = true;
    }
    else if(key.keyCode == 39) {
		keyArrowRight = true;
    }
}

function checkKeyReleased(key){
    if(key.keyCode == 37) {
        keyArrowLeft = false;
    }
    else if(key.keyCode == 39) {
		keyArrowRight = false;
    }
}

var tick = function() {
	if (keyArrowLeft) {
		sprite.position.x -= 1;
		
	}
	else if (keyArrowRight) {
		sprite.position.x += 1;
		
	}
	
	setTimeout(tick, 30);
};
tick();

