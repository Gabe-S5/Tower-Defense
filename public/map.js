function enemyTrack(grids) {
    stroke(255, 202, 95)
    strokeWeight(1)
    fill(255,202,95)
    // rect(startX, startY, width, height)
    let laneWidth = grids*2
    mapGrid = mapTypes['default']
    for (let i = 0; i < 9; i++) {
        if (i % 2 === 0) {
            rect(grids * mapGrid.x[i], grids * mapGrid.y[i], laneWidth, grids * mapGrid.size[i])
        }
        else {
            rect(grids * mapGrid.x[i], grids * mapGrid.y[i], grids * mapGrid.size[i], laneWidth)
        }
    }
}

function drawGrid(grids) {

    for( let i = 0; i < width;) {
        line(i, 0, i, height)
        stroke(34,34,34)
        strokeWeight(1)
        i += grids
    }

    for( let j = 0; j < height;) {
        line(0, j, width, j)
        stroke(34,34,34)
        strokeWeight(1)
        j += grids
    }
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
