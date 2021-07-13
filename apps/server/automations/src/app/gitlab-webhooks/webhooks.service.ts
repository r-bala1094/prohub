import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { join } from 'path';
@Injectable()
export class GitlabWebhookService {
  // constructor() {}
  async gitProcess() {
    const bat = spawn(join(__dirname, 'git-shell.sh'), {
      cwd: join(__dirname),
      // shell: true,
      // detached: true,
    });

    bat.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    bat.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    bat.on('exit', (code) => {
      console.log(`Child exited with code ${code}`);
    });
  }
}
