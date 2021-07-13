import { Module } from '@nestjs/common';
import { CategorySubcategoryItemSchemaModule } from '@prohub/database-schema';
import { SaveController } from './controllers/save.controller';
import { CategoryService } from './service/category.service';

@Module({
  imports: [CategorySubcategoryItemSchemaModule],
  controllers: [SaveController],
  providers: [CategoryService],
})
export class SaveModule {}
