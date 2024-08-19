import { defaultUpgradesValues } from "./values.js";

function createUpgrade() {
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent

    defaultUpgradesValues.forEach((obj) => {
        let html = template;

        Object.keys(obj).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`,'g');
            html = html.replace(regex, obj[key])
        });

        upgradesContainer.innerHTML += html
    })
}

createUpgrade();
 
export const upgrades = [
    {
        name: 'clicker',
        cost: document.querySelector('.clicker-cost'),
        parsedCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        increase: document.querySelector(".clicker-increase"),
        parsedIncrease: parseFloat(document.querySelector(".clicker-increase").innerHTML),
        level: document.querySelector(".clicker-level"),
        powerUps: [
            {
                name: "2x clicker",
                description: "Double your clicking power",
                multiplier: 2
            },
            {
                name: "3x clicker",
                description: "Triple your clicking power",
                multiplier: 3
            },
            {
                name: "1.5x clicker",
                description: "Increase your clicking power",
                multiplier: 1.5
            },
        ],
        gemMultiplier: 1.1,
        costMultplier: 1.12,
    },
    {
        name: 'pickaxe',
        cost: document.querySelector('.pickaxe-cost'),
        parsedCost: parseFloat(document.querySelector('.pickaxe-cost').innerHTML),
        increase: document.querySelector(".pickaxe-increase"),
        parsedIncrease: parseFloat(document.querySelector(".pickaxe-increase").innerHTML),
        level: document.querySelector(".pickaxe-level"),
        powerUps: [
            {
                name: "2x pickaxe",
                description: "Double your pickaxe power",
                multiplier: 2
            },
            {
                name: "3x pickaxe",
                description: "Triple your pickaxe power",
                multiplier: 3
            },
            {
                name: "1.5x pickaxe",
                description: "Increase your pickaxe power",
                multiplier: 1.5
            },
        ],
        power: 0,
        gemMultiplier: 1.15,
        costMultplier: 1.115,
    },
    {
        name: 'miner',
        cost: document.querySelector('.miner-cost'),
        parsedCost: parseFloat(document.querySelector('.miner-cost').innerHTML),
        increase: document.querySelector(".miner-increase"),
        parsedIncrease: parseFloat(document.querySelector(".miner-increase").innerHTML),
        level: document.querySelector(".miner-level"),
        powerUps: [
            {
                name: "2x miner",
                description: "Double your miner power",
                multiplier: 2
            },
            {
                name: "3x miner",
                description: "Triple your miner power",
                multiplier: 3
            },
            {
                name: "1.5x miner",
                description: "Increase your miner power",
                multiplier: 1.5
            },
        ],
        power: 0,
        gemMultiplier: 1.30,
        costMultplier: 1.11,
    },
    {
        name: 'factory',
        cost: document.querySelector('.factory-cost'),
        parsedCost: parseFloat(document.querySelector('.factory-cost').innerHTML),
        increase: document.querySelector(".factory-increase"),
        parsedIncrease: parseFloat(document.querySelector(".factory-increase").innerHTML),
        level: document.querySelector(".factory-level"),
        powerUps: [
            {
                name: "2x factory",
                description: "Double your factory power",
                multiplier: 2
            },
            {
                name: "3x factory",
                description: "Triple your factory power",
                multiplier: 3
            },
            {
                name: "1.5x factory",
                description: "Increase your factory power",
                multiplier: 1.5
            },
        ],
        power: 0,
        gemMultiplier: 1.55,
        costMultplier: 1.10,
    },
    {
        name: 'plant',
        cost: document.querySelector('.plant-cost'),
        parsedCost: parseFloat(document.querySelector('.plant-cost').innerHTML),
        increase: document.querySelector(".plant-increase"),
        parsedIncrease: parseFloat(document.querySelector(".plant-increase").innerHTML),
        level: document.querySelector(".plant-level"),
        powerUps: [
            {
                name: "2x plant",
                description: "Double your plant power",
                multiplier: 2
            },
            {
                name: "3x plant",
                description: "Triple your plant power",
                multiplier: 3
            },
            {
                name: "1.5x plant",
                description: "Increase your plant power",
                multiplier: 1.5
            },
        ],
        power: 0,
        gemMultiplier: 1.80,
        costMultplier: 1.25,
    },
] 

export const powerUpIntervals = [10, 20, 30, 50, 70, 10, 150, 200, 250, 300]

