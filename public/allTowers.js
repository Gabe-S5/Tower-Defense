var towerTypes = {};

// DPS = 15
towerTypes.water = {
    id: "water",
    name: "Water Tower",
    cost: 50,
    upgradecost: 175,
    range: 8,
    damage: 15,
    pierce: 1,
    color: [24, 157, 215],
    fireCoolDown: 1,
    targetCount: 1,
    targetType: "single",
    description: "A basic water tower with well balanced stats."
}

towerTypes.water2 = {
    id: "water2",
    name: "Water Tower Lvl 2",
    cost: 175,
    upgradecost: "MAX",
    range: 10,
    damage: 20,
    pierce: 1,
    color: [24, 94, 215],
    fireCoolDown: 0.8,
    targetCount: 4,
    targetType: "multi",
    description: "An upgraded water tower that has improved stats and can now shoot 4 enemies at once!"
}

// DPS 20
towerTypes.fire = {
    id: "fire",
    name: "Fire Tower",
    cost: 80,
    upgradecost: 225,
    range: 18,
    damage: 60,
    pierce: 1,
    color: [231, 71, 1],
    fireCoolDown: 2,
    targetCount: 1,
    targetType: "single",
    description: "Fires strong shots at long range but has slow firerate."
}

towerTypes.fire2 = {
    id: "fire2",
    name: "Fire Tower Lvl 2",
    cost: 225,
    upgradecost: "MAX",
    range: 20,
    damage: 130,
    pierce: 1,
    color: [196, 32, 1],
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
    color: [253, 247, 53],
    fireCoolDown: 0.6,
    targetCount: 6,
    targetType: "chain",
    description: "Shoots bolts of electricity capable of bouncing to multiple enemies."
}

towerTypes.electricity2 = {
    id: "electricity2",
    name: "Electricity Tower Lvl 2",
    cost: 325,
    upgradecost: "MAX",
    range: 7,
    damage: 7,
    color: [254, 193, 0],
    fireCoolDown: 0.6,
    targetCount: 10,
    targetType: "chain",
    description: "Gain a larger radius and a slight increase in damage."
}

// DPS 37.5
towerTypes.earth = {
    id: "earth",
    name: "Earth Tower",
    cost: 200,
    upgradecost: 400,
    range: 18,
    damage: 15,
    pierce: 3,
    color: [126, 86, 42],
    fireCoolDown: 0.4,
    targetCount: 1,
    targetType: "straight",
    description: "Fires bullets towards mouse cursor. (Bullets still have a max range)"
}

towerTypes.earth2 = {
    id: "earth2",
    name: "Earth Tower Lvl 2",
    cost: 400,
    upgradecost: "MAX",
    range: 22,
    damage: 15,
    pierce: 5,
    color: [114, 70, 42],
    fireCoolDown: 0.25,
    targetCount: 1,
    targetType: "straight",
    description: "Fires even faster!"
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
    upgradecost: "MAX",
    range: 2,
    damage: 0,
    color: [14, 180, 0],
    fireRate: 0,
    targetCount: 1,
    value: 100,
    targetType: "single",
    description: "Generates $100 cash at the end of every round." 
}
