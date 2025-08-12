import { Module } from '@nestjs/common';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [QuizzesModule],
  controllers: [],
  providers: [PrismaService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
