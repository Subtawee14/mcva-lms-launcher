# MyCourseVille Assessment Platform Launcher

A modern Next.js 15 application for launching and managing MyCourseVille assessment platform users across different environments.

## 🚀 Features

- **Next.js 15 App Router** - Latest Next.js with server components
- **Bun Package Manager** - Fast and modern package management
- **Advanced Course Search** - Search courses by multiple fields:
  - Course number
  - Course title
  - Course short name
  - Semester
  - Year
- **Multi-Environment Support** - Local, Dev, Staging, Preprod, and Production
- **User Management** - Save and manage multiple user configurations
- **Modern UI** - Beautiful gradient design with Ant Design components
- **LocalStorage Persistence** - Saved users persist across sessions
- **TypeScript** - Full type safety

## 📋 Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Node.js 18+ (for compatibility)

## 🛠️ Installation

1. Install dependencies with Bun:
```bash
bun install
```

2. Create environment file:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your production password if needed.

## 🏃‍♂️ Running the Application

### Development Mode
```bash
bun run dev
```

The application will be available at `http://localhost:3300`

### Production Build
```bash
bun run build
bun run start
```

## 🎯 Usage

### Searching for Courses

1. Select your target environment (Local, Dev, Staging, Preprod, Prod)
2. Use the search bar to find courses by:
   - Course number (e.g., "2110316")
   - Course title
   - Course short name
3. Filter by semester and year using the dropdown filters
4. Click on a course to auto-fill the launch form

### Launching a User

1. Fill in the user details in the launch form
2. Select the environment and role (Student/Instructor)
3. Click "Launch" to open the platform in a new tab
4. For production environment, you'll be prompted for a password

### Managing Saved Users

1. Fill in user details and click "Add to List"
2. Saved users appear in the right panel
3. Click "Edit" on a saved user to load their details into the form
4. Click "Delete" to remove a user from the list
5. All saved users persist in localStorage

## 🏗️ Project Structure

```
mcva-lms-launcher/
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   └── verify-password/ # Password verification endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── src/
│   ├── components/          # React components
│   │   ├── CourseSearch.tsx        # Course search with filters
│   │   ├── LaunchForm.tsx          # User launch form
│   │   └── SavedUsersList.tsx      # Saved users management
│   ├── hooks/               # Custom React hooks
│   │   └── useLocalStorage.ts      # LocalStorage hook
│   └── types/               # TypeScript types
│       └── index.ts         # Shared types and constants
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎨 Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Jose** - JWT signing and verification
- **Bun** - Fast JavaScript runtime and package manager

## 🔐 Security

- Production environment requires password verification
- JWT tokens for secure authentication
- Environment-specific API endpoints
- Client-side encryption with jose library

## 🌍 Environments

| Environment | Frontend | Backend |
|------------|----------|---------|
| Local | http://localhost:3000 | http://localhost:4400 |
| Dev | https://dev-map.mycourseville.com | https://api.dev-map.mycourseville.com |
| Staging | https://staging-map.mycourseville.com | https://ph63tct3gf.ap-southeast-1.awsapprunner.com |
| Preprod | https://qpguiruhm3.ap-southeast-1.awsapprunner.com | https://f8jgbq3abz.ap-southeast-1.awsapprunner.com |
| Prod | https://map.mycourseville.com | https://m9usmdhusg.ap-southeast-1.awsapprunner.com |

## 📝 License

Private - Internal Use Only

## 🤝 Contributing

This is an internal tool. For questions or issues, contact the development team.
