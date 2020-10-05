import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class GeoService {
    constructor(private http: HttpClient) {}
  
    getGeo(location : string) {
      return this.http.get(`https://geocode-maps.yandex.ru/1.x/?apikey=c56bb4f4-3e28-4cc9-a4cf-db717e1007a2&format=json&geocode=${location}`);
    }
}
