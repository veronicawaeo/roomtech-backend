import { Module } from '@nestjs/common';
import { PeminjamanController } from './peminjaman.controller';
import { PeminjamanService } from './peminjaman.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({ 
      dest: './uploads/temp', 
    }),
  ],
  controllers: [PeminjamanController],
  providers: [PeminjamanService],
})
export class PeminjamanModule {}