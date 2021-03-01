class tower {
    constructor(x, y, towerInfo, grids) {
        this.x = x
        this.y = y
        this.grids = grids
        this.pos = createVector(x * this.grids, y * this.grids)
        this.sell = false
        this.angle = 0
        this.hasShot = false
        this.towerInfo = towerInfo
    
        // Uses allTowers.js template
        var keys = Object.keys(towerInfo)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            this[key] = this.towerInfo[key]
        }
        this.fireRate = this.fireCoolDown * FR

        // Grab images for each corresponding tower
        switch(true) {
            case this.id.startsWith('water'):
                this.projImg = waterAttack
                this.towerImg = waterTower
                break
            case this.id.startsWith('fire'):
                this.projImg = fireAttack
                this.towerImg = fireTower
                break
            case this.id.startsWith('electricity'):
                this.projImg = earthAttack
                this.towerImg = waterTower
                break
            case this.id.startsWith('earth'):
                this.projImg = earthAttack
                this.towerImg = waterTower
                break
            case this.id.startsWith('farm'):
                this.projImg = earthAttack
                this.towerImg = waterTower
                break
            default:
                this.projImg = earthAttack
                this.towerImg = waterTower
        }
    }

    // Grabs stats from tower object

    // Draws tower
    draw() {
        stroke(0)
        strokeWeight(1)
        fill(this.color)
        rotate_and_draw_image(this.towerImg, this.pos.x - this.grids/2, this.pos.y - this.grids/2, this.grids-10, this.grids, this.angle)
        
    }

    shoot(i) {
        for (let j = this.targetCount, k = i; j > 0 && k < enemies.length; k++, j--) {
            let tx = enemies[k].pos.x, ty = enemies[k].pos.y
            let t = enemies[k]
            if (this.inRange(tx, ty) && this.targetType !== "chain") {
                this.aim(tx, ty)
                var p = new projectile(this.x, this.y, t, this, this.grids, this.angle, this.projImg)
                projectiles.push(p)
            }
        }
        this.fireRate = this.fireCoolDown * FR
    }

    shootBounce(i) {
        if (this.inRange(enemies[i].pos.x, enemies[i].pos.y)) {
            this.aim(enemies[i].pos.x, enemies[i].pos.y) 
            var p = new bounce(this.x, this.y, enemies[i], i, this, this.grids, this.angle, this.projImg, this.pierce)
            projectiles.push(p)
        }
        this.fireRate = this.fireCoolDown * FR
    }
    
    shootStraight() {
        var p = new straight(this.x, this.y, 0, this, this.grids, this.angle, this.projImg)
        projectiles.push(p)
        this.fireRate = this.fireCoolDown * FR
    }
    
    // Target first enemy in the array that is within range
    target() {
        if (this.targetType === "straight" && enemies.length > 0) { 
            this.aim(mouseX, mouseY)
            if (this.fireRate <= 0) { this.shootStraight() }
        }
        else {
            for (let i = 0; i < enemies.length; i++) {
                let e = enemies[i]
                if (this.inRange(e.pos.x, e.pos.y)) {
                    this.aim(e.pos.x, e.pos.y)
                    if (this.targetType === "chain" && this.fireRate <= 0) { this.shootBounce(i) }
                    else if (this.fireRate<= 0) { this.shoot(i) }

                    if (enemies[i].health <= 0) { this.kill(i) }
                    
                    return(e[i])
                }
            }
        }
        return(null)
    }
    
    // Finds angle from tower coord to x and y coord
    aim(x, y) {
        let distX = this.pos.x - x
        let distY = this.pos.y - y
        this.angle = Math.atan2(distY, distX) * 180 / Math.PI
    }
    
    // Counts firerate down
    cooldown() {
        if (this.fireRate > 0) { this.fireRate -= 1 }
    }

    kill(i) {
        enemies[i].alive = false
    }

    inRange(ex, ey) {
        if (dist(ex, ey, this.pos.x, this.pos.y) <= this.range/2 * this.grids) {
            return true
        }
        return false
    }
}

