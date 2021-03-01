class enemy {
    constructor(x, y, grids, level) {
        this.pos   = createVector(x,y)
        this.alive = true
        this.value = 5
        this.level = level
        this.maxHP = Math.pow(2, level) + 100
        this.health = this.maxHP
        this.grids = grids
    
        // Velocity
        this.speed = this.grids/30 + Math.sqrt(level)
        this.vel   = createVector(0,this.speed)
    
        // Enemy Color
        if (level % 2 === 0) { this.color = [255,0,255] }
        else { this.color = [0,255,255] }
    
        this.turn = 0
    }

    // Draw Enemy
    draw() {
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, this.grids, this.grids)
        if (this.health < this.maxHP && this.health >= 0) {
            fill(255,0,0)
            rect(this.pos.x - this.grids/2, this.pos.y + this.grids - 10, this.grids * (this.health/this.maxHP), 10)
        }
    }

    update() {
        if (this.health <= 0) {
            money += this.value
            this.kill()
        }
    }

    // Moving enemy function
    move() {
        switch (this.turn) {
            case 0:
                if (this.pos.y >= this.grids*10) { this.turn += 1 }
                break
            case 1:
                this.vel = createVector(this.speed,0)
                if (this.pos.x >= this.grids*10) { this.turn += 1 }
                break
            case 2: 
                this.vel = createVector(0,-this.speed)
                if (this.pos.y <= this.grids*6) {this.turn += 1 }
                break
            case 3:
                this.vel = createVector(-this.speed, 0)
                if (this.pos.x <= this.grids*6) { this.turn += 1 }
                break
            case 4:
                this.vel = createVector(0, -this.speed)
                if (this.pos.y <= this.grids*1) { this.turn += 1 }
                break
            case 5:
                this.vel = createVector(this.speed, 0)
                if (this.pos.x >= this.grids*16) { this.turn += 1 }
                break
            case 6:
                this.vel = createVector(0, this.speed)
                if (this.pos.y >= this.grids*10) { this.turn += 1}
                break
            case 7:
                this.vel = createVector(this.speed, 0)
                if (this.pos.x >= this.grids*24) { this.turn += 1}
                break
            case 8: 
                this.vel = createVector(0, -this.speed)
                if (this.pos.y <= 0 - this.grids) { this.turn += 1}
                break
            case 9:
                this.exit()
                break
        }
        this.pos.add(this.vel)
    }

    // Gives money for killing
    kill() {
        this.alive  = false
    }

    // Reduces lives on exit
    exit() {
        lives      -= 1
        this.alive  = false
    }
}