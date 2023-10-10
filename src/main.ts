import axios from 'axios';

let btn = document.getElementById("generateButton") as HTMLButtonElement;
btn.addEventListener('click', async () => {
    let ran = await spell();
    if (ran) { 
        updateDisplay(ran);
        video();
    }
});

let url: string = "https://api.potterdb.com/v1/spells";

function video() {
    let backgroundVideo = document.getElementById("backgroundVideo") as HTMLVideoElement;
    backgroundVideo.currentTime = 0;
    backgroundVideo.style.display = "block";
    document.body.style.zIndex = "-2";

    backgroundVideo.addEventListener('ended', () => {
        backgroundVideo.currentTime = 0;
        backgroundVideo.style.display = "none"; 
        document.body.style.zIndex = "auto"; 
    });
}

async function spell() {
    try {
        let res = await axios.get(url);
        let spellsData = res.data.data;

        let randomIndex = Math.floor(Math.random() * spellsData.length);

        let randomSpell = spellsData[randomIndex];
        let spellName = randomSpell.attributes.name;
        let spellEffect = randomSpell.attributes.effect;

        return {
            spellName: spellName,
            spellEffect: spellEffect
        };
    } catch (error) {
        console.log("ERROR", error);
    }
}

function updateDisplay(spellData: { spellName: string; spellEffect: string }) {
    let spellNameElement = document.getElementById("spellName") as HTMLElement;
    let spellEffectElement = document.getElementById("spellEffect") as HTMLElement;

    spellNameElement.textContent = spellData.spellName;
    spellEffectElement.textContent = spellData.spellEffect;
}

