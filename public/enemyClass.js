function enemy(x, y, grids) {
    this.pos   = createVector(x,y)
    this.alive = true
    this.value = 5
    this.maxHP = 100 + level * 5
    this.health = this.maxHP

    // Velocity
    this.speed = 2 + (level * 0.2)
    this.vel   = createVector(0,this.speed)

    // Enemy Color
    if (level % 2 === 0) { this.color = [255,0,255] }
    else { this.color = [0,255,255] }

    // Draw Enemy
    this.draw = function() {
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, grids, grids)
        if (this.health < this.maxHP) {
            fill(255,0,0)
            rect(this.pos.x - grids/2, this.pos.y + grids - 10, grids * (this.health/this.maxHP), 10)
        }
    }

    // Moving enemy function
    this.turn = 0
    this.move = function() {
        switch (this.turn) {
            case 0:
                if (this.pos.y >= grids*10) { this.turn += 1 }
                break
            case 1:
                this.vel = createVector(this.speed,0)
                if (this.pos.x >= grids*10) { this.turn += 1 }
                break
            case 2: 
                this.vel = createVector(0,-this.speed)
                if (this.pos.y <= grids*6) {this.turn += 1 }
                break
            case 3:
                this.vel = createVector(-this.speed, 0)
                if (this.pos.x <= grids*6) { this.turn += 1 }
                break
            case 4:
                this.vel = createVector(0, -this.speed)
                if (this.pos.y <= grids*1) { this.turn += 1 }
                break
            case 5:
                this.vel = createVector(this.speed, 0)
                if (this.pos.x >= grids*16) { this.turn += 1 }
                break
            case 6:
                this.vel = createVector(0, this.speed)
                if (this.pos.y >= grids*10) { this.turn += 1}
                break
            case 7:
                this.vel = createVector(this.speed, 0)
                if (this.pos.x >= grids*24) { this.turn += 1}
                break
            case 8: 
                this.vel = createVector(0, -this.speed)
                if (this.pos.y <= 0 - grids) { this.turn += 1}
                break
            case 9:
                this.exit()
                break
        }
        this.pos.add(this.vel)
    }

    // Gives money for killing
    this.kill = function() {
        money      += this.value
        this.alive  = false
    }

    // Reduces lives on exit
    this.exit = function() {
        lives      -= 1
        this.alive  = false
    }
}