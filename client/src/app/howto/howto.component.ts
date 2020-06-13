import { Component, OnInit } from '@angular/core';
import { GlobalDatasService } from '../services/global-datas.service';

@Component({
  selector: 'app-howto',
  templateUrl: './howto.component.html',
  styleUrls: ['./howto.component.scss']
})
export class HowtoComponent implements OnInit{

  language : string ;
  
  /* For selecting which explanations to display
  0 : Context
  1 : Goal */
  display : number = 0;
  selected : string[] = ["selected", ""];
  
  // This method change the explanation to display
  changeDisp (x: number) {
    this.selected[this.display] = "";
    this.display = x;
    this.selected[x] = "selected";
  }


  constructor(private globalDatasService : GlobalDatasService) {}

    ngOnInit() {
      this.language = this.globalDatasService.language;
    }
  }
