var towerTypes = {};

// DPS = 15
towerTypes.arrow = {
    name: "Arrow Tower",
    cost: 50,
    range: 8,
    damage: 15,
    color: [226, 211, 2],
    fireCoolDown: 1,
    description: "A basic arrow tower with well balanced stats."
}

// DPS 20
towerTypes.sniper = {
    name: "Sniper Tower",
    cost: 80,
    range: 18,
    damage: 40,
    color: [212, 0, 0],
    fireCoolDown: 2,
    description: "Fires strong shots at long range but has slow firerate. "
}

// DPS 50
towerTypes.electricity = {
    name: "Electricity Tower",
    cost: 150,
    range: 5,
    damage: 5,
    color: [0, 116, 224],
    fireCoolDown: 0.1,
    description: "Shoots bolts of electricity capable of bouncing to multiple enemies."
}

// DPS 37.5
towerTypes.gatling = {
    name: "Gatling Gun",
    cost: 200,
    range: 15,
    damage: 15,
    color: [144, 0, 228],
    fireCoolDown: 0.4,
    description: "Fires bullets towards mouse cursor. (Bullets still have a max range)"
}

towerTypes.farm = {
    name: "Farm Plot",
    cost: 250,
    range: 2,
    damage: 0,
    color: [14, 117, 0],
    fireRate: 0,
    description: "Generates cash at the end of every round." 
}

