import { Body, Controller, Get, Param, Post, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { CalendarService } from './calendar.service';
import { ShortenerService, UrlMapping } from '../shortener/shortener.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('calendar')
export class CalendarController {
  constructor(
    private readonly calendarService: CalendarService,
    private readonly shortenerService: ShortenerService,
  ) {}

  @Post('generate-url')
  generateCalendarUrl(@Body() createEventDto: CreateEventDto) {
    const googleCalendarUrl = this.calendarService.generateGoogleCalendarUrl(createEventDto);

    return {
      success: true,
      data: {
        googleCalendarUrl,
        event: createEventDto
      }
    };
  }

  @Post('generate-short-url')
  generateShortCalendarUrl(@Body() createEventDto: CreateEventDto) {
    const googleCalendarUrl = this.calendarService.generateGoogleCalendarUrl(createEventDto);
    const shortUrl = this.shortenerService.generateShortUrl(googleCalendarUrl);

    return {
      success: true,
      data: {
        googleCalendarUrl,
        shortUrl,
        event: createEventDto
      }
    };
  }

  @Get('short-urls')
  getAllShortUrls() {
    const mappings = this.shortenerService.getAllMappings();

    return {
      success: true,
      data: mappings
    };
  }
}

@Controller()
export class RedirectController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Get('s/:shortCode')
  redirectToOriginalUrl(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const originalUrl = this.shortenerService.getOriginalUrl(shortCode);

    if (!originalUrl) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Short URL not found'
      });
    }

    return res.redirect(originalUrl);
  }
}