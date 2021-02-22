function projectile(x, y, i, towerType, grids, angle) {
    this.x = x
    this.y = y
    this.i = i
    this.pos = createVector(x * grids, y * grids)
    this.angle = angle
    this.towerType = towerType
    
    this.enemy = enemies[i]
    this.speed = 12
    this.size = 15

    if (this.towerType.id === "gatling" || this.towerType.id === "gatling2") {
        this.velocity = p5.Vector.sub(createVector(mouseX, mouseY), this.pos)
        this.velocity.normalize()
        this.velocity.mult(this.speed)
    }
    
    this.draw = function() {
        rotate_and_draw_image(arrow, this.pos.x, this.pos.y, 15, grids-15, this.angle)
    }
    
    this.update = function() {
        if (enemies[i] !== undefined && this.towerType.id !== "gatling" && this.towerType.id !== "gatling2") {
            this.velocity = p5.Vector.sub(createVector(enemies[i].pos.x, enemies[i].pos.y), this.pos)
            this.velocity.normalize()
            this.velocity.mult(this.speed)
        }
        this.pos.add(this.velocity)
    }
}
