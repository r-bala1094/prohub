import { Controller, Post, Req } from '@nestjs/common';
import { GitlabWebhookService } from './webhooks.service';

@Controller('gitlab')
export class GitlabWebhooksController {
  constructor(private gitlabWebhookService: GitlabWebhookService) {}
  @Post('webhook')
  async listenWebhookEvent(@Req() req) {
    console.log('started.');
    this.gitlabWebhookService.gitProcess();

    return true;
    // return req.headers;
  }
}
