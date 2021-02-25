function projectile(x, y, e, towerType, grids, angle, projImg) {
    this.x = x
    this.y = y
    this.e = e
    this.pos = createVector(x * grids, y * grids)
    this.angle = angle
    this.towerType = towerType
    
    this.speed = 12
    this.size = 15

    if (this.towerType.targetType === "straight") {
        this.velocity = p5.Vector.sub(createVector(mouseX, mouseY), this.pos)
        this.velocity.normalize()
        this.velocity.mult(this.speed)
    }
    
    this.draw = function() {
        rotate_and_draw_image(projImg, this.pos.x, this.pos.y, 50, 30, this.angle)
    }
    
    this.update = function() {
        if (this.towerType.targetType !== "straight") {
            this.velocity = p5.Vector.sub(createVector(this.e.pos.x, this.e.pos.y), this.pos)
            this.velocity.normalize()
            this.velocity.mult(this.speed)
        }

        this.pos.add(this.velocity)
    }
}

function bolt(x, y, e, towerType, grids, angle, pierce) {
    this.x = x
    this.y = y
    this.e = e
    this.towerType = towerType
    this.angle = angle
    this.pierce = pierce

    this.pos = createVector(x * grids, y * grids)
}