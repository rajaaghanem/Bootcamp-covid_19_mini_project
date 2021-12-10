import { conteintMap, conteintObj, flagLoad } from "./covid.js";
import { buildChart, myChart } from "./graph.js";

const dataContainerBtn = document.querySelector('.data_container-continent');

dataContainerBtn.addEventListener('click', (e) => {
    if (flagLoad) {
        getConteintData(e.target.innerText);
        console.log(e.target.innerText);
    }
});

export function getConteintData(conteintName){
    
    let name = conteintName.toLowerCase();
    if (name === 'australia') {
        name = 'oceania';
    }
    myChart.destroy();
    buildChart(conteintObj[`${name}`], `${conteintName}`);
}