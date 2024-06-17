import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartOptions } from 'chart.js';
import { Country } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);


  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  //public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartLabels:string[] = [];//
  public pieChartDatasets:any[]=[];
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe(result=>{
      let nbrOfMedals:number[]=[];
      if (result!=undefined) {
        result.forEach( (value:Country)=> {
          console.log(value);
          this.pieChartLabels.push(value.country);
          
          let totParticipation=0;
          value.participations.forEach ((p:Participation)=>{
            totParticipation=totParticipation+p.medalsCount;
          })
          nbrOfMedals.push(totParticipation);
        }); 
        const medals={
          data:nbrOfMedals
        }
      this.pieChartDatasets.push(medals);
      }
      


    });
    
  }

  onChartClick = ($event:any) => 
    {

      console.log($event);
    };
  
  

}
