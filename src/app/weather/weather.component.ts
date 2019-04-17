import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  FormControl,
  Validators
} from '@angular/forms'

import { CookieService } from 'ngx-cookie-service';
import {
  ICurrentWeather
} from '../interface';
import {
  Observable
} from 'rxjs/Observable';
import {
  WeatherService
} from '../weather.service';
import {
  debounceTime
} from 'rxjs/operators'
import {
  variable
} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  cookieValue = 'UNKNOWN';
  constructor(private _weatherservice: WeatherService, private cookieService: CookieService) {
      console.log( localStorage.length)
      let k = 0;
      for( var j in localStorage){
        if(k>=localStorage.length){
        break;
        }
        console.log(localStorage[j]+" ->>> "+j);
      // (<HTMLInputElement>document.getElementById(j)).value = "delhi";
        if(parseInt(j)>=9){
            this.addCity();
            console.log("*****************000")
        }
        this.setData(JSON.parse(localStorage[j]), parseInt(j));
        k++;
      }

    console.log("checking ")
  }
  // search = new FormControl('', [Validators.required, Validators.minLength(2)])

  public modalname = ['m1','m2','m3','m4','m5','m6','m7','m8','m9'];
  public nameDisplay = ['','','','','','','','',''];
  public show = [false, false, false, false, false, false, false, false, false];
  public active = [false, false, false, false, false, false, false, false, false];
  public weathers = [new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),new Map(),new Map()]
  public errorMsg = ['','','','','','','','',''];

  public searchs = [
    new FormControl('', [Validators.required, Validators.minLength(1)]),
    new FormControl('', [Validators.required, Validators.minLength(1)]),
    new FormControl('', [Validators.required, Validators.minLength(1)]),
    new FormControl('', [Validators.required, Validators.minLength(1)]),
    new FormControl('', [Validators.required, Validators.minLength(1)]),
    new FormControl('', [Validators.required, Validators.minLength(1)]),
    new FormControl('', [Validators.required, Validators.minLength(1)]),
    new FormControl('', [Validators.required, Validators.minLength(1)]),
    new FormControl('', [Validators.required, Validators.minLength(1)])
  ]


  addCity() {
    this.searchs.push(new FormControl('', [Validators.required, Validators.minLength(1)]));
    this.show.push(false);
    this.active.push(false);
    this.weathers.push(new Map());
    this.errorMsg.push('');
    this.searchs.forEach((value, index) => {
      console.log(value);
      value.valueChanges.pipe(debounceTime(1000)).subscribe((searchValue: string) => {
        if (searchValue)
          {
              this.logMessage(searchValue, this.weathers[index], index)
          }
        else{
          localStorage.removeItem(index.toString());
                 this.show[index] = false;
                  this.weathers[index] = new Map();

             }
        console.log(searchValue);
      });
    })
  }

  logMessage(val, emp: Object, index) {
    this.nameDisplay = val
    console.log(this.nameDisplay)
    this._weatherservice.getWeathers(this.nameDisplay)
      .subscribe(data => {
          emp = Object.keys(data).map(e => data[e]);
          let cityData = new Map();
          cityData.set("id", emp[1][0]["id"])
          cityData.set("main", emp[1][0]["main"])
          cityData.set("temp", emp[3]["temp"]-273);
          cityData.set("pressure", emp[3]["pressure"]);
          cityData.set("humidity", emp[3]["humidity"]);
          cityData.set("speed", emp[5]["speed"]);
          cityData.set("country", emp[8]["country"]);
          cityData.set("city", emp[10]);
          cityData.set("image", "http://openweathermap.org/img/w/"+emp[1][0]["icon"]+".png");

          (this.weathers[index]) = cityData;
           localStorage.setItem(index, JSON.stringify(emp));

          if(!cityData.get("country"))
            this.errorMsg[index] = "please try again there is Somthing wrong";
          else
            this.errorMsg[index] = '';
        },

        error => this.errorMsg[index] = "City not found"

      );
  }
  onSubmit(e) {
     if(this.searchs[e].value){
             this.active[e] = true;
             this.show[e] = !this.show[e];
             this.nameDisplay[e] = this.searchs[e].value;

       }
  }
setData(data: Object, i:number){
           let emp = Object.keys(data).map(e => data[e]);
           if(!!emp[8]["country"]){
                   let cityData = new Map();
                   cityData.set("id", emp[1][0]["id"])
                   cityData.set("main", emp[1][0]["main"])
                   cityData.set("temp", emp[3]["temp"]-273);
                   cityData.set("pressure", emp[3]["pressure"]);
                   cityData.set("humidity", emp[3]["humidity"]);
                   cityData.set("speed", emp[5]["speed"]);
                   cityData.set("country", emp[8]["country"]);
                   cityData.set("city", emp[10]);
                   cityData.set("image", "http://openweathermap.org/img/w/"+emp[1][0]["icon"]+".png");
                   this.nameDisplay[i] = cityData.get("city");
                   console.log(this.nameDisplay[i]);
                   this.searchs[i].setValue (this.nameDisplay[i]);
                   // this.searchs[i].statusChanges(true)
                   (this.weathers[i]) = cityData;
                   console.log(this.weathers)
                   this.show[i] = !this.show[i];
                   this.searchs[i].markAsTouched();
                  this.active[i] = true;
             }
}

  ngOnInit() {


    console.log(this.active)
    this.searchs.forEach((value, index) => {
      console.log(value);
      value.valueChanges.pipe(debounceTime(10)).subscribe((searchValue: string) => {
        if (searchValue)
          {
              this.logMessage(searchValue, this.weathers[index], index)
          }
        else{
          localStorage.removeItem(index.toString());
                 this.show[index] = false;
                  this.weathers[index] = new Map();

             }
        console.log(searchValue);
      });
    })
  }


}
