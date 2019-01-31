import { Component , OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm ,ValidationErrors,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OnboardingDetails } from '../core/OnboardingProcess';
import { OnboardingDetailsRegiesterService } from './app.regiester.component.service';

interface City {
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
  selector: 'app-regiester',
  templateUrl: './app.regiester.component.html',
  styleUrls: [ './app.regiester.component.css' ]
})
export class RegiesterComponent implements OnInit {
  
  model: any = {};
  skills: Skill[];
  projects: Project[];
  selectedSkill: Skill;
  selectedProject: Project;
  onboardingDetails : OnboardingDetails[];
  form: FormGroup;
  private sub: any;
  id: number;
  errorMsg = ""
  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute,
        private onboardingDetailsRegiesterService: OnboardingDetailsRegiesterService) {
        this.skills = [
            {name: '', code: ''},
            {name: 'Java', code: 'java'},
            {name: '.Net', code: '.net'},
            {name: 'Scrum Master', code: 'SM'},
            {name: 'Delivery Lead', code: 'DL'},
            {name: 'Bussiness Analyst', code: 'BA'}
        ];
        this.projects = [
            {name: '', code: ''},
            {name: 'CTP', code: 'projectA'},
            {name: 'HCSC', code: 'projectB'},
            {name: 'Extra Net', code: 'projectC'},
            {name: 'Healthcare', code: 'projectD'},
            {name: 'CTP Supporting App', code: 'projectE'}
        ];
    }

  ngOnInit() {
      this.form = new FormGroup({
      associateFirstName: new FormControl('', [
        Validators.required]),
      associateLastName: new FormControl('', [
        Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required]),
      entryType: new FormControl('', [
        Validators.required]),
      associateId: new FormControl('', [
        Validators.required]),
      interviewDate: new FormControl('', [
        Validators.required]),
      interviewDetails: new FormControl('', [
        Validators.required]),
      offerRolledDate: new FormControl('', [
        Validators.required]),
      joiningDate: new FormControl('', [
        Validators.required]),
      profileSharedCustomer: new FormControl('', [
        Validators.required]),
      customerApproved: new FormControl('', [
        Validators.required]),
      projectDeployedDate: new FormControl(''),
      projects: new FormControl(''),
      skill: new FormControl('', [
        Validators.required]),
      communication: new FormControl('', [
        Validators.required]),
      technicalExperience: new FormControl('', [
        Validators.required]),
      domainExperience: new FormControl('', [
        Validators.required]),
      otherComments: new FormControl('', [
        Validators.required])
    });

    this.id = this.route.snapshot.params['id'];
    if(typeof this.id !== "undefined") {
        this.getProcessDetails(this.id)
    }    
  }

  onSubmit(): void {
    let myObj = { 
      associateFirstName: this.form.controls['associateFirstName'].value, associateLastName: this.form.controls['associateLastName'].value,phoneNumber: this.form.controls['phoneNumber'].value,entryType: this.form.controls['entryType'].value,associateId: this.form.controls['associateId'].value,interviewDate: this.form.controls['interviewDate'].value,interviewDetails: this.form.controls['interviewDetails'].value,offerRolledDate: this.form.controls['offerRolledDate'].value,joiningDate: this.form.controls['joiningDate'].value,profileSharedCustomer: this.form.controls['profileSharedCustomer'].value,customerApproved: this.form.controls['customerApproved'].value,projectDeployedDate: this.form.controls['projectDeployedDate'].value,projects: this.form.controls['projects'].value,skill: this.form.controls['skill'].value,communication: this.form.controls['communication'].value,technicalExperience: this.form.controls['technicalExperience'].value,domainExperience: this.form.controls['domainExperience'].value,softSkilsOthers: this.form.controls['otherComments'].value };
    
      if(typeof this.id !== "undefined") {
            this.http.put('http://localhost:8080/onboarding/'+this.id,myObj).subscribe(
                data => {
                    console.log("Put Request is successful ", data);
                    this.router.navigate(['onboarding/home']);
                },
                error => { 
                    this.errorMsg = error.error.message;
                    console.log("Error", error);
                }
            );
        }
        else {
            this.http.post('http://localhost:8080/onboarding/',myObj).subscribe(
                data => {
                    console.log("Post Request is successful ", data);
                    this.router.navigate(['onboarding/home']);
                },
                error => {
                    this.errorMsg = error.error.message;
                    console.log("Error", error);
                }
            );
        };
  }
  
  getProcessDetails(associateId){
    this.http.get('http://localhost:8080/onboarding/'+associateId).
    subscribe((result:any) => {        
          this.onboardingDetails = result;
          this.form.controls['associateFirstName'].setValue(result.associateFirstName);
          this.form.controls['associateLastName'].setValue(result.associateLastName);
          this.form.controls['entryType'].setValue(result.associateEntryType);
          this.form.controls['phoneNumber'].setValue(result.phoneNumber);
          this.form.controls['associateId'].setValue(result.associateId);
          this.form.controls['interviewDate'].setValue(result.strInterviewDate);
          this.form.controls['interviewDetails'].setValue(result.interviewerDetails);
          this.form.controls['offerRolledDate'].setValue(result.strOfferRolledDate);
          this.form.controls['joiningDate'].setValue(result.strJoiningDate);
          this.form.controls['profileSharedCustomer'].setValue(result.profileSharedCustomer);
          this.form.controls['customerApproved'].setValue(result.customerApproved);
          this.form.controls['projectDeployedDate'].setValue(result.strProjectDeployedDate);
          this.form.controls['projects'].setValue(this.projects[this.projects.findIndex(findProject)]);
          this.form.controls['skill'].setValue(this.skills[this.skills.findIndex(findSkill)]);
          this.form.controls['communication'].setValue(result.communication);
          this.form.controls['technicalExperience'].setValue(result.technicalExperience);
          this.form.controls['domainExperience'].setValue(result.domainExperience);
          this.form.controls['otherComments'].setValue(result.softSkilsOthers);

          function findSkill(skill) { 
              return skill.name === result.skils;
          }

          function findProject(project) { 
              return project.name === result.assignedProject;
          }
          this.checkEntryType(result.associateEntryType);
          this.checkCustomerApproved(result.customerApproved);
      },
      error => {
        this.errorMsg =  error.status;
          console.log("Error", error.status);
      });
  }

  checkEntryType(value){
    if(value == 'CDP') {
      this.form.controls['associateId'].enable();
    }else{
      this.form.controls['associateId'].disable();
    }
  }

   checkCustomerApproved(value){
     if(value == 'Yes') {
       this.form.controls['projectDeployedDate'].setValidators([Validators.required]);
       this.form.controls['projects'].setValidators([Validators.required]);
     }
     else{
       this.form.controls['projectDeployedDate'].clearValidators();
       this.form.controls['projects'].clearValidators();
     }
    this.form.controls['projectDeployedDate'].updateValueAndValidity();
    this.form.controls['projects'].updateValueAndValidity();
   }

   clearProfileTab(){
     this.form.controls['associateFirstName'].setValue('');
     this.form.controls['associateLastName'].setValue('');
     this.form.controls['entryType'].setValue('');
     this.form.controls['phoneNumber'].setValue('');
     this.form.controls['associateId'].setValue('');
  }

  clearInterviewrFeebackTab(){
    this.form.controls['skill'].setValue('');
    this.form.controls['communication'].setValue('');
    this.form.controls['technicalExperience'].setValue('');
    this.form.controls['domainExperience'].setValue('');
    this.form.controls['otherComments'].setValue('');
  }

  clearOnboardingDetailsTab(){
    this.form.controls['interviewDate'].setValue('');
    this.form.controls['interviewDetails'].setValue('');
    this.form.controls['offerRolledDate'].setValue('');
    this.form.controls['joiningDate'].setValue('');
    this.form.controls['profileSharedCustomer'].setValue('');
    this.form.controls['customerApproved'].setValue('');
    this.form.controls['projectDeployedDate'].setValue('');
    this.form.controls['projects'].setValue('');
  }
  
}


