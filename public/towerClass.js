function tower(x, y, towerInfo, grids) {
    this.x = x
    this.y = y
    this.pos = createVector(x * grids, y * grids)
    this.sell = false

    // Grabs stats from tower object
    this.setStats = function() {
        var keys = Object.keys(towerInfo)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            this[key] = towerInfo[key]
        }
        this.fireRate = this.fireCoolDown * FR
    }

    // Draws tower
    this.draw = function() {
        stroke(0)
        strokeWeight(1)
        fill(this.color)
        rect(this.pos.x, this.pos.y, grids, grids)
    }

    // Shoots when cooldown allows it
    this.attack = function(e, i, attacks) {
        if (this.fireRate <= 0) {
            for (let j = attacks, k = i; j > 0 && k < e.length; k++, j--) {
                e[k].health -= this.damage
                this.fireRate = this.fireCoolDown * FR
            }
        }
        if (e[i].health <= 0) { this.kill(e, i) }
    }

    // Gives player money for kill and removes enemy from array
    this.kill = function(e, i) {
        money += e[i].value
        e.splice(i, 1)
    }
    
    // Target first enemy in the array that is within range
    this.target = function(e) {
        for (let i = 0; i <= e.length-1; i++) {
            var distSq = sq(this.pos.x + grids/2 - e[i].pos.x) + sq(this.pos.y + grids/2 - e[i].pos.y)
            if (distSq < sq(this.range/2 * grids)) {
                this.attack(e, i, this.targetCount)
                break
            }
        }
    }

    // Counts firerate down
    this.cooldown = function() {
        if (this.fireRate > 0) { this.fireRate -= 1 }
    }
}