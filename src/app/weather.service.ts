import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {HttpClient, HttpErrorResponse}  from '@angular/common/http';

import { BehaviorSubject } from 'rxjs'
import {IWeather} from './weather';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

interface ICurrentWeatherData {
  weather: [
    {
      description: string
      icon: string
    }
  ]
  main: {
    temp: number
  }
  sys: {
    country: string
  }
  dt: number
  name: string
}


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apikey ="3987c2e7993e730caff3f06a7a6003da" ;

 country = "India";
//  private _url:string="/assets/datav.json";
  constructor(private http:HttpClient) { }

  getWeathers(city){
  //  link=;   console.log(city)
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?q="+city+","+this.country+"&appid="+this.apikey)
               .catch(this.errorHandler);
  }
  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "server Error");

  }
}
