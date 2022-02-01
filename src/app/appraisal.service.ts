import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Appraisal1 } from "./appraisal1.model";
import { Observable, Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({providedIn:'root'})
export class AppraisalService{

    error=new Subject<string>();

    constructor (private http:HttpClient){

    }

    getKomentarai(){
        return this.http
        .get<{[key:string]:Appraisal1}>("https://appraisal-ed32f-default-rtdb.europe-west1.firebasedatabase.app/appraisal.json")
        .pipe(map((responseData)=>{
            const appraisals:Appraisal1[]=[];
            for(const key in responseData){
                appraisals.push({ ...responseData[key], id:key });
            }
            return appraisals;
        }));
    }

    postAppraisal(namesurn:string, ivert:string, text:string){
        const appraisal1:Appraisal1={ namesurn:namesurn, ivert:ivert, komentaras:text };
        return this.http 
        .post<{name:string}>("https://appraisal-ed32f-default-rtdb.europe-west1.firebasedatabase.app/appraisal.json",appraisal1)
            // .subscribe((response)=>{
            //     console.log(response);
            // });
    }
}