
export class Weather {
    current?: Current;
    hourly?:  Hourly[];
    daily?:   Daily[];
}

export class Current {
    dt?: number;
    stringTime: string;
    temp?:       number;
    pressure?:   number;
    humidity?:   number;
    wind_speed?: number;
    weather?:    WeatherElement[];
}

export class WeatherElement {
    description?:   string;
    icon?: string;
}

export class Daily {
    dt?: number;
    stringTime:  string;
    temp?:       Temp;
    pressure?:   number;
    humidity?:   number;
    wind_speed?: number;
    weather?:    WeatherElement[];
    pop?:        number;
}

export class Temp {
    day?:   number;
    min?:   number;
    max?:   number;
    night?: number;
    eve?:   number;
    morn?:  number;
}

export class Hourly {
    dt?: number;
    stringTime:  string;
    temp?:       number;
    pressure?:   number;
    humidity?:   number;
    wind_speed?: number;
    weather?:    WeatherElement[];
    pop?:        number;
}

var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

export class Convert {
    public static normalData(data: Weather): Weather {
        let dateHourly: Date;
        for(var hourly of data.hourly) {
            dateHourly = new Date(hourly?.dt * 1000);
            hourly.stringTime = `${dateHourly.getHours()}:${dateHourly.getMinutes()}0`;
            hourly.weather[0].icon = `http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`;
            hourly.temp = Math.round(hourly.temp);
        }
        let dateDaily: Date;
        for(var daily of data.daily) {
            dateDaily = new Date(daily?.dt * 1000);
            daily.stringTime = months[dateDaily.getMonth()] + " " + dateDaily.getDate() + ", " + days[dateDaily.getDay()];
            daily.weather[0].icon = `http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`;
            daily.temp.day = Math.round(daily.temp.day);
            daily.wind_speed = Math.round(daily.wind_speed);
            daily.pressure = Math.round(daily.pressure / 1.333);
        }
        let date = new Date(data.current.dt * 1000);
        data.current.stringTime = `${date.getHours()}:${date.getMinutes()}`;
        data.current.temp = Math.round(data.current.temp);
        data.current.pressure = Math.round(data.current.pressure / 1.333);
        data.current.weather[0].icon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
        data.daily.splice(0,1);
        return data;
    }
}
