export class CreateEventDto {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  timezone?: string;
}