import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { SampleModule } from './sample/sample.module';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [CoreModule, SampleModule, UsersModule, AuthModule, ProductModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
