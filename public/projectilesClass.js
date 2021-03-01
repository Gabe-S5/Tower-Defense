class projectile {
    constructor(x, y, e, towerType, grids, angle, projImg) {
        this.x = x
        this.y = y
        this.e = e
        this.pos = createVector(x * grids, y * grids)
        this.towerType = towerType
        this.grids = grids
        this.angle = angle
        this.projImg = projImg
        
        this.speed = this.grids/5
    }

    draw() {
        rotate_and_draw_image(this.projImg, this.pos.x - this.grids/2, this.pos.y - this.grids/2, this.grids/1.2, this.grids/2, this.angle)
    }
    
    update() {
        this.velocity = p5.Vector.sub(createVector(this.e.pos.x, this.e.pos.y), this.pos)
        this.velocity.normalize()
        this.velocity.mult(this.speed)

        this.pos.add(this.velocity)
    }
}

class straight extends projectile {
    constructor(x, y, e, towerType, grids, angle, projImg) {
        super(x, y, e, towerType, grids, angle, projImg)        

        this.velocity = p5.Vector.sub(createVector(mouseX, mouseY), this.pos)
        this.velocity.normalize()
        this.velocity.mult(this.speed)
    }

    update() {
        this.pos.add(this.velocity)
    }
}

class bounce extends projectile {
    constructor(x, y, e, i, towerType, grids, angle, projImg, pierce) {
        super(x, y, e, towerType, grids, angle, projImg) 
        this.i = i
        this.pierce = pierce

    }

    // Changes target to next enemy in array
    onHit() {
        this.pierce -= 1
        if (this.pierce <= 0 || enemies[this.i] === enemies[this.i+1]) { return false }
        this.i += 1
        if (this.i < enemies.length) {
            this.e = enemies[this.i]
            this.aim(this.e.pos.x, this.e.pos.y)
        }
        return true
    }

    aim(x, y) {
        let distX = this.pos.x - x
        let distY = this.pos.y - y
        this.angle = Math.atan2(distY, distX) * 180 / Math.PI
    }
}