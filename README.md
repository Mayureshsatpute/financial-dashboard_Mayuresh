 Financial Analytics Dashboard – Backend
A secure and scalable backend for a full-stack financial analytics application, built with Node.js, Express, TypeScript, MongoDB, and JWT Authentication. Features include data filtering, dynamic CSV report generation, and token-protected RESTful APIs.

🚀 Features
✅ JWT-based Authentication Middleware

📈 Transaction Filtering (Date, Category, Status, User, Amount)

🔍 Search & Sort Capabilities

🧾 Configurable CSV Report Export

🔐 Secure Routes with Middleware

📦 MongoDB Integration with Mongoose

🛠 Tech Stack
Layer	Technology
Language	TypeScript
Server	Express.js (Node.js)
Database	MongoDB + Mongoose
Auth	JWT (JSON Web Token)
CSV Export	csv-writer library
Dev Tools	ts-node-dev, dotenv

📂 Folder Structure
bash
Copy
Edit
financial-backend/
├── src/
│   ├── config/         # Database connection
│   ├── middleware/     # Auth middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # CSV export logic
│   └── index.ts        # Entry point
├── .env                # Environment variables
├── package.json
├── tsconfig.json
└── README.md
🧪 API Endpoints
✅ Transactions
sql
Copy
Edit
GET /api/transactions            // Get all transactions
GET /api/transactions/filter     // Filter/search/sort transactions
Query Params for filter:

Param	Type	Example
category	string	Revenue
status	string	Paid
user_id	string	user_001
from	string	2024-01-01
to	string	2024-12-31
sort	string	asc / desc

📁 CSV Export
css
Copy
Edit
POST /api/export
Body: { "fields": ["date", "amount", "category"] }
Returns: downloadable .csv file

⚙️ Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone <your-repo-url>
cd financial-backend
2. Install Dependencies
bash
Copy
Edit
npm install
3. Setup Environment Variables
Create a .env file in the root:

env
Copy
Edit
MONGO_URI=mongodb://localhost:27017/finance_dashboard
JWT_SECRET=your_jwt_secret_key
4. Start Development Server
bash
Copy
Edit
npm run dev
🌱 Seed Data
Use transactions.json and a seed script (optional) to populate your MongoDB database.

📎 Example .env
ini
Copy
Edit
MONGO_URI=mongodb://localhost:27017/finance_dashboard
JWT_SECRET=super_secret_jwt_token
💡 Future Improvements
User Registration/Login API

Role-based access (admin vs viewer)

GraphQL support

Error logging with Winston/Sentry

👨‍💻 Author
Mayuresh Satpute
BTech Computer Science @ Vishwakarma University
Open to internships | Passionate about full-stack & AI projects
