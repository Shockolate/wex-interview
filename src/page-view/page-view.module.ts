import { Module } from '@nestjs/common';
import { PageViewController } from './page-view.controller';
import { PageViewService } from './page-view.service';

@Module({
  controllers: [PageViewController],
  providers: [PageViewService],
})
export class PageViewModule {}
