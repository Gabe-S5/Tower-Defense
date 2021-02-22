var gridSize = 60
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
var viewTower

function setup() {
	var div    = document.getElementById('canvas-sketch')
	var canvas = createCanvas(div.offsetWidth, div.offsetHeight)
	canvas.parent('canvas-sketch')

	frameRate(FR)
	restartGame()
}

function preload() {
	rectGrass = loadImage('public/imgs/grass_block.png')
	bow       = loadImage('public/imgs/crossbow.png')
	arrow     = loadImage('public/imgs/arrow.png')
	arrowTower= loadImage('public/imgs/arrowTowerTaken.png')
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

		if (!paused) e.move()  // Prevents movement when paused
		
		if (!e.alive || e.health <= 0) {
			money += e.value
			enemies.splice(i, 1)  // Removes enemy from enemies array when dead
		} 
	}

	// Draw projectiles
	for (let i = projectiles.length - 1; i >= 0; i--) {
		let p = projectiles[i]
		p.draw()
		if (!paused) {
			 p.update()
		}
		if (enemies[p.i] === undefined || !enemies[p.i].alive) { projectiles.splice(i, 1) }
		else if (dist(p.pos.x, p.pos.y, enemies[p.i].pos.x, enemies[p.i].pos.y) <= 30) {
			p.enemy.health -= p.towerType.damage
			projectiles.splice(i, 1)
		}

		if (inMap(p.pos.x, p.pos.y)) {
			projectiles.splice(i, 1)
		}
		if (dist(p.pos.x, p.pos.y, p.towerType.pos.x, p.towerType.pos.y) >= p.towerType.range * gridSize/2 && p.towerType.targetType !== "chain") {
			projectiles.splice(i, 1)
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

	// About to place tower, visualize range on screen
	if (toPlace) {
		showRange(towerTypes[selectedTower], mouseX, mouseY)
	}
	// Show range of clicked tower
	if (towerClicked) {
		showRange(selectedTower, selectedTower.pos.x + gridSize/2, selectedTower.pos.y + gridSize/2)
	}

	// When no enemies on the board
	if (levelOver()) {
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

function inMap(x, y) {
	return (x <= 0 || x >= width || y >= height || y <= 0)
}

// Shows info when tower is clicked in the store
function setTower(type) {
	toPlace       = true
	towerClicked  = false
	selectedTower = type
	var t = new tower(0, 0, towerTypes[selectedTower], gridSize)
	t.setStats()
	updateHoverInfo(t)
}

// Draw a circle of radius type.range at x and y 
function showRange(type, x, y) {
	stroke(10, 10, 10, 175)
	strokeWeight(2)
	fill(210,210,210, 175)
	ellipse(x, y, type.range * gridSize, type.range * gridSize)
	
	stroke(50,50,50,175)
	fill(type.color[0], type.color[1], type.color[2], 210)
	rect(x-gridSize/2, y-gridSize/2, gridSize, gridSize)
}

// P5 function, when mouse is clicked and released
function mouseClicked() {
	// Mouse not within the map
	if (inMap(mouseX, mouseY)) return
	// Mouse on the enemy track
	if (mouseOnTrack(mouseX, mouseY)) return
	
	// Check if mouse clicked on a tower
	var blocked = false
	for (var i = towers.length - 1; i >= 0; i--) {
		if (towers[i].x === Math.floor(mouseX/gridSize) && towers[i].y === Math.floor(mouseY/gridSize)) {
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
	else { placeTower(new tower(Math.floor(mouseX/gridSize), Math.floor(mouseY/gridSize), towerTypes[selectedTower], gridSize)) }
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
	t.setStats()
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

function upgrade(t) {
	if (towerClicked) {
		t.sell = true
		var replace = new tower(t.x, t.y, towerTypes[t.id + "2"], gridSize)
		replace.setStats()
		updateHoverInfo(replace)
		towers.push(replace)
		money -= replace.cost
		selectedTower = replace
	}
}

function restartGame() {
	enemies      = []
	towers       = []
	projectiles  = []
	level        = 0
	lives        = 100
	money        = 1000
	EORcash      = 50
	ticks        = 0
	toPlace      = false
	towerClicked = false
	paused       = false
	autoStart    = true
}

function nextLevel() {
	// Creates number of enemies based on level
	if (!paused) {
		for (let i = 0; i < (level + 5); i++) {
			enemies.push(new enemy(gridSize*2, i * -gridSize*2, gridSize))
		}
		// Go to next level and restart frame counter
		level += 1
		ticks  = 0
		money += EORcash
	}
}

function updateGameStatus() {
	document.getElementById('level').innerHTML = 'Level: ' + level
	document.getElementById('lives').innerHTML = 'Lives: ' + lives
	document.getElementById('money').innerHTML = 'Money: $' + money
	document.getElementById('ticks').innerHTML = 'Ticks: ' + ticks
}

function updateHoverInfo(hover) {
	document.getElementById('name').innerHTML          = hover.name
	document.getElementById('cost').innerHTML          = 'Cost: $' + hover.cost
	document.getElementById('range').innerHTML         = 'Range: ' + hover.range
	document.getElementById('damage').innerHTML        = 'Damage: ' + hover.damage
	document.getElementById('description').innerHTML   = hover.description
	document.getElementById('tower-div').style.display = 'block'
}

function drawBackground(g) {
	var gridX = width/g
	var gridY = height/g
	for (let i = 0; i <= gridX; i += 4) {
		for (let j = 0; j <= gridY; j += 4) {
			image(rectGrass, i*g, j*g, g*4, g*4)
		}
	}
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
		case 65: 
			setTower('arrow')
			break
		case 67: 
			paused = !paused
			break
		case 69: 
			setTower('electricity')
			break
		case 70: 
			setTower('farm')
			break
		case 71: 
			setTower('gatling')
			break
		case 82: 
			restartGame()
			break
		case 83:
			setTower('sniper')
			break
		case 85:
			upgrade(selectedTower)
			break
		case 90:
			sell(selectedTower)
			break
	}
}