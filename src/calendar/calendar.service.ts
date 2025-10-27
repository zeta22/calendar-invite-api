import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class CalendarService {
  generateGoogleCalendarUrl(eventData: CreateEventDto): string {
    const baseUrl = 'https://calendar.google.com/calendar/render';

    const params = new URLSearchParams();
    params.append('action', 'TEMPLATE');
    params.append('text', eventData.title);

    if (eventData.description) {
      params.append('details', eventData.description);
    }

    if (eventData.location) {
      params.append('location', eventData.location);
    }

    // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
    const startDate = this.formatDateForGoogle(eventData.startDate, eventData.timezone);
    const endDate = this.formatDateForGoogle(eventData.endDate, eventData.timezone);

    params.append('dates', `${startDate}/${endDate}`);

    return `${baseUrl}?${params.toString()}`;
  }

  private formatDateForGoogle(dateString: string, timezone?: string): string {
    const date = new Date(dateString);

    // Convert to UTC format: YYYYMMDDTHHMMSSZ
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  }
}