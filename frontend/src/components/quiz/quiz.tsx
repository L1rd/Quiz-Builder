import { useRouter } from 'next/navigation';
import { deleteQuiz } from '@/services/api';

export const Quiz = ({ quiz, onDelete }: { quiz: any; onDelete: (id: string) => void }) => {
  const router = useRouter();

  if (!quiz) return null;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteQuiz(quiz.id);
      onDelete(quiz.id);
    } catch (error) {
      alert('Failed to delete quiz');
    }
  };

  const goToQuiz = () => {
    router.push(`/quizzes/${quiz.id}`);
  };

  return (
    <li
      className="flex justify-between items-center p-4 bg-white rounded shadow hover:bg-blue-50 transition cursor-pointer text-black"
      onClick={goToQuiz}
    >
      <div>
        <h2 className="text-xl font-semibold">{quiz.quizTitle}</h2>
        <p className="text-gray-600">{quiz._count?.questions ?? 0} question(s)</p>
      </div>
      <button
        onClick={handleDelete}
        className="ml-4 text-red-600 hover:text-red-800 text-xl font-bold"
        title="Delete quiz"
        aria-label={`Delete quiz ${quiz.quizTitle}`}
      >
        &times;
      </button>
    </li>
  );
};
