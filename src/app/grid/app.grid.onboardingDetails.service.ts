import { HttpClient } from '@angular/common/http';
import { Injectable,OnInit } from '@angular/core';

import { OnboardingDetails } from './app.grid.onboardingDetails';

@Injectable()
export class OnboardingDetailsService {

  constructor(private http: HttpClient) {}
  cars: OnboardingDetails[];

  getOnboardingDetails(fieldName,paramA,paramB) {
        //return this.http.get('./assets/onboardingDetails.json')
        return this.http.get('http://localhost:8080/onboarding/?fieldName=' + fieldName+'&paramA=' +paramA+ '&paramB=' +paramB);
  }    
}