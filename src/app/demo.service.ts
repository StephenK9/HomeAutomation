import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http: HttpClient) { };
  getTemps() {
    return this.http.get('/api');
  }
  setRelay(state: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',responseType: 'text' })
    };
    console.log('Set Relay in demo.service accessed!')
    this.http.put('/api/relay', { 'relayState': state }, httpOptions).subscribe(data => {
      // console.log(data);
    }, error => console.log('oops', error))
  }
  setRGB(value: string):void {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',responseType: 'text' })
    };
    console.log('Set Relay in demo.service accessed!')
    this.http.put('/api/rgb', { 'RGB': value }, httpOptions).subscribe(data => {
      // console.log(data);
    }, error => console.log('oops', error))
  }
  
}
