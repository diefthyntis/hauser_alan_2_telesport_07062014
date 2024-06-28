import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Country } from '../core/models/Olympic';
import { Participation } from '../core/models/Participation';


@Component({
  selector: 'app-participations-list',
  standalone:false,
  templateUrl: './participations-list.component.html',
  styleUrls: ['./participations-list.component.scss']
})
export class ParticipationsListComponent implements OnInit{
  idCountry!:number; // au début c'était un number
  public olympics$: Observable<any> = of(null);
  private arrayYears:number[]=[];
  private arraysMedalsQuantities:number[]=[];
  public participationsQuantity:number=0;
  public totalAthletes:number=0;
  public totalMedals:number=0;
  @Input() inputCountry!:Country;



  constructor(private olympicService: OlympicService,private instanceActivatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idCountry = parseInt(this.instanceActivatedRoute.snapshot.params['id'])+1;
    console.log("idCountry induit"+this.idCountry);
    this.olympics$ = this.olympicService.getOlympics();
    
    this.olympics$.subscribe(returnedArrayCountries=>{
      
      if (returnedArrayCountries!=undefined) {
        returnedArrayCountries.forEach( (instanceCountry:Country)=> {
          console.log(instanceCountry.country);
          let instanceParticipation!: Participation;
      
          if (instanceCountry.id == this.idCountry) {
            this.inputCountry = instanceCountry;
            this.participationsQuantity=instanceCountry.participations.length;
            for (instanceParticipation of instanceCountry.participations) {
              this.arrayYears.push(instanceParticipation.year);
              this.arraysMedalsQuantities.push(instanceParticipation.medalsCount);
              this.totalAthletes = this.totalAthletes + instanceParticipation.athleteCount;
              this.totalMedals = this.totalMedals + instanceParticipation.medalsCount;
            };
          };
        });
      }
      
    });
    
  };

  
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.arrayYears,
    datasets: [
      {
        data: this.arraysMedalsQuantities,
        label: 'Dates',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  }

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  }
  public lineChartLegend = true;

}
