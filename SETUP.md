# 🚀 Quick Setup Guide

## Prerequisites

Make sure you have [Bun](https://bun.sh/) installed:

```bash
# Install Bun (macOS/Linux)
curl -fsSL https://bun.sh/install | bash

# Or on Windows
powershell -c "irm bun.sh/install.ps1 | iex"
```

## Installation Steps

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Set Up Environment Variables** (Optional)
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` to customize the production password if needed:
   ```
   PROD_PASSWORD=your_secure_password
   ```

3. **Run Development Server**
   ```bash
   bun run dev
   ```
   
   The app will be available at: http://localhost:3300

4. **Build for Production**
   ```bash
   bun run build
   bun run start
   ```

## 🎯 Key Improvements in v2.0

### 1. **Next.js 15 App Router**
   - Migrated from Pages Router to modern App Router
   - Better performance and developer experience
   - Server components support

### 2. **Bun Package Manager**
   - Faster installation (was ~183s, typically 2-3x faster than npm)
   - Built-in TypeScript support
   - Better caching and dependency resolution

### 3. **Advanced Course Search**
   - **Multi-field search**: Search across course number, title, and short name simultaneously
   - **Filter by semester**: Dropdown filter for all available semesters
   - **Filter by year**: Dropdown filter for all available years (sorted newest first)
   - **Real-time results**: Instant filtering as you type
   - **Result count**: Badge showing number of matching courses
   - **Empty states**: Clear messaging when no courses match

### 4. **Improved UX**
   - **Auto-prefill**: Click a course to automatically fill the form
   - **Saved users**: Persist user configurations in localStorage
   - **Quick edit**: Click "Edit" on saved users to load their data
   - **Modern UI**: Beautiful gradient design with glass morphism effects
   - **Responsive layout**: 3-column layout that adapts to screen size
   - **Visual feedback**: Loading states, success messages, and confirmations

### 5. **Better State Management**
   - Replaced Recoil with lightweight localStorage hooks
   - Simpler architecture with fewer dependencies
   - Better performance and smaller bundle size

### 6. **Type Safety**
   - Full TypeScript coverage
   - Shared types and interfaces
   - Better autocomplete and error prevention

## 📁 Project Structure

```
mcva-lms-launcher/
├── app/                          # Next.js App Router
│   ├── api/verify-password/     # Password verification API
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (main app)
│
├── src/
│   ├── components/              # Reusable React components
│   │   ├── CourseSearch.tsx    # Advanced course search
│   │   ├── LaunchForm.tsx      # User configuration form
│   │   └── SavedUsersList.tsx  # Saved users management
│   │
│   ├── hooks/
│   │   └── useLocalStorage.ts  # Custom localStorage hook
│   │
│   └── types/
│       └── index.ts            # TypeScript types & constants
│
├── public/                      # Static assets
├── package.json                # Dependencies (using Bun)
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS config
└── next.config.js              # Next.js configuration
```

## 🎨 Features Demonstration

### Search Functionality
```
1. Type in search box: "2110316"
   → Shows all courses matching that number

2. Select "Semester 1" from dropdown
   → Filters to only semester 1 courses

3. Select "2567" from year dropdown
   → Further filters to year 2567

4. Click on a course card
   → Automatically fills the form with course details
```

### User Management
```
1. Fill in user details
2. Click "Add to List"
   → User saved to localStorage
   → Appears in right panel

3. Click "Edit" on saved user
   → Loads their data into form
   → Can launch or modify

4. Click "Delete"
   → Removes from saved list
   → Requires confirmation
```

## 🔧 Development Tips

### Using Bun Scripts
```bash
# Install a new package
bun add package-name

# Install dev dependency
bun add -d package-name

# Remove a package
bun remove package-name

# Run scripts
bun run dev    # Development
bun run build  # Production build
bun run start  # Start production server
bun run lint   # Run ESLint
```

### Debugging
- Open browser DevTools (F12)
- Check Console for errors
- Use React DevTools extension
- Check Network tab for API calls

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3300
lsof -ti:3300 | xargs kill -9
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
bun run build
```

### Module not found
```bash
# Reinstall dependencies
rm -rf node_modules
bun install
```

## 📊 Performance Metrics

- **Bundle size**: ~334 kB (First Load JS)
- **Build time**: ~20 seconds
- **Install time**: ~183 seconds (with Bun)
- **Page load**: < 1 second on local network

## 🎯 Next Steps

1. Customize the UI theme in `tailwind.config.js`
2. Add more search filters (instructor, course type, etc.)
3. Export/import saved user configurations
4. Add analytics and usage tracking
5. Implement user authentication for the launcher itself

## 📝 Notes

- All saved users are stored in browser localStorage
- Production launches require password verification
- Supports simultaneous launches in multiple environments
- Course data is fetched from environment-specific backends

---

Happy launching! 🚀

