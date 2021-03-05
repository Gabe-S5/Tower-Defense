var enemies  // Store enemies in array
var towers   // Store all towers in array
var projectiles // Store all projectiles in array
var level    // Current level
var lives    // Number of lives
var money    // Total cash
var EORcash	 // End of Round cash reward

var FR            = 60             // Set Framerate
var roundCoolDown = 1 * FR         // Seconds before next level
var rCD           = roundCoolDown  // Temporary variable
var ticks  						   // Number of frames passed

var autoStart    = false  // Toggling autostart
var gridState    = false  // Toggling grid state
var paused       = false  // Toggling paused state
var toPlace      = false  // About to place tower
var towerClicked = false  // Clicked a tower
var selectedTower


function setup() {
	mode = 0
	var div    = document.getElementById('canvas-sketch')
	var canvas = createCanvas(div.offsetWidth, div.offsetHeight)
	canvas.parent('canvas-sketch')

	gridSize = div.offsetWidth / 27

	frameRate(FR)
	restartGame()
}

function preload() {
	// Map Images
	rectGrass = loadImage('public/imgs/grass_block.png')

	// Enemy Sprites
	enemy1 = loadImage('public/imgs/enemy1Sprite.png')
	enemy2 = loadImage('public/imgs/enemy2Sprite.png')

	// Projectile Sprites
	waterAttack = loadImage('public/imgs/waterSplash.png')
	fireAttack = loadImage('public/imgs/fireSplash.png')
	earthAttack = loadImage('public/imgs/earthSplash.png')

	// Tower Sprites
	waterTower = loadImage('public/imgs/waterTowerSprite.png')
	fireTower = loadImage('public/imgs/fireTowerSprite.png')
	earthTower = loadImage('public/imgs/earthTowerSprite.png')
	electricityTower = loadImage('public/imgs/electricityTowerSprite.png')
	farmTower = loadImage('public/imgs/farmTowerSprite.png')
}

function draw() {
	background(0)
	drawBackground(gridSize)

	updateGameStatus()	// Update level, lives, and cash info

	if (!paused) { ticks++ }  // Counts frames

	if (gridState) { drawGrid(gridSize) }  // Show Grid Toggle Button

	enemyTrack(gridSize) // Draw Track Rectangles

	// Move each enemy
	for (let i = enemies.length -1 ; i >= 0; i--) {
		let e = enemies[i]
		e.draw()  // Draws enemy on canvas

		// Prevents movement when paused
		if (!paused) {
			e.move()
			e.update()
		}
		
		if (!e.alive) {
			enemies.splice(i, 1)  // Removes enemy from enemies array when dead
		} 
	}
	
	// Draw Towers and shoot
	for (let i = towers.length - 1; i >= 0; i--) {
		let t = towers[i]
		t.draw()
		if (!paused) { 
			t.target(enemies)
			t.cooldown()
		}
		if (t.sell) towers.splice(i, 1)
	}

	// Draw projectiles
	for (let i = projectiles.length - 1; i >= 0; i--) {
		let p = projectiles[i]
		let t = p.towerType
		p.draw()
		if (!paused) {
			p.update()
		}

		// Check if projectile is close enough to ANY enemy
		if (t.targetType === "straight") {
			if (projCollision(p.pos.x, p.pos.y, t.damage)) { projectiles.splice(i, 1) }
		}
		else if (dist(p.pos.x, p.pos.y, p.e.pos.x, p.e.pos.y) <= gridSize/2) {
			p.e.health -= t.damage
			if (t.targetType === "chain") {
				let d = p.onHit()
				if (!d) { projectiles.splice(i, 1) }
			}
			else { projectiles.splice(i, 1)	}
		}

		// In case the target dies while projectile is still flying, delete it
		if (t.targetType !== "straight" && p.e.health <= 0) { projectiles.splice(i, 1) }

		// Delete projectiles that are outside of the map
		if (outsideMap(p.pos.x, p.pos.y)) { projectiles.splice(i, 1) }

		// Delete projectiles once they exceed range of the tower, mostly for the earth tower
		else if (outsideRange(p.pos.x, p.pos.y, t.pos.x, t.pos.y, t.range) && t.targetType === "straight") {
			projectiles.splice(i, 1)
		}
	}

	// About to place tower, visualize range on screen
	if (toPlace) {
		showRange(selectedTower, mouseX, mouseY)
		showTower(selectedTower, mouseX, mouseY)
	}
	// Show range of clicked tower
	if (towerClicked) {
		showRange(selectedTower, selectedTower.pos.x, selectedTower.pos.y)
	}

	// When no enemies on the board
	if (levelOver()) {
		money += EORcash
		EORcash = 0
		if (!autoStart) return
		// Waits for level cooldown time
		if (!paused && autoStart) { rCD-- } 
		if (rCD === 0) {
			nextLevel()
			rCD = roundCoolDown
		}
	}

	// Game Over
	if (lives <= 0) {
		restartGame()
	}
}

function projCollision(x, y, dmg) {
	for (let i = 0; i <= enemies.length - 1; i++) {
		let e = enemies[i]
		if (dist(x, y, e.pos.x, e.pos.y) <= 30) {
			e.health -= dmg
			return true
		}
	}
	return false
}

function outsideRange(x, y, tx, ty, r) {
	return dist(x, y, tx, ty) >= r * gridSize/2
}

function outsideMap(x, y) {
	return (x <= 0 || x >= width || y >= height || y <= 0)
}

// Shows info when tower is clicked in the store
function setTower(type) {
	toPlace       = true
	towerClicked  = false
	var t = new tower(0, 0, towerTypes[type], gridSize)
	selectedTower = t
	updateHoverInfo(t)
}

// Draw a circle of radius type.range at x and y 
function showRange(type, x, y) {
	stroke(10, 10, 10, 175)
	strokeWeight(2)
	fill(210,210,210, 175)
	ellipse(x, y, type.range * gridSize, type.range * gridSize)
	
}

function showTower(type, x, y) {
	stroke(50,50,50,175)
	fill(type.color[0], type.color[1], type.color[2], 210)
	imageMode(CENTER)
	image(type.towerImg, x, y, gridSize, gridSize)
	imageMode(CORNER)
	ellipseMode(CENTER)
}

// P5 function, when mouse is clicked and released
function mouseClicked() {
	// Mouse not within the map
	if (outsideMap(mouseX, mouseY)) return
	// Mouse on the enemy track
	if (mouseOnTrack(mouseX, mouseY)) {
		towerClicked = false
		return
	}
	// Check if mouse clicked on a tower
	var blocked = false
	for (var i = towers.length - 1; i >= 0; i--) {
		if (towers[i].x === Math.floor(mouseX/gridSize) + 0.5 && towers[i].y === Math.floor(mouseY/gridSize) + 0.5) {
			blocked = true
			break
		}
	}
	
	// Show info and range of tower clicked
	if (blocked) {
		toPlace       = false
		towerClicked  = true
		selectedTower = towers[i]
		updateHoverInfo(selectedTower)
	}
	// Not about to place tower
	else if (!toPlace || paused) {
		toPlace = false
		towerClicked = false
		return
	}
	// Place tower 
	else { 
		placeTower(new tower(Math.floor(mouseX/gridSize) + 0.5, Math.floor(mouseY/gridSize) + 0.5, towerTypes[selectedTower.id], gridSize))
	}
}

// Checks if mouse is currently on the enemy track
function mouseOnTrack(x, y) {
	x       = Math.floor(x/gridSize)
	y       = Math.floor(y/gridSize)
	mapGrid = mapTypes['default']
	
	for (let i = 0; i <= 9; i++) {
		var currGrid = createVector(mapGrid.x[i],mapGrid.y[i])
		for (let j = 0; j <= mapGrid.size[i] - 1; j++) {
			if (i % 2 === 0) {
				if (currGrid.x === x && currGrid.y === y) return true
				else if (currGrid.x + 1 === x && currGrid.y === y) return true
				currGrid.y += 1
			}
			else {
				if (currGrid.x === x && currGrid.y === y) return true
				else if (currGrid.x === x && currGrid.y + 1 === y) return true
				currGrid.x += 1
			}
		}
	}
	return false
}

function placeTower(t) {
	//t.setStats()
	if (money < t.cost) { toPlace = false }
	else {
		money   -= t.cost
		toPlace  = false
		updateHoverInfo(t)
		towers.push(t)
		if (t.name === "Farm") { EORcash += t.value }
	}
}

function sell(t) {
	if (towerClicked) {
		money += t.cost * 0.5
		t.sell = true
		if (t.name === "Farm") { EORcash -= t.value }
	}
	toPlace = false
	towerClicked = false
}

// Upgrade Tower
function upgrade(t) {
	if (towerClicked && money > t.upgradecost) {
		t.sell = true
		var replace = new tower(t.x, t.y, towerTypes[t.id + "2"], gridSize)
		// replace.setStats()
		updateHoverInfo(replace)
		towers.push(replace)
		money -= replace.cost
		selectedTower = replace
	}
}

function nextLevel() {
	// Creates number of enemies based on level
	if (!paused) {
		for (let i = 0; i < (level + 5); i++) {
			enemies.push(new enemy(gridSize*2, i * -gridSize*2, gridSize, level))
		}
		// Go to next level and restart frame counter
		level += 1
		ticks  = 0
		EORcash = 50
		for (let i = 0; i < towers.length; i++) {
			if (towers[i].targetType === "money") {
				EORcash += towers[i].value
			}
		}
	}
}

function updateGameStatus() {
	document.getElementById('level').innerHTML = 'Level: ' + level
	document.getElementById('lives').innerHTML = 'Lives: ' + lives
	document.getElementById('money').innerHTML = 'Money: $' + money
	var toggle
	if (autoStart) { toggle = "On" }
	else { toggle = "Off" }
	document.getElementById('autostart').innerHTML = 'Auto Start: ' + toggle
}

function updateHoverInfo(hover) {
	document.getElementById('name').innerHTML          = hover.name
	document.getElementById('cost').innerHTML          = 'Cost: $' + hover.cost
	document.getElementById('upgradecost').innerHTML   = 'Upgrade: $' + hover.upgradecost
	document.getElementById('range').innerHTML         = 'Range: ' + hover.range
	document.getElementById('damage').innerHTML        = 'Damage: ' + hover.damage
	document.getElementById('description').innerHTML   = hover.description
	document.getElementById('tower-div').style.display = 'block'
}

function rotate_and_draw_image(IMAGE, img_x, img_y, img_width, img_height, img_angle){
	imageMode(CENTER);
    translate(img_x+img_width/2, img_y+img_width/2);
    rotate(Math.PI/180*img_angle);
    image(IMAGE, 0, 0, img_width, img_height);
    rotate(-Math.PI / 180 * img_angle);
    translate(-(img_x+img_width/2), -(img_y+img_width/2));
    imageMode(CORNER);
}

function restartGame() {
	enemies      = []
	towers       = []
	projectiles  = []
	level        = 0
	lives        = 30
	money        = 600
	EORcash      = 0
	ticks        = 0
	toPlace      = false
	towerClicked = false
	paused       = false
	autoStart    = false
}

function toggleGrid() { gridState = !gridState }

function togglePause() { paused = !paused }

function toggleAutoStart() { autoStart = !autoStart}

function levelOver() { return enemies.length <= 0 }

// Keybinds
function keyPressed() {
	switch(keyCode) {
		case 27: 
			toPlace                    = false
			towerClicked               = false
			document.getElementById('tower-div').style.display = 'none'
			break
		case 67: 
			paused = !paused
			break
		// q,w,e,r,t for each tower
		case 69: 
			setTower('electricity')
			break
		case 80:
			togglePause()
			break
		case 81: 
			setTower('water')
			break
		case 82: 
			setTower('earth')
			break
		case 84: 
			setTower('farm')
			break
		case 85:
			upgrade(selectedTower)
			break
		case 87:
			setTower('fire')
			break
		case 90:
			sell(selectedTower)
			break
	}
}