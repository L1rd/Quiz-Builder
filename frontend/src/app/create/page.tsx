'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { OptionsInput } from '@/components';

import { createQuiz } from '@/services/api';

const QuestionTypeEnum = z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']);

const optionSchema = z.object({
  text: z.string().min(1, 'Option text is required'),
  isCorrect: z.boolean(),
});

const questionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  type: QuestionTypeEnum,
  options: z.array(optionSchema).optional(),
}).refine((q) => q.type !== 'CHECKBOX' || (q.options && q.options.length > 0), {
  message: 'Checkbox questions must have options',
  path: ['options'],
});

const quizSchema = z.object({
  quizTitle: z.string().min(1, 'Quiz title is required'),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
});

type QuizFormData = z.infer<typeof quizSchema>;

export default function CreateQuizForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      quizTitle: '',
      questions: [
        {
          text: '',
          type: 'INPUT' as const,
          options: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: QuizFormData) => {
    setError(null);
    try {
      await createQuiz(data);
      router.push('/quizzes');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const questions = watch('questions');

  return (
    <div className="flex items-center justify-center min-h-screen p-4 text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl bg-white rounded shadow p-6 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Create New Quiz</h2>

        <div>
          <label className="block mb-1 font-semibold">Quiz Title</label>
          <input
            {...register('quizTitle')}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter quiz title"
          />
          {errors.quizTitle && (
            <p className="text-red-600 mt-1">{errors.quizTitle.message}</p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Questions</h3>

          {fields.map((field, index) => {
            const questionType = questions?.[index]?.type;

            return (
              <div
                key={field.id}
                className="border p-4 rounded mb-4 relative bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  aria-label="Remove question"
                >
                  ✕
                </button>

                <div className="mb-2">
                  <label className="block font-semibold">Question Text</label>
                  <input
                    {...register(`questions.${index}.text` as const)}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    placeholder="Enter question text"
                  />
                  {errors.questions?.[index]?.text && (
                    <p className="text-red-600 mt-1">
                      {errors.questions[index]?.text?.message}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <label className="block font-semibold">Question Type</label>
                  <select
                    {...register(`questions.${index}.type` as const)}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    defaultValue="INPUT"
                  >
                    <option value="BOOLEAN">Boolean (True/False)</option>
                    <option value="INPUT">Short Text Input</option>
                    <option value="CHECKBOX">Checkbox (Multiple choice)</option>
                  </select>
                  {errors.questions?.[index]?.type && (
                    <p className="text-red-600 mt-1">
                      {errors.questions[index]?.type?.message}
                    </p>
                  )}
                </div>

                {questionType === 'BOOLEAN' && (
                  <div className="mb-2">
                    <label className="block font-semibold">Answer (Boolean)</label>
                    <div className="flex space-x-4 mt-1">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          disabled
                          className="form-radio"
                          checked={false}
                        />
                        <span className="ml-2">True</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          disabled
                          className="form-radio"
                          checked={false}
                        />
                        <span className="ml-2">False</span>
                      </label>
                    </div>
                    <p className="text-sm italic text-gray-500 mt-1">
                      (User answers handled elsewhere)
                    </p>
                  </div>
                )}

                {questionType === 'CHECKBOX' && (
                  <div className="mb-2">
                    <OptionsInput
                      nestIndex={index}
                      control={control}
                      register={register}
                      errors={errors}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={() =>
              append({ text: '', type: 'INPUT', options: [] })
            }
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Add Question
          </button>

          {errors.questions && typeof errors.questions?.message === 'string' && (
            <p className="text-red-600 mt-2">{errors.questions.message}</p>
          )}
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
}
