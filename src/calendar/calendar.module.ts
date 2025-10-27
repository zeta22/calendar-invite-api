import { Module } from '@nestjs/common';
import { CalendarController, RedirectController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { ShortenerService } from '../shortener/shortener.service';

@Module({
  controllers: [CalendarController, RedirectController],
  providers: [CalendarService, ShortenerService],
  exports: [CalendarService, ShortenerService],
})
export class CalendarModule {}