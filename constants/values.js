export const defaultUpgradesValues = [
    {name: 'clicker', image: './assets/micro.png', cost: 10, increase: 1, type: "upgrade"},
    {name: 'pickaxe', image: './assets/axe.png', cost: 150, increase: 4, type: "upgrade"},
    {name: 'miner', image: './assets/salesforce.png', cost: 1000, increase: 10, type: "upgrade"},
    {name: 'factory', image: './assets/Bootstrap.png', cost: 3000, increase: 24, type: "upgrade"},
    {name: 'plant', image: './assets/css.png', cost: 5000, increase: 40, type: "upgrade"}
]

export const defaultSkillsValues = [
    {
        name: "Hyperclicker",
        description: "Double your clicking power for 30 seconds",
        image: "./assets/instagram.png",
        cd: 600,
        cost: 12000,
        increase: 8,
        type: "skill"
    },
    {
        name: "Lucky Day",
        description: "Gain 600xGPS worth of gems instantly",
        image: "./assets/instagram.png",
        cd: 900,
        cost: 20000,
        increase: 10,
        type: "skill"
    },
]

export const defaultArtifactsValues = [
    {
        name: "Artifact One",
        description: "Permantently increase all gems gained by x amount",
        image: "./assets/React.png",
        cost: 15000000,
        increase: "Permanent",
        type: "artifact"
    }
]