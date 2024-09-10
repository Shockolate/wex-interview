import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { PageViewDto } from './dtos/page-view.dto';
import { PageViewService } from './page-view.service';

@Controller()
export class PageViewController {
  constructor(private readonly pageViewService: PageViewService) {}

  @Post('page-views')
  async createNewPageView(@Body() _pageViewDto: PageViewDto) {
    throw new NotImplementedException();
  }

  @Post('page-views/bulk')
  async bulkCreatePageView(@Body() pageViewDtos: PageViewDto[]) {
    this.pageViewService.bulkInsert(pageViewDtos);
  }

  @Get('page-views/loyal')
  async getLoyalCustomers(/* date start, date end */) {
    return this.pageViewService.getLoyalCustomers();
  }
}
