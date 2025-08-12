import { fetchQuizById } from "@/services/api";

interface Params {
  params: { id: string };
}

export default async function QuizPage({ params }: Params) {
  const quiz = await fetchQuizById(params.id);

  if (!quiz) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <p className="text-red-600 text-center text-lg font-semibold">
          Quiz not found.
        </p>
      </main>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
    <main className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg text-gray-900">
      <h1 className="text-4xl font-extrabold mb-8 border-b pb-3 border-gray-200">
        {quiz.quizTitle}
      </h1>

      <ol className="list-decimal list-inside space-y-8 list-none">
        {quiz.questions.map((q: any) => (
          <li key={q.id} className="space-y-3">
            <p className="text-lg font-semibold flex items-center gap-3">
              {q.text}
              <span className="text-sm italic text-gray-500 lowercase bg-gray-100 px-2 py-0.5 rounded-full">
                {q.type.toLowerCase()}
              </span>
            </p>

            {/* BOOLEAN: Disabled radio buttons */}
            {q.type === "BOOLEAN" && (
              <div className="flex gap-6 text-gray-700">
                <label className="inline-flex items-center cursor-not-allowed">
                  <input type="radio" disabled className="form-radio" />
                  <span className="ml-2 select-none">True</span>
                </label>
                <label className="inline-flex items-center cursor-not-allowed">
                  <input type="radio" disabled className="form-radio" />
                  <span className="ml-2 select-none">False</span>
                </label>
              </div>
            )}

            {/* INPUT: Disabled text input */}
            {q.type === "INPUT" && (
              <input
                type="text"
                disabled
                placeholder="Short text answer"
                className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-lg bg-gray-50 cursor-not-allowed focus:outline-none"
              />
            )}

            {/* CHECKBOX: Disabled checkboxes */}
            {q.type === "CHECKBOX" && (
              <ul className="ml-6 space-y-2 text-gray-700">
                {q.options.map((o: any) => (
                  <li key={o.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      disabled
                      checked={o.isCorrect}
                      className="form-checkbox cursor-not-allowed"
                    />
                    <span className="select-none">{o.text}</span>
                    {o.isCorrect && (
                      <span className="text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded-full text-xs">
                        Correct
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </main>
    </div>
  );
}
