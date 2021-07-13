import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitlabWebhooksModule } from './gitlab-webhooks/webhooks.module';

@Module({
  imports: [GitlabWebhooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
