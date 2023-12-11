import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './entity/sample.entity';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';

@Module({
  controllers: [SampleController],
  providers: [SampleService],
  imports: [TypeOrmModule.forFeature([Sample])],
})
export class SampleModule {}
