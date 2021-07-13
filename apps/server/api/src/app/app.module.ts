import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';
import { CreateProjectModule } from './create-project/create-project.module';
import { ConsultantModule } from './consultant/consultant.module';
import { CateSubcateItemModule } from './common/cate-sub-item.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_HOST_URL'),
        user: configService.get<string>('MONGODB_USERNAME'),
        pass: configService.get<string>('MONGODB_PASSWORD'),
        dbName: configService.get<string>('MONGODB_DATABASENAME'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: environment.envPathProd,
      isGlobal: true,
    }),
    CreateProjectModule,
    ConsultantModule,
    CateSubcateItemModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
