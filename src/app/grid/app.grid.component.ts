import { Component,OnInit  } from '@angular/core';
import { OnboardingDetails } from './app.grid.onboardingDetails';
import { OnboardingDetailsService } from './app.grid.onboardingDetails.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, NgForm ,ValidationErrors,Validators} from '@angular/forms';

interface SearchFieled {
    name: string,
    code: string
}

interface Skill {
    name: string,
    code: string
}

interface Project {
    name: string,
    code: string
}

@Component({
  selector: 'my-grid',
  templateUrl: './app.grid.component.html',
  styleUrls: [ './app.grid.component.css' ]
})



export class GridComponent {
    
    
    fields : SearchFieled[];
    projects: Project[];
    selectedDetail: OnboardingDetails;
    skills: Skill[];
    onboardingDetails: OnboardingDetails[];
    cols: any[];
    gridForm: FormGroup;

  constructor(
     private onboardingDetailsService: OnboardingDetailsService,
     private router: Router){
     this.fields = [
            {name: 'All', code: 'all'},
            {name: 'Skill', code: 'skill'},
            {name: 'Name', code: 'name'},
            {name: 'Associate Id', code: 'associateId'},
            {name: 'Assigned Project', code: 'assignedProject'},
            {name: 'Inverview Date', code: 'interviewDate'}
        ];
        this.skills = [
            {name: 'Java', code: 'java'},
            {name: '.Net', code: '.net'},
            {name: 'Scrum Master', code: 'SM'},
            {name: 'Delivery Lead', code: 'DL'},
            {name: 'Bussiness Analyst', code: 'BA'}
        ];
        this.projects = [
            {name: 'CTP', code: 'projectA'},
            {name: 'HCSC', code: 'projectB'},
            {name: 'Extra Net', code: 'projectC'},
            {name: 'Healthcare', code: 'projectD'},
            {name: 'CTP Supporting App', code: 'projectE'}
        ];
    }

     ngOnInit() {
        this.onboardingDetailsService.getOnboardingDetails('All','','').
            subscribe((result:any) => {
            this.onboardingDetails = result;
        });

        this.cols = [
            { field: 'associateId', header: 'Associate Id' },
            { field: 'associateFirstName', header: 'Associate First Name' },
            { field: 'associateLastName', header: 'Associate Last Name' },
            { field: 'assignedProject', header: 'Assigned Project' },
            { field: 'strJoiningDate', header: 'Joing Date' },
            { field: 'strProjectDeployedDate', header: 'Project Deployed Date' },
            { field: 'skils', header: 'Skil' },
            { field: 'phoneNumber', header: 'Associate Phone No' }
        ];

        this.gridForm = new FormGroup({
        fieldName: new FormControl(''),
        associateNameField: new FormControl('', [
        Validators.required]),
        skillField: new FormControl('', [
        Validators.required]),
        projectField: new FormControl('', [
        Validators.required]),
        interviewStartField: new FormControl('', [
        Validators.required]),
        interviewEndField: new FormControl('', [
        Validators.required]),
        associateIdField: new FormControl('', [
        Validators.required])});
    }                                          

    onSearch(){     
       let fieldName = (this.gridForm.controls['fieldName'].value).code;
       let paramA = "";
       let paramB = "";
       switch(fieldName){
         case 'skill':{
              paramA = (this.gridForm.controls['skillField'].value).name;
              break;
          }
          case 'name':{
              paramA = this.gridForm.controls['associateNameField'].value;
              break;
          }
          case 'associateId':{
              paramA = this.gridForm.controls['associateIdField'].value;
              break;
          }
          case 'assignedProject':{
              paramA = (this.gridForm.controls['projectField'].value).name;
              break;
          }
          case 'interviewDate':{
              paramA = this.gridForm.controls['interviewStartField'].value;
              paramB = this.gridForm.controls['interviewEndField'].value;
              if(paramA == undefined && paramB == undefined){
                paramA = '';
                paramB = '';
              }
              break;
          }
          default:{
              fieldName = 'all'
              paramA = '';
              paramB = '';
          }
       }
       this.onboardingDetailsService.getOnboardingDetails(fieldName,paramA,paramB).
            subscribe((result:any) => {
                this.onboardingDetails = result;
            });
     }

     onRowSelect() {
         if(this.onboardingDetails.indexOf(this.selectedDetail) != -1){
            let id = (this.onboardingDetails[this.onboardingDetails.indexOf(this.selectedDetail)]).associateId;
            this.router.navigate(['onboarding/register',id]);
         }
    }
}
