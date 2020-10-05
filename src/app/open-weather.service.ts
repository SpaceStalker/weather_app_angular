import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OpenWeatherService {
  constructor(private http: HttpClient) {}

  getWeather(geo : string) {
    let latLon = geo.split(" ");
    let lat = latLon[1];
    let lon = latLon[0];
    return this.http.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=0b9054d39eff4c73e7bbfcd75b2f9181&lang=ru&units=metric`);
  }
}