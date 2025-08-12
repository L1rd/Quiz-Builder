# Quiz-Builder

Backend Setup:
1. Navigate to the backend folder:
cd backend
npm install
2. Configure environment variables:
Create a .env file in the backend folder with:
   - DATABASE_URL="postgresql://postgres.xdywtpvajufoghomhvrf:Quiz_Builder@aws-0-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   -  DIRECT_URL="postgresql://postgres.xdywtpvajufoghomhvrf:Quiz_Builder@aws-0-eu-north-1.pooler.supabase.com:5432/postgres"
3. Start the backend server:
npm run start:dev

Frontend Stup:
1. Navigate to the frontend folder:
cd frontend
npm install
2. Start the development server:
npm run start:dev
// Note: The Next.js development server must start on port 3000.

Creating a Sample Quiz
1. Open the frontend app in your browser at http://localhost:3000/create.
2. Fill in the quiz title.
3. Add one or more questions:
   - Choose the question type (Boolean, Input, Checkbox).
   - For Checkbox questions, add options.
4. Submit the form.
5. On success, you'll be redirected to the quizzes list.
