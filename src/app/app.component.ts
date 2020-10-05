import { Component, OnInit } from '@angular/core';
import {Weather, Convert} from './app.weatherData'
import { OpenWeatherService } from './open-weather.service'
import { GeoService } from './geo.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [OpenWeatherService, GeoService]
})
export class AppComponent implements OnInit{
  weather : Weather
  location : string = "Махачкала";
  visible : boolean = false;

  constructor(private openWeatherService: OpenWeatherService, private geoService: GeoService){}

  ngOnInit() {
    this.onTitleChange()
  }

  onTitleChange(){
    this.geoService.getGeo(this.location).subscribe(data => {
      let geoArray = data["response"]["GeoObjectCollection"]["featureMember"];
      let geo = geoArray[0]["GeoObject"]["Point"]["pos"];
      this.openWeatherService.getWeather(geo).subscribe((data: Weather) => {
        this.weather = Convert.normalData(data);
        this.visible = true;
      })
    });
  }
} 
