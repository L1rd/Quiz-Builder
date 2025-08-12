const BASE_URL = 'http://localhost:3005';

export async function fetchQuizzes() {
  const res = await fetch(`${BASE_URL}/quizzes`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch quizzes');
  return res.json();
}

export async function fetchQuizById(id: number | string) {
  const res = await fetch(`${BASE_URL}/quizzes/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch quiz');
  return res.json();
}

export async function createQuiz(data: any) {
  const res = await fetch(`${BASE_URL}/quizzes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create quiz');
  return res.json();
}

export async function deleteQuiz(id: number | string) {
  const res = await fetch(`${BASE_URL}/quizzes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete quiz');
  return res.json();
}
