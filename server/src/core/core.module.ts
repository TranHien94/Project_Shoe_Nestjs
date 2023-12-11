import { Global, Module, OnModuleInit } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  exports: [DatabaseModule],
})
export class CoreModule implements OnModuleInit {
  onModuleInit() {}
}
