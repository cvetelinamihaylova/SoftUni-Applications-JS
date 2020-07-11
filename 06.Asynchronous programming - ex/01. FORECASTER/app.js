import el from './dom.js';
import { getInfoLocation, getTodayData, getUpcomingData } from './data.js'
const html = {
    inputLocation() { return document.querySelector('#location') },
    submitBtn() { return document.querySelector('#submit') },
    divCurrent() { return document.querySelector('#current') },
    divUpcoming() { return document.querySelector('#upcoming') },
    divForecast() { return document.querySelector('#forecast') }
};

const symbolsWeather = {
    'Sunny': '☀',
    'Partly sunny': '⛅',
    'Overcast': '☁',
    'Rain': '☂'
}
const degreeSymbol = '°';


function createSpanUpcoming(obj) {
    return el('span', [
        el('span', symbolsWeather[obj.condition], { className: 'symbol' }),
        el('span', `${obj.low}${degreeSymbol}/${obj.high}${degreeSymbol}`, { className: 'forecast-data' }),
        el('span', obj.condition, { className: 'forecast-data' })
    ], { className: upcoming });
}
function attachEvents() {
    html.submitBtn().addEventListener('click', async () => {
        html.divUpcoming().textContent = '';
        html.divCurrent().textContent = '';

        const query = html.inputLocation().value;
        const queryObj = await getInfoLocation(query);

        if (queryObj) {
            const code = queryObj.code;
            const todayData = await getTodayData(code);
            const upcomingData = await getUpcomingData(code);
            Promise.all([todayData, upcomingData]).then(([today, upcoming]) => {
                html.divForecast().style.display = 'block';
                const condition = today.forecast.condition;
                const todayEl = el('div', [
                    el('span', `${symbolsWeather[condition]}`, { className: 'condition symbol' }),
                    el('span', [
                        el('span', `${today.name}`, { className: 'forecast-data' }),
                        el('span', `${today.forecast.low}${degreeSymbol}/${today.forecast.high}${degreeSymbol}`, { className: 'forecast-data' }),
                        el('span', `${condition}`, { className: 'condition symbol' })
                    ], { className: 'condition' })
                ], { className: 'forecast' });
                html.divCurrent().appendChild(todayEl);

                const upcomingEl = el('div', 
                upcoming.forecast.map(createSpanUpcoming) , 
                { className: 'forecast-info' });

                html.divUpcoming().style.display = 'block';
                html.divUpcoming().appendChild(upcomingEl);
            });
        } else {
            html.divForecast().style.display = 'block';
            html.divUpcoming().style.display = 'none';
            html.divCurrent().textContent = 'Invalid location!';
        }
    });
}

attachEvents();