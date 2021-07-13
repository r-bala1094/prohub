export class EduCertDto {
  educationCertificationId?: string;

  courseCertificateTitle?: string;

  schoolOrUniversity?: string;

  workedDur?: { startDate: Date; endDate: Date; curentlyWorkedHere: boolean };

  descriptionOrFaculty?: string;

  profileId?: string;
}
