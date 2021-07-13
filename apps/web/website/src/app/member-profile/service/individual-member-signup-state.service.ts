import { Observable } from 'rxjs/internal/Observable';
import { IndividualMemberSignupHttpService } from './individual-member-signup-http.service';
import { Injectable } from '@angular/core';
import {first} from 'rxjs/operators';
interface pdfImport {
  aboutMe: boolean,
  experience: boolean,
  education: boolean,
  skills: boolean
}

interface Category {
  category: string,
  categoryId: number
}
@Injectable()
export class IndividualMemberSignupStateService {

  constructor(public httpService: IndividualMemberSignupHttpService) {
    this.getListOfCategories.pipe(first()).subscribe(
      data => this.allCategories = data
    );
  }
  // upload cv parameters
  pdf: ArrayBuffer | any = null;
  pdfName: string = ''
  pdfImportCheckBox: pdfImport = {
    aboutMe: false,
    experience: false,
    education: false,
    skills: false
  }

  // profile info parameters
  profilePic: string = '';
  firstName: string = '';
  lastName: string = '';

  // about me parameters
  aboutMeText: string = '';

  // work experience
  listOfWorkExperiences = [];

  // education and certification
  listOfeducationCertification = [];
  universitySearchWord = [];

  // categories and skills array
  allCategories = [];
  categorySearchWord: string = '';
  selectedCategories = [];
  selectedSubCategories = [];
  allSkills = [];
  selectedSkills = [];

  // project and services
  listAllOfProjectServices = [];
  getProjectServicesDataByIdValue = null;

  // location
  locationSearchWord = [];
  /**************** upload CV *******************/

  getUploadCV = new Observable(subscriber => {
    // If user comes through register page(/auth/signup), all the get request will return emplty values
    // If user comes through edit flow, al the get values will be assigned. Hence same route can be reused for edit flow
    if (this.pdfName === '') {
      this.httpService.getUploadCv().subscribe(
        (data: any) => {
          if (data.response.data) {
            this.pdfName = data.response.data.uploadCv.resumeOrCv.filename;
            this.pdfImportCheckBox = {
              aboutMe: data.response.data.uploadCv.importType.aboutMe,
              experience: data.response.data.uploadCv.importType.experiences,
              education: data.response.data.uploadCv.importType.educations,
              skills: data.response.data.uploadCv.importType.skills
            }
          }
          subscriber.next(
            {
              pdfName: this.pdfName,
              pdfImportCheckBox: this.pdfImportCheckBox
            }
          )
        }
      )
    } else {
      subscriber.next(
        {
          pdfName: this.pdfName,
          pdfImportCheckBox: this.pdfImportCheckBox
        }
      )
    }
  });

  setUploadCV(file: ArrayBuffer | any, checkBoxData: pdfImport) {
    this.pdf = file;
    this.pdfImportCheckBox = checkBoxData;

    const formData = new FormData;
    formData.append('files', file);
    formData.append('aboutMe', checkBoxData.aboutMe.toString());
    formData.append('experiences', checkBoxData.experience.toString());
    formData.append('educations', checkBoxData.education.toString());
    formData.append('skills', checkBoxData.skills.toString());

    this.httpService.postUploadCv(formData).subscribe(
      response => this._getUploadCvHttp()
    )
  }

  _getUploadCvHttp() {
    this.httpService.getUploadCv().subscribe(
      (data: any) => {
          this.pdfName = data.response.data.uploadCv.resumeOrCv.filename;
          this.pdfImportCheckBox = {
            aboutMe: data.response.data.uploadCv.importType.aboutMe,
            experience: data.response.data.uploadCv.importType.experiences,
            education: data.response.data.uploadCv.importType.educations,
            skills: data.response.data.uploadCv.importType.skills
          }
      }
    )
  }

  /**************** profile info *******************/

  getProfileInfo = new Observable(subscriber => {
    if (this.firstName === '') {
      this.httpService.getProfileInfo().subscribe(
        (data: any) => {
          // for new user
          if (data.response.data && data.response.data !== null) {
            this.profilePic = data.response.data.profileInfo.profilePic ?
              data.response.data.profileInfo.profilePic.fileUrl : this.profilePic;
            this.firstName = data.response.data.profileInfo.name.firstname;
            this.lastName = data.response.data.profileInfo.name.surname
            subscriber.next( {
              profilePic: this.profilePic,
              firstName: this.firstName,
              lastName: this.lastName,
            })
          } else { // for already exisiting user
            subscriber.next( {
              profilePic: this.profilePic,
              firstName: this.firstName,
              lastName: this.lastName,
            })
          }
        }
      )
    } else { // when user clicks side nav bar after visiting atleast once
      subscriber.next( {
        profilePic: this.profilePic,
        firstName: this.firstName,
        lastName: this.lastName,
      })
    }
  })

  _getgetProfileInfoHttp() {
    this.httpService.getProfileInfo().subscribe(
      (data: any) => {
        if (data.response.data && data.response.data !== null) {
          this.profilePic = data.response.data.profileInfo.profilePic ?
            data.response.data.profileInfo.profilePic.fileUrl : this.profilePic;
          this.firstName = data.response.data.profileInfo.name.firstname;
          this.lastName = data.response.data.profileInfo.name.surname
        }
      }
    )
  }

  setProfileInfo(profilePicFile: ArrayBuffer | any, firstName : string, lastName: string) {
    const formData = new FormData;
    if(profilePicFile)
      formData.append('file', profilePicFile);
    formData.append('firstname', firstName);
    formData.append('surname', lastName);

    this.httpService.putProfileInfo(formData).subscribe(
      response => this._getgetProfileInfoHttp()
    )
  }

  /**************** About me *******************/

  getAboutMe = new Observable(subscriber => {
    if (this.aboutMeText === '') {
      this.httpService.getAboutMe().subscribe(
        (data: any) => {
          if (data.response.data.hasOwnProperty('aboutMe')) { // for new user
            this.aboutMeText = data.response.data.aboutMe
            subscriber.next(this.aboutMeText)
          } else { // for already exisiting user
            subscriber.next(this.aboutMeText)
          }
        }
      )
    } else { // when user clicks side nav bar after visiting atleast once
      subscriber.next(this.aboutMeText)
    }
  })

  _getAboutMe() {
    this.httpService.getAboutMe().subscribe(
      (data: any) => {
        if(data.response.data)
          this.aboutMeText = data.response.data.aboutMe
      }
    )
  }

  setAboutMe(text: string) {
    this.httpService.putAboutMe({
      "aboutMe": text
    }).subscribe(
      response => this._getAboutMe()
    )
  }

  /**************** Work experience *******************/

  getWorkExperience = new Observable(subscriber => {
    if (this.listOfWorkExperiences.length === 0) {
      this.httpService.getWorkExp().subscribe(
        (data: any) => {
          if (data.response.data) { // for new user
            this.listOfWorkExperiences = data.response.data;
            subscriber.next(this.listOfWorkExperiences);
          } else { // for already exisiting user
            subscriber.next(this.listOfWorkExperiences);
          }
        }
      )
    } else { // when user clicks side nav bar after visiting atleast once
      subscriber.next(this.listOfWorkExperiences);
    }
  })

  _getWorkExperience() {
    this.httpService.getWorkExp().subscribe(
      (response: any) => {
        if(response.response.data)
          this.listOfWorkExperiences = response.response.data;
      }
    )
  }

  setWorkExperience(workExperienceData) {
    this.httpService.putWorkExp(workExperienceData).subscribe(
      response => this._getWorkExperience()
    )
  }

  deleteWorkExperience(id: number) {
    this.httpService.deleteWorkExperience(id).subscribe(
      response => this._getWorkExperience()
    )
  }

  /**************** education and certification *******************/

  getEducationCertificationData = new Observable(subscriber => {
    if (this.listOfeducationCertification.length === 0) {
      this.httpService.getEduCert().subscribe(
        (data: any) => {
          if (data.response.data) { // for new user
            this.listOfeducationCertification = data.response.data;
            subscriber.next(this.listOfeducationCertification);
          } else { // for already exisiting user
            subscriber.next(this.listOfeducationCertification);
          }
        }
      )
    } else { // when user clicks side nav bar after visiting atleast once
      subscriber.next(this.listOfeducationCertification);
    }
  })

  _getEducationCertificationData() {
    this.httpService.getEduCert().subscribe(
      (response: any) => {
        if(response.response.data)
          this.listOfeducationCertification = response.response.data;
      }
    )
  }

  setEducationCertificationData(workExperienceData) {
    this.httpService.putEduCert(workExperienceData).subscribe(
      response => this._getEducationCertificationData()
    )
  }

  deleteEducationCertificationData(id: number) {
    this.httpService.deleteEduCert(id).subscribe(
      response => this._getEducationCertificationData()
    )
  }

  /****************common categories and skills *******************/
  getListOfCategories: Observable<any> = new Observable(subscriber => {
    this.httpService.getListOfCategories(this.categorySearchWord).subscribe(
      (data: any) => {
        subscriber.next(data.response.data);
      }
    )
  });

  getListOfSubCategories: Observable<any> = new Observable(subscriber => {
    this.httpService.getListOfSubCategories(this.selectedCategories).subscribe(
      (data: any) => {
        subscriber.next(data.response.data);
      }
    )
  });

  getListOfSkills: Observable<any> = new Observable(subscriber => {
    this.httpService.getListOfSkills(this.selectedCategories, this.selectedSubCategories).subscribe(
      (data: any) => {
        subscriber.next(data.response.data);
      }
    )
  });

  /****************categories and skills user specific *******************/

  getListOfSelectedCategoriesAndSkills: Observable<any> = new Observable(subscriber => {
    this.httpService.getListOfSelectedCategoriesAndSkills().subscribe(
      (data: any) => {
        if (Object.keys(data.response.data).length > 0) {
          subscriber.next(data.response.data)
          if (data.response.data.hasOwnProperty('categories'))
            this.selectedCategories = data.response.data.categories;
          if (data.response.data.hasOwnProperty('subCategories'))
            this.selectedSubCategories = data.response.data.subCategories;
          if (data.response.data.hasOwnProperty('skills'))
            this.selectedSkills = data.response.data.skills;
        } else {
          subscriber.next(null);
          this.selectedCategories = [];
          this.selectedSubCategories = [];
          this.selectedSkills = [];
        }
      }
    );
  });

  _getListOfSelectedCategoriesAndSkills() {
    this.httpService.getListOfSelectedCategoriesAndSkills().subscribe(
      (data: any) => {
        if (Object.keys(data.response.data).length > 0) {
          this.selectedCategories = data.response.data.hasOwnProperty('categories') ?
            data.response.data.categories : [];
          this.selectedSubCategories = data.response.data.hasOwnProperty('subCategories') ?
            data.response.data.subCategories : [];
          this.selectedSkills = data.response.data.hasOwnProperty('skills') ?
            data.response.data.skills : [];
        } else {
          this.selectedCategories = [];
          this.selectedSubCategories = [];
          this.selectedSkills = [];
        }
      }
    );

  }

  setListOfSelectedCategoriesAndSkills(selectedCategoriesSkills) {
    this.httpService.putListOfSelectedCategoriesAndSkills(selectedCategoriesSkills).subscribe(
      response => this._getListOfSelectedCategoriesAndSkills()
    );
  }

    /**************** project and services *******************/

    getAllProjectServicesData = new Observable(subscriber => {
      if (this.listAllOfProjectServices.length === 0) {
        this.httpService.getAllProjectServices().subscribe(
          (data: any) => {
            if (data.response.data) { // for new user
              this.listAllOfProjectServices = data.response.data;
              subscriber.next(this.listAllOfProjectServices);
            } else { // for already exisiting user
              subscriber.next(this.listAllOfProjectServices);
            }
          }
        )
      } else { // when user clicks side nav bar after visiting atleast once
        subscriber.next(this.listAllOfProjectServices);
      }
    })

    _getAllProjectServicesData() {
      this.httpService.getAllProjectServices().subscribe(
        (response: any) => {
          if(response.response.data)
            this.listAllOfProjectServices = response.response.data;
        }
      )
    }

    setAllProjectServicesData(projectServicesData) {
      this.httpService.putProjectServices(projectServicesData).subscribe(
        response => this._getAllProjectServicesData()
      )
    }

    deleteProjectServicesData(id: number) {
      this.httpService.deleteProjectServices(id).subscribe(
        response => this._getAllProjectServicesData()
      )
    }

    getProjectServicesDataById = new Observable(subscriber => {
        this.httpService.getProjectServicesDataById(this.getProjectServicesDataByIdValue).subscribe(
          (data: any) => {
            subscriber.next(data.response.data);
          }
        )
    })

  uploadProjectAttachment(file) {
    const formData = new FormData;
    formData.append('file', file);
    return this.httpService.postUploadProjectAttachment(formData);
  }

  /**************** Intro Video *******************/

  getIntroVideo() {
    return this.httpService.getIntroVideo();
  }
  setIntroVideo(video) {
    const formData = new FormData;
    formData.append('files', video);
    return this.httpService.postIntroVideo(formData);
  }
  /**************** Common *******************/

  // location
  getListOfLocation: Observable<any> = new Observable(subscriber => {
    this.httpService.getListOfLocation(this.locationSearchWord).subscribe(
      (data: any) => {
       subscriber.next(data.response.data);
      }
    )
  });

  // university
  getListOfUniversity: Observable<any> = new Observable(subscriber => {
    this.httpService.getListOfUniversity(this.universitySearchWord).subscribe(
      (data: any) => {
       subscriber.next(data.response.data);
      }
    )
  });
}
