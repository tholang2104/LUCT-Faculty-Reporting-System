-- LUCT Faculty Reporting System Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS report_feedback;
DROP TABLE IF EXISTS lecturer_reports;
DROP TABLE IF EXISTS course_assignments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;

-- Users table (handles all user types)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role ENUM('student', 'lecturer', 'prl', 'pl', 'admin') NOT NULL,
    contact_number VARCHAR(20),
    faculty VARCHAR(255),
    program VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(50) UNIQUE NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    faculty VARCHAR(255) NOT NULL,
    program VARCHAR(255),
    total_registered_students INT DEFAULT 0,
    semester INT NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Course Assignments (Lecturer to Course mapping)
CREATE TABLE course_assignments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    lecturer_id INT NOT NULL,
    assigned_by INT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (lecturer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_assignment (course_id, lecturer_id)
);

-- Lecturer Reports table
CREATE TABLE lecturer_reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lecturer_id INT NOT NULL,
    course_id INT NOT NULL,
    faculty_name VARCHAR(255) NOT NULL,
    class_name VARCHAR(255) NOT NULL,
    week_of_reporting INT NOT NULL,
    date_of_lecture DATE NOT NULL,
    actual_students_present INT NOT NULL,
    total_registered_students INT NOT NULL,
    venue VARCHAR(255) NOT NULL,
    scheduled_time TIME NOT NULL,
    topic_taught TEXT NOT NULL,
    learning_outcomes TEXT NOT NULL,
    recommendations TEXT,
    status ENUM('submitted', 'reviewed', 'approved') DEFAULT 'submitted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lecturer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Report Feedback table (for PRL feedback)
CREATE TABLE report_feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    report_id INT NOT NULL,
    prl_id INT NOT NULL,
    feedback TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES lecturer_reports(id) ON DELETE CASCADE,
    FOREIGN KEY (prl_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Ratings table (for rating lecturers, courses, etc.)
CREATE TABLE ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rated_by INT NOT NULL,
    rated_user_id INT,
    course_id INT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    rating_type ENUM('lecturer', 'course') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rated_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (rated_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password, full_name, role, contact_number, faculty) 
VALUES (
    'admin@luct.ac.ls', 
    '$2a$10$YQz5YxZ5YxZ5YxZ5YxZ5YeK5YxZ5YxZ5YxZ5YxZ5YxZ5YxZ5YxZ5Y',
    'System Administrator',
    'admin',
    '12345678',
    'Faculty of Information Communication Technology'
);

-- Insert sample Program Leader
INSERT INTO users (email, password, full_name, role, contact_number, faculty, program) 
VALUES (
    'pl@luct.ac.ls', 
    '$2a$10$YQz5YxZ5YxZ5YxZ5YxZ5YeK5YxZ5YxZ5YxZ5YxZ5YxZ5YxZ5YxZ5Y',
    'John Doe - Program Leader',
    'pl',
    '12345679',
    'Faculty of Information Communication Technology',
    'Diploma in Information Technology'
);

-- Insert sample Principal Lecturer
INSERT INTO users (email, password, full_name, role, contact_number, faculty, program) 
VALUES (
    'prl@luct.ac.ls', 
    '$2a$10$YQz5YxZ5YxZ5YxZ5YxZ5YeK5YxZ5YxZ5YxZ5YxZ5YxZ5YxZ5YxZ5Y',
    'Jane Smith - Principal Lecturer',
    'prl',
    '12345680',
    'Faculty of Information Communication Technology',
    'Diploma in Information Technology'
);

-- Insert sample Lecturer
INSERT INTO users (email, password, full_name, role, contact_number, faculty) 
VALUES (
    'lecturer@luct.ac.ls', 
    '$2a$10$YQz5YxZ5YxZ5YxZ5YxZ5YeK5YxZ5YxZ5YxZ5YxZ5YxZ5YxZ5YxZ5Y',
    'Tsekiso Thokoana',
    'lecturer',
    '12345681',
    'Faculty of Information Communication Technology'
);

-- Insert sample Student
INSERT INTO users (email, password, full_name, role, contact_number, faculty, program) 
VALUES (
    'student@luct.ac.ls', 
    '$2a$10$YQz5YxZ5YxZ5YxZ5YxZ5YeK5YxZ5YxZ5YxZ5YxZ5YxZ5YxZ5YxZ5Y',
    'Student Test User',
    'student',
    '12345682',
    'Faculty of Information Communication Technology',
    'Diploma in Information Technology'
);

-- Insert sample courses
INSERT INTO courses (course_code, course_name, faculty, program, total_registered_students, semester, created_by) 
VALUES 
    ('DIWA2110', 'Web Application Development', 'Faculty of Information Communication Technology', 'Diploma in Information Technology', 30, 1, 2),
    ('DIBA2120', 'Database Management Systems', 'Faculty of Information Communication Technology', 'Diploma in Information Technology', 28, 1, 2),
    ('DINE2130', 'Computer Networks', 'Faculty of Information Communication Technology', 'Diploma in Information Technology', 25, 1, 2);

-- Assign courses to lecturer
INSERT INTO course_assignments (course_id, lecturer_id, assigned_by) 
VALUES 
    (1, 4, 2),
    (2, 4, 2),
    (3, 4, 2);