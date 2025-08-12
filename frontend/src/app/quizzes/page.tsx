'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';

import { Quiz } from "@/components";

import { fetchQuizzes } from "@/services/api";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    fetchQuizzes().then(setQuizzes);
  }, []);

  const handleDelete = (id: string) => {
    setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="mb-6 flex justify-between">
        <h1 className="text-3xl font-bold mb-6 text-center">All Quizzes</h1>
        <Link href="/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            + Create New Quiz
          </button>
        </Link>
      </div>      
      <ul className="space-y-4">
        {quizzes.map((quiz: any) => (
          <Quiz key={quiz.id} quiz={quiz} onDelete={handleDelete} />
        ))}
      </ul>
    </main>
  );
}
