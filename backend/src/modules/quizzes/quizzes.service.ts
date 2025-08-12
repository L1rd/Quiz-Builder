import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto, QuestionType } from './dtos/quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  getQuizzes() {
    return this.prisma.quiz.findMany({
      select: {
        id: true,
        quizTitle: true,
        createdAt: true,
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getQuizById(quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: Number(quizId) },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${quizId} not found`);
    }
    return quiz;
  }

  async addQuiz(data: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        quizTitle: data.quizTitle,
        questions: {
          create: data.questions.map((q) => ({
            text: q.text,
            type: q.type,
            options:
              q.type === QuestionType.CHECKBOX
                ? {
                    create: q.options?.map((o) => ({
                      text: o.text,
                      isCorrect: o.isCorrect,
                    })),
                  }
                : undefined,
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  }

  async deleteQuizById(quizId: string) {
    const id = Number(quizId);

    const quiz = await this.prisma.quiz.findUnique({ where: { id } });
    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${quizId} not found`);
    }

    return this.prisma.$transaction(async (prisma) => {
      await prisma.option.deleteMany({
        where: {
          question: {
            quizId: id,
          },
        },
      });

      await prisma.question.deleteMany({
        where: { quizId: id },
      });

      return prisma.quiz.delete({
        where: { id },
      });
    });
  }
}
