import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dtos/quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  getQuizzes() {
    return this.quizzesService.getQuizzes();
  }

  @Get(':id')
  async getQuizById(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.getQuizById(id.toString());
  }

  @Post()
  addQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.addQuiz(createQuizDto);
  }

  @Delete(':id')
  async deleteQuizById(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.deleteQuizById(id.toString());
  }
}
