import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PageViewModule } from './page-view/page-view.module';

@Module({
  imports: [PageViewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
