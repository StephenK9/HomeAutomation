import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {DemoService} from './demo.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PiApp';
  public temps;
  constructor(private _demoService: DemoService){
    
  }
  ngOnInit() {
    setInterval(()=>{this.getTemps();},500)
    this.getTemps();
  }
    getTemps() {
       this._demoService.getTemps().subscribe(
          data => { this.temps = data;console.log(data)},
          err => console.error(err),
          () => console.log('done loading foods')
        );
      }
      setRelay(){
        console.log("Set Relay Accessed")
        if(this.temps[0].relayState=='off'){
          this._demoService.setRelay("on");
        }
        else{
          this._demoService.setRelay("off");
        }
        
      }
      RGBSlider(value:string){
        if(this.temps[0].RGB=='OFF'){
          this._demoService.setRGB("MED");
        }
        else if(this.temps[0].RGB=='MED'){
          this._demoService.setRGB("HIGH");
        }
        else{
          this._demoService.setRGB("OFF");
        }
}}
