import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `<input #myid [(ngModel)]="name" type="text">
             {{name}}
             <button (click)="logMessage(myid.value)">click</button>


             <h1 *ngIf ="nameDisplay ; else elseBlock">
             <input type="text">
             </h1>

             <ng-template #elseBlock>
             <h2> hide data</h2>
             </ng-template>
  `,
  styles: [
 ]
})
export class TestComponent implements OnInit {
  constructor() { }
  public name  =""
   nameDisplay="";
 
  ngOnInit() {
  }
  logMessage(value){
    console.log(value)
    this.nameDisplay=value
  }

}
