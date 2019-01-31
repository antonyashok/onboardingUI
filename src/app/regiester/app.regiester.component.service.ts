import { HttpClient } from '@angular/common/http';
import { Injectable,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class OnboardingDetailsRegiesterService {

   constructor(private http: HttpClient,
   private router: Router) {}
     
}