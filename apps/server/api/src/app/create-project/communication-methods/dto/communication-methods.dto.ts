export class CommunicationMethodsDto {
  projectId?: string;

  communicationMethodsId?: string | null;

  messaging?: boolean; // 1 to 7

  audio?: boolean;

  video?: boolean;
}
