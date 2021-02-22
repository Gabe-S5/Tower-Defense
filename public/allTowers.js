var towerTypes = {};

// DPS = 15
towerTypes.arrow = {
    id: "arrow",
    name: "Arrow Tower",
    cost: 50,
    upgradecost: 175,
    range: 8,
    damage: 15,
    color: [255, 250, 0],
    fireCoolDown: 1,
    targetCount: 1,
    targetType: "single",
    description: "A basic arrow tower with well balanced stats."
}

towerTypes.arrow2 = {
    id: "arrow2",
    name: "Arrow Tower Lvl 2",
    cost: 175,
    upgradecost: "NaN",
    range: 10,
    damage: 20,
    color: [231, 199, 0],
    fireCoolDown: 0.8,
    targetCount: 4,
    targetType: "multi",
    description: "An upgraded arrow tower that has improved stats and can now shoot 4 enemies at once!"
}

// DPS 20
towerTypes.sniper = {
    id: "sniper",
    name: "Sniper Tower",
    cost: 80,
    upgradecost: 225,
    range: 18,
    damage: 40,
    color: [212, 0, 0],
    fireCoolDown: 2,
    targetCount: 1,
    targetType: "single",
    description: "Fires strong shots at long range but has slow firerate. "
}

towerTypes.sniper2 = {
    id: "sniper2",
    name: "Sniper Tower Lvl 2",
    cost: 225,
    upgradecost: "NaN",
    range: 20,
    damage: 90,
    color: [240, 0, 0],
    fireCoolDown: 1.8,
    targetCount: 1,
    targetType: "single",
    description: "Fires a much stronger bullet and gets a slight increase in range and firerate"
}

// DPS 50
towerTypes.electricity = {
    id: "electricity",
    name: "Electricity Tower",
    cost: 150,
    upgradecost: 325,
    upgradecost: 325,
    range: 5,
    damage: 5,
    color: [0, 116, 224],
    fireCoolDown: 0.6,
    targetCount: 6,
    targetType: "chain",
    description: "Shoots bolts of electricity capable of bouncing to multiple enemies."
}

towerTypes.electricity2 = {
    id: "electricity2",
    name: "Electricity Tower Lvl 2",
    cost: 325,
    upgradecost: "NaN",
    range: 7,
    damage: 7,
    color: [0, 130, 240],
    fireCoolDown: 0.6,
    targetCount: 10,
    targetType: "chain",
    description: "Gain a larger radius and a slight increase in damage."
}

// DPS 37.5
towerTypes.gatling = {
    id: "gatling",
    name: "Gatling Gun",
    cost: 200,
    upgradecost: 400,
    range: 15,
    damage: 15,
    color: [144, 0, 228],
    fireCoolDown: 0.4,
    targetCount: 1,
    targetType: "straight",
    description: "Fires bullets towards mouse cursor. (Bullets still have a max range)"
}

towerTypes.gatling2 = {
    id: "gatling2",
    name: "Gatling Gun Lvl 2",
    cost: 400,
    upgradecost: "NaN",
    range: 17,
    damage: 15,
    color: [240, 0, 0],
    fireCoolDown: 0.25,
    targetCount: 1,
    targetType: "straight",
    description: "Fires even faster! "
}

towerTypes.farm = {
    id: "farm",
    name: "Farm",
    cost: 250,
    upgradecost: 500,
    range: 2,
    damage: 0,
    color: [14, 117, 0],
    fireRate: 0,
    targetCount: 1,
    value: 40,
    targetType: "single",
    description: "Generates $40 cash at the end of every round." 
}

towerTypes.farm2 = {
    id: "farm2",
    name: "Farm Lvl 2",
    cost: 500,
    upgradecost: "NaN",
    range: 2,
    damage: 0,
    color: [14, 180, 0],
    fireRate: 0,
    targetCount: 1,
    value: 100,
    targetType: "single",
    description: "Generates $100 cash at the end of every round." 
}
