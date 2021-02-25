function tower(x, y, towerInfo, grids) {
    this.x = x
    this.y = y
    this.pos = createVector(x * grids, y * grids)
    this.sell = false
    this.angle = 0
    this.hasShot = false

    // Grabs stats from tower object
    this.setStats = function() {
        var keys = Object.keys(towerInfo)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            this[key] = towerInfo[key]
        }
        this.fireRate = this.fireCoolDown * FR

        switch(this.id) {
            case "water":
            case "water2":
                this.projImg = waterAttack
                break
            case "fire":
            case "fire2":
                this.projImg = fireAttack
                break
            case "earth":
            case "earth2":
                this.projImg = earthAttack
                break
            default:
                this.projImg = earthAttack
        }
    }

    // Draws tower
    this.draw = function() {
        stroke(0)
        strokeWeight(1)
        fill(this.color)
        ellipseMode(CENTER)
        ellipse(this.pos.x, this.pos.y, grids, grids)
        
        //rotate_and_draw_image(bow, this.pos.x, this.pos.y, grids, grids, this.angle + 180)
    }

    // Shoots when cooldown allows it
    this.shoot = function(e, i, attacks) {
        if (this.fireRate <= 0) {
            for (let j = attacks, k = i; j > 0 && k < e.length; k++, j--) {
                if (dist(this.pos.x, this.pos.y, e[k].pos.x, e[k].pos.y) <= this.range * grids / 2 && (this.targetType === "single" || this.targetType === "multi")) {
                    this.aim(e[k].pos.x, e[k].pos.y)
                    var p = new projectile(this.x - 0.5, this.y - 0.5, e[k], this, grids, this.angle, this.projImg)
                    projectiles.push(p)
                }
                else if (this.targetType === "chain") {
                    this.aim(e[k].pos.x, e[k].pos.y)
                    var p = new projectile(this.x - 0.5, this.y - 0.5, e[k], this, grids, this.angle, this.projImg)
                    projectiles.push(p)
                }
            }
            this.fireRate = this.fireCoolDown * FR
        }
        if (e[i].health <= 0) { this.kill(e, i) }
    }
    
    this.shootStraight = function() {
        if (this.fireRate <= 0) {
            this.aim(mouseX, mouseY)
            var p = new projectile(this.x - 0.5, this.y - 0.5, 0, this, grids, this.angle, this.projImg)
            projectiles.push(p)
            this.fireRate = this.fireCoolDown * FR
        }
    }

    this.kill = function(e, i) {
        e[i].alive = false
    }
    
    // Target first enemy in the array that is within range
    this.target = function(e) {
        if (this.targetType === "straight" && e.length > 0) { this.shootStraight() }
        else {
            for (let i = 0; i <= e.length-1; i++) {
                var distSq = sq(this.pos.x + grids/2 - e[i].pos.x) + sq(this.pos.y + grids/2 - e[i].pos.y)
                if (distSq < sq(this.range/2 * grids)) {
                    this.shoot(e, i, this.targetCount)
                    return(e[i])
                }
            }
        }
        return(null)
    }

    // Finds angle from tower coord to x and y coord
    this.aim = function(x, y) {
        var distX = this.pos.x + grids/2 - x
        var distY = this.pos.y + grids/2 - y
        this.angle = Math.atan2(distY, distX) * 180 / Math.PI
    }

    // Counts firerate down
    this.cooldown = function() {
        if (this.fireRate > 0) { this.fireRate -= 1 }
    }
}

