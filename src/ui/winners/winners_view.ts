import * as api from '../../api/api'
import { order, sort } from '../../types/types'

localStorage.current_winners_page = 1;
let sort_order: order = 'ASC';
const winners_page_limit = 10;

(() => {
    const winners = document.createElement("div");
    winners.classList.add("winners");
    winners.classList.add("display");
    winners.innerHTML = `
    <h2>Winners (<span id="winners-counter">0</span>)</h2>
    <h3>Page #<span id="winners-page-counter">1</span></h3>
    <div class="winners-wrapper">
        <table>
            <thead>
                <th id="winner_id">Number</th>
                <th>Car</th>
                <th>Name</th>
                <th id="winner_wins">Wins</th>
                <th id="winner_time">Best time (sec)</th>
            </thead>
            <tbody>
            
            </tbody>
            
        </table>
    </div>
    <div class="controls">
        <button id="winners_prev_page">Previous</button>
        <button id="winners_next_page">Next</button>
    </div>
    `
    document.querySelector(".container")!.insertBefore(winners, document.querySelector(".garage-container"));
    
    renderTable(Number(localStorage.current_winners_page), winners_page_limit, 'id', sort_order);
    (<HTMLButtonElement>document.getElementById('winners_prev_page'))!.disabled = true;
    (<HTMLButtonElement>document.getElementById('garage'))!.disabled = true;
})();

document.getElementById("winners_prev_page")!.addEventListener('click', async () => {
    localStorage.current_winners_page = Number(localStorage.current_winners_page) - 1;
    await renderTable(Number(localStorage.current_winners_page), winners_page_limit, 'id', sort_order);
})

document.getElementById("winners_next_page")!.addEventListener('click', async () => {
    localStorage.current_winners_page = Number(localStorage.current_winners_page) + 1;
    await renderTable(Number(localStorage.current_winners_page), winners_page_limit, 'id', sort_order);
})

document.getElementById("winner_wins")?.addEventListener('click', () => {
    swapSortingOrder();
    renderTable(Number(localStorage.current_winners_page), winners_page_limit, 'wins', sort_order)
})

document.getElementById("winner_time")?.addEventListener('click', () => {
    swapSortingOrder();
    renderTable(Number(localStorage.current_winners_page), winners_page_limit, 'time', sort_order)
})

function swapSortingOrder(){
    sort_order = sort_order === 'ASC' ? 'DESC' : 'ASC';
}

document.getElementById("winners")?.addEventListener('click', () => {
    document.querySelector(".winners")!.classList.toggle('display');
    document.querySelector(".garage-container")!.classList.toggle('display');
    (<HTMLButtonElement>document.getElementById('garage'))!.disabled = false;
    (<HTMLButtonElement>document.getElementById('winners'))!.disabled = true;
    renderTable(Number(localStorage.current_winners_page), winners_page_limit, 'id', sort_order)
});

document.getElementById("garage")?.addEventListener('click', () => {
    document.querySelector(".winners")!.classList.toggle('display');
    document.querySelector(".garage-container")!.classList.toggle('display');
    (<HTMLButtonElement>document.getElementById('garage'))!.disabled = true;
    (<HTMLButtonElement>document.getElementById('winners'))!.disabled = false;
});

async function renderTable(page: number, limit: number = 7, sort: sort, order: order){
    const response = await api.getWinners(page, limit, sort, order);
    document.getElementById('winners-page-counter')!.textContent = localStorage.current_winners_page;
    document.getElementById('winners-counter')!.textContent = response.count

    let rows = '';
    let count = 1;
    response.items.forEach(item => {
        rows += createRow(count, item.wins, item.time, item.car.name, item.car.color)
        count++;
    });
    document.querySelector('tbody')!.innerHTML = rows;

    (<HTMLButtonElement>document.getElementById("winners_prev_page"))!.disabled = Number(localStorage.current_winners_page) === 1 ? true : false;
    (<HTMLButtonElement>document.getElementById("winners_next_page"))!.disabled = winners_page_limit * Number(localStorage.current_winners_page) < Number(response.count) ? false : true;
}

function createRow(id: number, wins: number, time: number, name: string, color: string){
    return `
    <tr>
        <th>${id}</th>
        <th>${getCarSVG(color)}</th>
        <th>${name}</th>
        <th>${wins}</th>
        <th>${time}</th>
    </tr>
    `
}

function getCarSVG(color: string) {
  return `
    <svg enable-background="new 0 0 1000 600" height="600" id="" overflow="visible" version="1.1"
        viewBox="0 0 1000 600" width="1000" xml:space="preserve">
        <g id="">
            <g>
                <path
                    d="M251.072,391.644c-1.449,0-2.624,1.175-2.624,2.624s1.175,2.624,2.624,2.624s2.624-1.175,2.624-2.624    S252.521,391.644,251.072,391.644z M251.072,374.076c-3.419,0-6.19,2.771-6.19,6.19s2.771,6.19,6.19,6.19s6.191-2.771,6.191-6.19    S254.491,374.076,251.072,374.076z M242.251,361.612c0.607-0.288,1.229-0.548,1.867-0.776v-21.254    c-6.215,1.055-11.957,3.5-16.895,7.002L242.251,361.612z M251.072,312.688c-37.322,0-67.578,30.256-67.578,67.578    s30.255,67.578,67.578,67.578s67.578-30.256,67.578-67.578S288.395,312.688,251.072,312.688z M251.072,428.537    c-26.659,0-48.27-21.611-48.27-48.271c0-26.658,21.611-48.27,48.27-48.27s48.27,21.611,48.27,48.27    C299.342,406.926,277.731,428.537,251.072,428.537z M258.025,399.698v21.253c6.216-1.055,11.958-3.499,16.896-7.002    l-15.028-15.028C259.286,399.209,258.664,399.47,258.025,399.698z M270.502,373.313h21.256    c-1.056-6.216-3.499-11.958-7.002-16.896l-15.027,15.027C270.016,372.052,270.273,372.676,270.502,373.313z M269.727,389.087    l15.028,15.028c3.503-4.938,5.948-10.68,7.002-16.896h-21.254C270.275,387.857,270.014,388.48,269.727,389.087z M227.224,413.948    c4.938,3.503,10.679,5.948,16.895,7.003v-21.253c-0.638-0.229-1.259-0.49-1.866-0.778L227.224,413.948z M262.45,380.266    c0,1.449,1.175,2.624,2.624,2.624s2.624-1.175,2.624-2.624s-1.175-2.624-2.624-2.624S262.45,378.816,262.45,380.266z     M274.92,346.585c-4.938-3.502-10.679-5.948-16.895-7.003v21.254c0.638,0.228,1.259,0.49,1.866,0.777L274.92,346.585z     M251.072,368.889c1.449,0,2.624-1.175,2.624-2.624s-1.175-2.624-2.624-2.624s-2.624,1.175-2.624,2.624    S249.623,368.889,251.072,368.889z M231.643,387.22h-21.256c1.055,6.216,3.498,11.958,7.002,16.896l15.027-15.027    C232.129,388.481,231.872,387.857,231.643,387.22z M232.418,371.446l-15.028-15.028c-3.503,4.938-5.948,10.68-7.002,16.896h21.254    C231.87,372.675,232.131,372.053,232.418,371.446z M239.695,380.266c0-1.449-1.175-2.624-2.624-2.624    c-1.449,0-2.625,1.175-2.625,2.624s1.175,2.624,2.625,2.624C238.52,382.89,239.695,381.715,239.695,380.266z M785.336,374.076    c-3.419,0-6.19,2.771-6.19,6.19s2.771,6.19,6.19,6.19s6.19-2.771,6.19-6.19S788.755,374.076,785.336,374.076z M785.336,391.644    c-1.449,0-2.624,1.175-2.624,2.624s1.175,2.624,2.624,2.624s2.624-1.175,2.624-2.624S786.785,391.644,785.336,391.644z     M804.766,373.313h21.256c-1.056-6.216-3.499-11.958-7.002-16.896l-15.028,15.027    C804.279,372.052,804.537,372.676,804.766,373.313z M785.336,312.688c-37.322,0-67.578,30.256-67.578,67.578    s30.256,67.578,67.578,67.578s67.578-30.256,67.578-67.578S822.658,312.688,785.336,312.688z M785.336,428.537    c-26.658,0-48.27-21.611-48.27-48.271c0-26.658,21.611-48.27,48.27-48.27c26.659,0,48.27,21.611,48.27,48.27    C833.605,406.926,811.995,428.537,785.336,428.537z M803.99,389.087l15.028,15.028c3.503-4.938,5.947-10.68,7.002-16.896h-21.254    C804.539,387.857,804.278,388.48,803.99,389.087z M936.447,342.828c-1.252-1.845-4.856-2.665-5.915-4.436    c-1.417-2.369-1.364-7.17-2.465-9.858c-9.218-22.513-19.371-29.408-32.532-37.461c-18.479-11.308-38.207-15.987-60.135-24.153    c1.057,0.394-33.068-8.901-41.404-10.351c-5.126-1.68-23.627-7.028-28.096-5.422c-4.913-5.075-13.582-7.57-19.717-11.337    c-9.902-6.081-20.112-12.629-30.067-18.73c-5.321-3.262-10.92-5.121-16.266-8.38c-13.837-8.436-44.362-22.181-44.362-22.181    s-112.554-63.401-509.176-28.589c-4.79,0.466-10.684,0.14-14.294,2.465c-0.493,0.164-0.986,0.328-1.479,0.492    c0.087,3.815,1.864,15.823,0,18.73c-0.563,4.381-9.026,11.135-11.83,14.295c-6.536,7.366-13.401,15.301-19.223,23.167    c-2.676,3.615-5.231,8.74-8.873,11.337c-1.146,1.143-7.631,10.669-10.351,14.787c-2.579,3.904-7.657,13.699-8.873,18.237    c-2.515,9.391,0.97,21.254,2.465,28.589c0.114,0.559-0.234,15.626,0,22.181c-1.671,6.001-5.517,12.488-7.887,18.238    c-2.648,6.425-3.191,11.518-8.379,15.28c-0.677,13.506,0.289,26.086,6.408,34.011c3.67,4.753,17.75,26.617,17.75,26.617h103.556    c-4.199-9.163-6.543-19.353-6.543-30.091c0-39.936,32.374-72.309,72.309-72.309c39.936,0,72.309,32.373,72.309,72.309    c0,10.738-2.344,20.928-6.542,30.091h402.73c-4.199-9.163-6.543-19.353-6.543-30.091c0-39.936,32.374-72.309,72.31-72.309    c39.935,0,72.309,32.373,72.309,72.309c0,10.738-2.344,20.928-6.543,30.091h52.814c0,0,42.83-2.448,27.113-14.295    c1.69-3.969,1.966-9.907,4.929-13.801c0.863-0.626,2.618-0.877,3.943-0.986C944.569,371.2,940.757,349.183,936.447,342.828z     M141.876,237.839c0,0,5.372-5.028,7.887-6.901c7.176-5.345,13.777-11.422,21.195-16.759c11.72-8.431,25.772-20.819,39.433-26.617    c8.832-3.748,18.973-2.966,29.574-5.422c8.379-1.94,18.833-1.498,27.603-3.45c-0.968,0,22.181-0.985,21.195-0.985    s14.604-1.534,21.195-1.479c0,24.644,2.958,43.379,2.958,68.021C199.27,239.136,141.876,237.839,141.876,237.839z     M344.955,243.261l-4.437-68.515c0,0,37.014-3.078,72.95-3.199c36.759-0.125,72.458,2.706,72.458,2.706l7.395,76.895    L344.955,243.261z M533.739,254.104c0,0-11.337-78.389-11.337-78.878c0-0.49,66.874,8.717,94.639,20.222    c9.843,4.078,21.66,8.358,30.561,13.802c4.699,2.874,16.267,8.872,16.267,8.872l2.957,46.826L533.739,254.104z M776.516,361.612    c0.606-0.288,1.229-0.548,1.867-0.776v-21.254c-6.216,1.055-11.957,3.5-16.896,7.002L776.516,361.612z M792.289,399.698v21.253    c6.216-1.055,11.957-3.499,16.896-7.002l-15.027-15.028C793.55,399.209,792.928,399.47,792.289,399.698z M796.714,380.266    c0,1.449,1.175,2.624,2.624,2.624s2.623-1.175,2.623-2.624s-1.174-2.624-2.623-2.624S796.714,378.816,796.714,380.266z     M773.959,380.266c0-1.449-1.175-2.624-2.624-2.624s-2.624,1.175-2.624,2.624s1.175,2.624,2.624,2.624    S773.959,381.715,773.959,380.266z M785.336,368.889c1.449,0,2.624-1.175,2.624-2.624s-1.175-2.624-2.624-2.624    s-2.624,1.175-2.624,2.624S783.887,368.889,785.336,368.889z M809.184,346.585c-4.938-3.502-10.68-5.948-16.895-7.003v21.254    c0.638,0.228,1.26,0.49,1.866,0.777L809.184,346.585z M761.488,413.948c4.938,3.503,10.679,5.948,16.895,7.003v-21.253    c-0.639-0.229-1.26-0.49-1.867-0.778L761.488,413.948z M765.906,387.22H744.65c1.056,6.216,3.499,11.958,7.002,16.896    l15.027-15.027C766.393,388.481,766.135,387.857,765.906,387.22z M766.682,371.446l-15.028-15.028    c-3.503,4.938-5.947,10.68-7.002,16.896h21.254C766.134,372.675,766.395,372.053,766.682,371.446z"
                    fill="${color}" />
            </g>
        </g>
    </svg>
    `;
}