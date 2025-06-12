import { Module } from '@nestjs/common';
import { GedungController } from './gedung.controller';
import { GedungService } from './gedung.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GedungController],
  providers: [GedungService],
})
export class GedungModule {}