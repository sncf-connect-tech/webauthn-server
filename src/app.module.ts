import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { ConfigService } from './services/configuration.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
          secretOrPrivateKey: 'this_is_my_secret_key',
      }),
  ],
  controllers: [AppController],
  providers: [
      AppService,
      JwtStrategy,
      {
          provide: ConfigService,
          useValue: new ConfigService(`${process.env.NODE_ENV}.env`),
      }],
  exports: [ConfigService],
})
export class AppModule {}
