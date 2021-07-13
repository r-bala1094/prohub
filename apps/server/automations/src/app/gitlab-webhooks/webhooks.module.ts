import { Module } from '@nestjs/common';
import { GitlabWebhooksController } from './webhooks.controllrer';
import { GitlabWebhookService } from './webhooks.service';

@Module({
  imports: [],
  controllers: [GitlabWebhooksController],
  providers: [GitlabWebhookService],
})
export class GitlabWebhooksModule {}
