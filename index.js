import { powerUpIntervals, upgrades } from "./constants/upgrades.js";
import { defaultUpgradesValues, defaultSkillsValues } from "./constants/values.js";

let gem = document.querySelector('.gem-cost')
let parsedGem = parseFloat(gem.innerHTML)

let gpcText = document.getElementById("gpc-text");
let gpsText = document.getElementById("gps-text");

let gemImgContainer = document.querySelector('.gem-image-container')

let upgradesNavButton = document.getElementById('upgrades-nav-button')
let skillsNavButton = document.getElementById('skills-nav-button')
let artifactNavButton = document.getElementById('artifacts-nav-button')
let prestigeButton = document.querySelector('.prestige-button')

let relic = document.getElementById('relic')

let gpc = 1;
let gps = 0;

const bgMusic = new Audio('./assets/audio/bgmusic.mp3')
bgMusic.volume = 0.2



let isPaused = false;
let intervalId;


function incrementGem(event) {
    const clickingSound = new Audio('./assets/audio/click.wav')
    clickingSound.volume = 0.03
    clickingSound.play()

    gem.innerHTML = Math.round(parsedGem += gpc);

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(gpc)}` 
    div.style.cssText = `color: white; position:absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events:none;`
    
    gemImgContainer.appendChild(div);
    
    div.classList.add('fade-up')

    timeout(div)
};

const timeout = (div) => {
    setTimeout(() => {
        div.remove()
    }, 800)
}

function buyUpgrade(upgrade) {
    const mu = upgrades.find((u) => {
        if (u.name === upgrade) return u;
    });

    const upgradeDiv = document.getElementById(`${mu.name}-upgrade`);
    const nextLevelDiv = document.getElementById(`${mu.name}-next-level`);
    const nextLevelP = document.getElementById(`${mu.name}-next-p`);

    // Ensure that cost and level are DOM elements
    const costElement = document.getElementById(`${mu.name}-cost`);
    const levelElement = document.getElementById(`${mu.name}-level`);

    if (parsedGem >= mu.parsedCost) {
        const upgradeSound = new Audio('./assets/audio/buy1.wav');
        upgradeSound.volume = 0.07;
        upgradeSound.play();

        gem.innerHTML = Math.round(parsedGem -= mu.parsedCost);

        let index = powerUpIntervals.indexOf(parseFloat(levelElement.innerHTML));

        if (index !== -1) {
            upgradeDiv.style.cssText = 'border-color: white';
            nextLevelDiv.style.cssText = 'background-color: blue; font-weight: normal;';
            mu.parsedCost *= mu.costMultplier;
            costElement.innerHTML = Math.round(mu.parsedCost);  // Update cost in HTML

            if (mu.name === 'clicker') {
                gpc *= mu.powerUps[index].multiplier;
                nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per click`;
            } else {
                gps -= mu.power;
                mu.power *= mu.powerUps[index].multiplier;
                gps += mu.power;
                nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per second`;
            }
        }

        levelElement.innerHTML = parseInt(levelElement.innerHTML) + 1;  // Update level in HTML

        index = powerUpIntervals.indexOf(parseFloat(levelElement.innerHTML));

        if (index !== -1) {
            upgradeDiv.style.cssText = 'border-color: orange';
            nextLevelDiv.style.cssText = 'background-color: #CC4500; font-weight: bold; font-size: 14px; padding: 4px';
            nextLevelP.innerText = mu.powerUps[index].description;

            mu.parsedCost = mu.parsedCost * 1.15 * 1.004 ** parseFloat(levelElement.innerHTML);
            costElement.innerHTML = Math.round(mu.parsedCost);  // Update cost in HTML
        } else {
            mu.parsedCost *= mu.costMultplier;
            costElement.innerHTML = Math.round(mu.parsedCost);  // Update cost in HTML
            mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.gemMultiplier).toFixed(2));

            if (mu.name === 'clicker') 
                nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per click`;
             else {
                nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per second`;
            }
        }

        if (mu.name === 'clicker') {
            gpc += mu.parsedIncrease;
            nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per click`;
        } else {
            gps -= mu.power;
            mu.power += mu.parsedIncrease;
            gps += mu.power;
        }
    }
};

    function save() {
        localStorage.clear()

        upgrades.map((upgrade) => {
            const obj = JSON.stringify({
                parsedLevel: parseFloat(upgrade.level.innerHTML),
                parsedCost: upgrade.parsedCost,
                parsedIncrease: upgrade.parsedIncrease

            })

            localStorage.setItem(upgrade.name, obj)
        })

        localStorage.setItem('gpc', JSON.stringify(gpc))
        localStorage.setItem('gps', JSON.stringify(gps))
        localStorage.setItem('gem', JSON.stringify(parsedGem))
    };

    function load() {
        upgrades.map((upgrade) => {
            const savedValues = JSON.parse(localStorage.getItem(upgrade.name))

            upgrade.parsedCost = savedValues.parsedCost
            upgrade.parsedIncrease = savedValues.parsedIncrease
            upgrade.level.innerHTML = savedValues.parsedLevel
            upgrade.cost.innerHTML = Math.round(upgrade.parsedCost)
            upgrade.increase.innerHTML = upgrade.parsedIncrease
        })

        gpc = JSON.parse(localStorage.getItem('gpc'))
        gps = JSON.parse(localStorage.getItem('gps'))
        parsedGem = JSON.parse(localStorage.getItem('gem'))

        gem.innerHTML = Math.round(parsedGem)

    }

    function prestige() {
        upgrades.map ((upgrade) => {
         const mu = defaultUpgradesValues.find((u) => {
             if (upgrade.name === u.name) return u
         })
 
             upgrade.parsedCost = mu.cost
             upgrade.parsedIncrease = mu.increase
             upgrade.level.innerHTML = 0
             upgrade.cost.innerHTML = mu.cost
             upgrade.increase.innerHTML = mu.increase

             const upgradeDiv = document.getElementById(`${mu.name}-upgrade`);
             const nextLevelDiv = document.getElementById(`${mu.name}-next-level`);
             const nextLevelP = document.getElementById(`${mu.name}-next-p`);

             upgradeDiv.style.cssText = 'border-color: white';
             nextLevelDiv.style.cssText = 'background-color: blue; font-weight: normal;';

             nextLevelP.innerHTML = `+${mu.increase} gems per click` 
        })

        relic.innerHTML = Math.ceil(Math.sqrt(parsedGem - 999999 ) / 300)

        gpc = 1
        gps = 0
        parsedGem = 0
        gem.innerHTML = parsedGem
     }

    function pause() {
        const pauseButton = document.getElementById("pause-button");
    
        if (isPaused) {
            // Resume the game
            intervalId = setInterval(gameLoop, 100);
            pauseButton.innerText = "Pause";
        } else {
            // Pause the game
            clearInterval(intervalId);
            pauseButton.innerText = "Resume";
        }
    
        isPaused = !isPaused;
    }


// setInterval(() => {

//     parsedGem += gps / 10
//     gem.innerHTML =  Math.round(parsedGem);
//     gpcText.innerHTML = Math.round(gpc)
//     gpsText.innerHTML = Math.round(gps)

// },100)

function gameLoop() {
    parsedGem += gps / 10;
    gem.innerHTML = Math.round(parsedGem);
    gpcText.innerHTML = Math.round(gpc);
    gpsText.innerHTML = Math.round(gps);
    bgMusic.play();

    if (parsedGem >= 1_000_000) {
        prestigeButton.style.display = "block"
    } else {
        prestigeButton.style.display = "none"
    }
}

// Start the game loop when the game loads
intervalId = setInterval(gameLoop, 100);

skillsNavButton.addEventListener("click", function() {
    const upgradeContainers = document.querySelectorAll(".upgrade")

    upgradeContainers.forEach((container) => {
       if (container.classList.contains('type-skill')) container.style.display = "flex"
       else container.style.display = "none"
    })
})

upgradesNavButton.addEventListener("click", function() {
    const upgradeContainers = document.querySelectorAll(".upgrade")

    upgradeContainers.forEach((container) => {
        if (container.classList.contains('type-upgrade')) container.style.display = "flex"
       else container.style.display = "none"
    })
})

artifactNavButton.addEventListener("click", function() {
    const upgradeContainers = document.querySelectorAll(".upgrade")

    upgradeContainers.forEach((container) => {
        if (container.classList.contains('type-artifact')) container.style.display = "flex"
       else container.style.display = "none"
    })
})



window.incrementGem = incrementGem;
window.buyUpgrade = buyUpgrade;
window.save= save;
window.load = load;
window.prestige = prestige;
window.pause = pause;
