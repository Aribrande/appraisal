import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppraisalService } from '../appraisal.service';
import { Appraisal1 } from '../appraisal1.model';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.css']
})
export class AppraisalComponent implements OnInit, OnDestroy {

  public appraisals:Appraisal1[]=[];
  public loading:boolean=false;
  public error:string;
  public errorSubscription:Subscription;
  @ViewChild('namesurn', {static:true})  namesurn:ElementRef<HTMLInputElement>;
  @ViewChild('ivert', {static:true})  ivert:ElementRef<HTMLInputElement>;
  @ViewChild('text', {static:true})  text:ElementRef<HTMLInputElement>;

  constructor( private appraisalService:AppraisalService ) { }

  ngOnInit(): void {
    console.log("PASILEIDZIA NAUJAS KOMPONENTAS");
    this.errorSubscription=this.appraisalService.error.subscribe((error)=>{
      this.error=error;
    });
    this.loadAppraisals();
  }


  send(namesurn:string, ivert:number, text:string){
    let ivertTekstu='';
    if (ivert==1) {
      ivertTekstu= "*";

    }
    if (ivert==2) {
      ivertTekstu= "**";

    }
    if (ivert==3) {
      ivertTekstu= "***";

    }
    this.appraisalService.postAppraisal(namesurn, ivertTekstu, text).subscribe(()=>{
      this.loadAppraisals();
      this.error=null;
    }, (error)=>{
      this.error=error.message;
    });
    this.namesurn.nativeElement.value="";
   
    this.text.nativeElement.value="";
  }

  loadAppraisals(){
    this.loading=true;
    this.appraisalService.getKomentarai().subscribe((data)=>{
      this.appraisals=data;
      this.loading=false;
    }, (error)=>{
      this.error=error.message;
    });
  }

  ngOnDestroy(){
    this.errorSubscription.unsubscribe();
  }

}
