import { defaultArtifactsValues } from "./values.js";

function createUpgrade() {
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent;

    defaultArtifactsValues.forEach((obj) => {
        let html = template;

        Object.keys(obj).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`,'g');
            html = html.replace(regex, obj[key])
        });

        upgradesContainer.innerHTML += html
    })
}

createUpgrade();