# Testing Guide - LUCT Reporting System

## 🧪 Complete Testing Checklist

### Pre-Testing Setup

1. **Ensure both servers are running:**
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

2. **Database is populated with test data**

3. **Have test credentials ready**

---

## 1. Authentication Testing

### Test Login
- [ ] Login as Student (student@luct.ac.ls / admin123)
- [ ] Login as Lecturer (lecturer@luct.ac.ls / admin123)
- [ ] Login as PRL (prl@luct.ac.ls / admin123)
- [ ] Login as PL (pl@luct.ac.ls / admin123)
- [ ] Test invalid credentials (should show error)
- [ ] Test empty fields (should show validation)

### Test Registration
- [ ] Register new student account
- [ ] Register new lecturer account
- [ ] Test duplicate email (should show error)
- [ ] Test password mismatch (should show error)
- [ ] Test all required fields

---

## 2. Student Module Testing

### Dashboard
- [ ] View dashboard statistics
- [ ] See available courses count
- [ ] View recent lecture reports
- [ ] Check attendance percentages

### Monitoring
- [ ] View all lecture reports
- [ ] Filter reports by course
- [ ] See report details (date, topic, attendance)
- [ ] Check report status badges

### Rating
- [ ] Open rating modal for lecturer
- [ ] Select lecturer from dropdown
- [ ] Rate with stars (1-5)
- [ ] Add comment
- [ ] Submit rating
- [ ] Open rating modal for course
- [ ] Select course from dropdown
- [ ] Rate course
- [ ] Submit course rating

---

## 3. Lecturer Module Testing

### Dashboard
- [ ] View personal statistics
- [ ] See assigned courses count
- [ ] View total reports submitted
- [ ] Check average attendance
- [ ] View reports by week chart
- [ ] See recent reports table

### Classes
- [ ] View all assigned courses
- [ ] See course details (code, name, students)
- [ ] Check faculty and program info

### Reports
- [ ] Click "Create Report" button
- [ ] Fill all required fields:
  - [ ] Select course
  - [ ] Enter faculty name
  - [ ] Enter class name
  - [ ] Select week of reporting
  - [ ] Enter date of lecture
  - [ ] Enter scheduled time
  - [ ] Enter actual students present
  - [ ] Enter total registered students
  - [ ] Enter venue
  - [ ] Enter topic taught
  - [ ] Enter learning outcomes
  - [ ] Enter recommendations (optional)
- [ ] Submit report
- [ ] View submitted report in list
- [ ] Edit existing report
- [ ] Update report details
- [ ] Save changes
- [ ] Delete report (with confirmation)
- [ ] Search reports by course/topic
- [ ] Filter by week
- [ ] Filter by status
- [ ] Export reports to Excel
- [ ] Download and verify Excel file

### Monitoring
- [ ] View monitoring statistics
- [ ] Check total reports count
- [ ] See average attendance percentage
- [ ] View weeks covered
- [ ] See approved reports count
- [ ] View reports by week chart
- [ ] View reports by status pie chart

### Rating
- [ ] View personal ratings
- [ ] See average rating score
- [ ] Check total ratings count
- [ ] View individual rating comments
- [ ] See rating dates

---

## 4. Principal Lecturer (PRL) Module Testing

### Dashboard
- [ ] View PRL dashboard
- [ ] See overview statistics

### Courses
- [ ] View all courses in program
- [ ] See course details
- [ ] Check assigned lecturers

### Reports
- [ ] View all lecturer reports
- [ ] Filter reports by lecturer
- [ ] Filter by course
- [ ] Filter by week
- [ ] Click "Add Feedback" button
- [ ] Enter feedback text
- [ ] Submit feedback
- [ ] Verify report status changes to "reviewed"
- [ ] View feedback in report details

### Monitoring
- [ ] View program-wide statistics
- [ ] Check attendance trends
- [ ] See reports distribution

### Classes
- [ ] View all classes in program
- [ ] See class schedules

### Rating
- [ ] View lecturer ratings in program
- [ ] See rating statistics

---

## 5. Program Leader (PL) Module Testing

### Dashboard
- [ ] View PL dashboard
- [ ] See program overview

### Courses
- [ ] Click "Add Course" button
- [ ] Fill course details:
  - [ ] Course code
  - [ ] Course name
  - [ ] Faculty
  - [ ] Program
  - [ ] Total students
  - [ ] Semester
- [ ] Create course
- [ ] View course in list
- [ ] Edit course details
- [ ] Update course
- [ ] Delete course (with confirmation)
- [ ] Search courses

### Lecturers
- [ ] View all lecturers
- [ ] See lecturer details
- [ ] Click "Assign Lecturer to Course"
- [ ] Select course from dropdown
- [ ] Select lecturer from dropdown
- [ ] Assign lecturer
- [ ] Verify assignment successful
- [ ] Test duplicate assignment (should show error)

### Reports
- [ ] View all reports from program
- [ ] Add feedback to reports
- [ ] Monitor report status

### Monitoring
- [ ] View program-wide analytics
- [ ] Check performance metrics

### Classes
- [ ] View all program classes
- [ ] See class details

### Rating
- [ ] View all ratings in program
- [ ] See rating statistics

---

## 6. Search Functionality Testing

### Test in Each Module
- [ ] **Lecturer Reports:** Search by course code
- [ ] **Lecturer Reports:** Search by topic
- [ ] **Courses:** Search by course name
- [ ] **Courses:** Search by course code
- [ ] **Reports (PRL/PL):** Search by lecturer name
- [ ] **Reports (PRL/PL):** Search by course
- [ ] Verify search results update in real-time
- [ ] Test empty search (should show all)
- [ ] Test no results found

---

## 7. Excel Export Testing

### Export Reports
- [ ] Navigate to Reports page
- [ ] Click "Export to Excel" button
- [ ] Verify file downloads
- [ ] Open Excel file
- [ ] Check all columns present:
  - [ ] Report ID
  - [ ] Lecturer
  - [ ] Course Code
  - [ ] Course Name
  - [ ] Faculty
  - [ ] Class
  - [ ] Week
  - [ ] Date
  - [ ] Present
  - [ ] Total Students
  - [ ] Attendance %
  - [ ] Venue
  - [ ] Time
  - [ ] Topic
  - [ ] Learning Outcomes
  - [ ] Recommendations
  - [ ] Status
- [ ] Verify data accuracy
- [ ] Check formatting (headers, colors)

---

## 8. UI/UX Testing

### Navigation
- [ ] Test navbar links
- [ ] Verify role-based menu items
- [ ] Test logout functionality
- [ ] Check page redirects

### Responsive Design
- [ ] Test on desktop (1920x1080)
- [ ] Test on laptop (1366x768)
- [ ] Test on tablet (768px)
- [ ] Test on mobile (375px)
- [ ] Check Bootstrap responsiveness

### Visual Elements
- [ ] Verify all icons display
- [ ] Check color schemes
- [ ] Test hover effects
- [ ] Verify loading spinners
- [ ] Check alert messages
- [ ] Test modal dialogs

---

## 9. Error Handling Testing

### Test Error Scenarios
- [ ] Submit form with missing required fields
- [ ] Try to access unauthorized pages
- [ ] Test with invalid data types
- [ ] Test with SQL injection attempts
- [ ] Test with XSS attempts
- [ ] Disconnect backend and test error messages
- [ ] Test database connection failure
- [ ] Test network timeout

---

## 10. Performance Testing

### Load Testing
- [ ] Create 10+ reports quickly
- [ ] Load page with 100+ reports
- [ ] Test search with large dataset
- [ ] Export large Excel file
- [ ] Test concurrent users (if possible)

### Speed Testing
- [ ] Measure page load times
- [ ] Check API response times
- [ ] Test chart rendering speed
- [ ] Verify smooth scrolling

---

## 11. Data Integrity Testing

### Verify Data Consistency
- [ ] Create report and verify in database
- [ ] Update report and check changes saved
- [ ] Delete report and verify removal
- [ ] Check foreign key constraints
- [ ] Test cascade deletes
- [ ] Verify timestamps update correctly

---

## 12. Security Testing

### Authentication & Authorization
- [ ] Try accessing protected routes without login
- [ ] Try accessing other role's pages
- [ ] Test token expiration
- [ ] Test password hashing (check database)
- [ ] Verify JWT tokens

---

## 📊 Test Results Template

Create a document with results:

```
# Test Results - LUCT Reporting System

Date: [Date]
Tester: [Your Name]

## Summary
- Total Tests: [Number]
- Passed: [Number]
- Failed: [Number]
- Pass Rate: [Percentage]

## Failed Tests
1. [Test Name] - [Issue Description]
2. [Test Name] - [Issue Description]

## Issues Found
1. [Issue] - Priority: [High/Medium/Low]
2. [Issue] - Priority: [High/Medium/Low]

## Recommendations
1. [Recommendation]
2. [Recommendation]
```

---

## 🐛 Bug Reporting Template

If you find bugs, document them:

```
**Bug Title:** [Short description]

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Result:** [What should happen]

**Actual Result:** [What actually happened]

**Screenshots:** [If applicable]

**Browser/Environment:** [Chrome, Firefox, etc.]

**Priority:** [High/Medium/Low]
```

---

## ✅ Final Verification

Before submission, verify:
- [ ] All critical features work
- [ ] No console errors
- [ ] All user roles tested
- [ ] Search works everywhere
- [ ] Excel export works
- [ ] Application is deployed
- [ ] GitHub repository is updated
- [ ] README is complete
- [ ] All documentation is ready

---

## 📝 Notes

- Test systematically, don't skip steps
- Document all issues found
- Take screenshots of bugs
- Test with different browsers
- Clear cache between tests
- Use different user accounts
- Test edge cases
- Verify data persistence

Good luck with testing! 🎉