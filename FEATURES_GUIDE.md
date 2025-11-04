# 🎨 Features Guide - MCVA LMS Launcher v2.0

## 🔍 Advanced Course Search

### Search Capabilities

The new course search component provides powerful multi-field searching:

#### **Text Search**
Search across multiple fields simultaneously:
- 📚 **Course Number** (e.g., "2110316", "2110")
- 📖 **Course Title** (e.g., "Programming", "Database")
- 🏷️ **Course Short Name** (e.g., "PROG", "DB")
- 🆔 **MCV Course ID** (internal ID)

**Example Searches:**
```
"2110"          → Finds all courses starting with 2110
"programming"   → Finds all courses with "programming" in title
"PROG"          → Finds courses with PROG in short name
```

#### **Semester Filter**
Filter courses by semester:
- All Semesters (default)
- Semester 1
- Semester 2
- Semester 3
- Summer Session

#### **Year Filter**
Filter courses by academic year:
- All Years (default)
- 2567 (latest)
- 2566
- 2565
- etc.

**Note:** Years are sorted newest first for convenience.

### Search Features

✨ **Real-time Filtering**
- Results update instantly as you type
- No need to press enter or click search

📊 **Result Count Badge**
- Shows number of matching courses
- Updates in real-time
- Helps gauge search effectiveness

🎯 **Smart Empty States**
- Different messages for:
  - No courses available in environment
  - No courses match search criteria
- Helps users understand why they see no results

🎨 **Visual Course Cards**
- Clean, clickable cards
- Shows all relevant information:
  - Course number and short name
  - Full course title
  - Semester and year
- Hover effects for better UX
- Click to auto-fill form

### Usage Examples

**Find All Programming Courses in Semester 1, 2567:**
1. Type "programming" in search box
2. Select "Semester 1" from dropdown
3. Select "2567" from year dropdown
4. Click desired course to auto-fill form

**Find Specific Course:**
1. Type exact course number (e.g., "2110316")
2. Course appears immediately
3. Click to select

**Browse All Courses:**
1. Leave search box empty
2. Use semester/year filters to narrow down
3. Scroll through results

## 📋 Launch Form Features

### Auto-Fill Functionality

When you click a course in the search results, the form automatically fills:
- ✅ Course Number
- ✅ MCV Course ID
- ✅ Course Title
- ✅ Course Short Name
- ✅ Semester
- ✅ Year

**User still needs to fill:**
- User ID
- Student ID
- First Name (Thai)
- Last Name (Thai)
- Role (Student/Instructor)

### Environment Selection

Choose your target environment with visual indicators:

| Button | Environment | Use Case |
|--------|-------------|----------|
| 🖥️ Local | Local Development | Testing on local machine |
| 🔧 Dev | Development | Internal testing |
| 🎭 Staging | Staging | Pre-production testing |
| 🚀 Preprod | Pre-production | Final testing before prod |
| ⭐ Prod | Production | Live system (requires password) |

### Role Selection

- 👨‍🎓 **Student**: Regular student access
- 👨‍🏫 **Instructor**: Instructor/teacher access

### Form Actions

1. **🚀 Launch**
   - Validates all required fields
   - For production: Prompts for password
   - Generates JWT token
   - Opens platform in new tab
   - Shows success/error messages

2. **➕ Add to List**
   - Validates all required fields
   - Saves configuration to localStorage
   - Shows in Saved Users panel
   - Success notification

3. **🗑️ Clear**
   - Resets all form fields
   - Keeps environment selection
   - Quick way to start fresh

### Validation

- All fields are validated before submission
- Required fields show error messages
- Can't launch or save without required data
- Visual feedback for errors

## 👥 Saved Users Management

### Features

**Save User Configurations**
- Store unlimited user configurations
- Persists across browser sessions
- Stored in localStorage (browser-specific)

**User Cards Show:**
- Full name (Thai)
- Role badge (color-coded)
- Environment badge (color-coded)
- User ID and Student ID
- Full course information
- Semester and year

**Badge Colors:**
- 🔵 Blue: Student role
- 🟣 Purple: Instructor role
- ⚪ Gray: Local environment
- 🔵 Cyan: Dev environment
- 🟠 Orange: Staging environment
- 🟡 Gold: Preprod environment
- 🔴 Red: Production environment

### Actions

**✏️ Edit**
- Loads user data back into form
- Allows modification
- Can launch immediately
- Can update and save again

**🗑️ Delete**
- Removes user from saved list
- Shows confirmation dialog
- Prevents accidental deletion
- Success notification

### Use Cases

**Quick Testing**
```
1. Save multiple test users for different courses
2. Click "Edit" to quickly switch between them
3. Launch with one click
4. No need to re-type information
```

**Student/Instructor Toggle**
```
1. Save same user as Student
2. Save again as Instructor
3. Quickly test both perspectives
```

**Multi-Environment Testing**
```
1. Save user for dev environment
2. Edit and change to staging
3. Save as new entry
4. Test across environments easily
```

## 🎯 Typical Workflows

### Workflow 1: First Time Course Launch

```
1. Select Environment: Click "🔧 Dev"

2. Find Course:
   - Type "2110316" in search
   - Course appears instantly
   - Click course card

3. Form Auto-Fills:
   ✓ Course Number: 2110316
   ✓ Course ID: [auto]
   ✓ Course Title: [auto]
   ✓ Semester: 1
   ✓ Year: 2567

4. Add User Details:
   - User ID: 6512345678
   - Student ID: 6512345678
   - First Name: สมชาย
   - Last Name: ใจดี
   - Role: Student

5. Save for Later:
   - Click "Add to List"
   - User appears in right panel

6. Launch:
   - Click "Launch"
   - New tab opens with user logged in
```

### Workflow 2: Quick Launch from Saved User

```
1. Find saved user in right panel

2. Click "Edit"
   - Form fills with saved data
   - All fields populated

3. (Optional) Modify environment or role

4. Click "Launch"
   - Instant launch
   - No re-typing needed
```

### Workflow 3: Multi-Environment Testing

```
1. Search and select course

2. Fill user details once

3. For each environment:
   - Select environment
   - Click "Add to List"
   - Repeat for next environment

4. Result: Same user saved for all environments

5. Quick switching:
   - Click "Edit" on any saved version
   - Launch immediately
```

### Workflow 4: Course Discovery

```
1. Select "Semester 1" filter

2. Select "2567" year filter

3. Scroll through results

4. Find interesting course

5. Click to preview in form

6. Decide to launch or save
```

## 💡 Pro Tips

### Search Tips

✅ **Start Broad, Then Narrow**
- Start with semester/year filters
- Add text search to narrow down
- Faster than searching in long lists

✅ **Use Partial Matches**
- Type "2110" to see all 2110xxx courses
- Type "prog" to see all programming courses

✅ **Check Result Count**
- Badge shows how many matches
- Helps know if search is too broad/narrow

### Form Tips

✅ **Save Time with Templates**
- Save one user per course you test often
- Click "Edit" instead of re-typing

✅ **Naming Convention**
- Use descriptive names in Thai
- Makes saved users easier to identify

✅ **Test Data Organization**
- Save students and instructors separately
- Use different student IDs for clarity

### Saved Users Tips

✅ **Regular Cleanup**
- Delete old test users
- Keep list manageable

✅ **Environment-Specific Saves**
- Save per environment if configs differ
- Useful for environment-specific testing

✅ **Backup Important Configs**
- Copy user details to notes
- Browser cache can be cleared

## 🎨 Visual Features

### Modern Design Elements

- 🌈 **Gradient Backgrounds**: Beautiful blue-to-indigo gradient
- 🪟 **Glass Morphism**: Semi-transparent cards with backdrop blur
- ✨ **Hover Effects**: Interactive cards with subtle animations
- 🏷️ **Color-Coded Tags**: Easy visual identification
- 📱 **Responsive Layout**: Works on all screen sizes
- 🎯 **Visual Hierarchy**: Clear information structure

### UX Enhancements

- ⚡ **Instant Feedback**: Loading states for all actions
- 🔔 **Toast Notifications**: Non-intrusive success/error messages
- ⚠️ **Confirmation Dialogs**: Prevent accidental actions
- 🎨 **Empty States**: Helpful messages when no data
- 📊 **Count Badges**: Shows data quantities
- 🎭 **Icons Everywhere**: Visual cues for better understanding

## 🔐 Security Features

### Production Protection

When launching to production:
1. Modal dialog appears (not browser prompt)
2. Password must be entered
3. Verified server-side
4. Unauthorized access prevented

### Data Privacy

- All data stored locally in browser
- No server-side storage of user configs
- JWT tokens generated client-side
- Secure transmission to platform

## 📊 Performance

### Fast Search

- ⚡ Instant filtering (no API calls)
- 📦 All courses loaded once per environment
- 🔄 Real-time updates as you type
- 💾 Efficient localStorage usage

### Optimized Loading

- 🎯 Lazy loading of components
- 📦 Code splitting by route
- ⚡ Fast page transitions
- 🚀 Quick build times

## 🌍 Cross-Browser Support

Tested and working on:
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Brave

**Note:** localStorage support required (all modern browsers)

## 📱 Mobile Experience

While designed for desktop, the app is fully responsive:
- Single column layout on mobile
- Touch-friendly buttons
- Scrollable course list
- All features accessible

**Best Experience:** Desktop or tablet (768px+)

---

**Enjoy your enhanced MCVA LMS Launcher!** 🚀

For issues or questions, check the README.md or contact the development team.

