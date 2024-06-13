create database project;
use project;
CREATE TABLE register (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    confirmedPassword VARCHAR(255) NOT NULL,
    nuIdInput VARCHAR(255) NOT NULL,
    roleSelect VARCHAR(255) NOT NULL,
    EmailSelect VARCHAR(255) NOT NULL,
    accompanyingSelect VARCHAR(255) NOT NULL,
    familyMembersSelect VARCHAR(255) NOT NULL,
    teamOrGuestSelect VARCHAR(255) NOT NULL,
    teamMembership VARCHAR(255) DEFAULT NULL
);
use project;
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from register;



select * from performances;

-- Create the 'menu' table
CREATE TABLE menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dish_name VARCHAR(255) NOT NULL,
    votes INT DEFAULT 0
);

-- Insert data into the 'menu' table
INSERT INTO menu (dish_name) VALUES
			('Khada Dumba'),
            ('Butter Chicken'),
            ('Goat Steaks'),
            ('Sheep Shinwari'),
            ('Dunmba Boti'),
            ('Gola kebab');

-- Create the 'performances' table
CREATE TABLE performances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    performance_name VARCHAR(255) NOT NULL,
    votes INT DEFAULT 0,
    user_selection VARCHAR(255)
);

-- Insert data into the 'performances' table
INSERT INTO performances (performance_name) VALUES
    ('Dance Performance'), ('Cultured Dance'), ('Magic Show'),
    ('Funny Skit'), ('Funny News Report'), ('Qawali'),
    ('Concert'), ('Bonfire'), ('Open Jamming'), ('Funny Qawali');

-- Add the 'performer_count' column to the 'performances' table
ALTER TABLE performances ADD COLUMN performer_count INT DEFAULT 0;

-- Create the 'managers' table
CREATE TABLE managers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Insert data into the 'managers' table
INSERT INTO managers (username, password, role) VALUES
    ('Budget', '1234', 'Budget-Manager'),
    ('Dance', '1234', 'Dance-Manager'),
    ('Invitation', '1234', 'Invitation-Manager'),
    ('Head', '1234', 'Head-Manager');
-- Create the 'events' table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_datetime DATETIME NOT NULL,
    event_location VARCHAR(255) NOT NULL,
    event_description TEXT NOT NULL
);

-- Insert sample data into the 'events' table
INSERT INTO events (event_name, event_datetime, event_location, event_description)
VALUES
    ('Event 1', '2023-12-15 00:00:00', 'CS Lawn', 'Food Stalls'),
    ('Event 2', '2023-12-15 17:00:00', 'CS Lawn', 'Bonfire and Jamming Session'),
    ('Event 3', '2023-12-15 18:00:00', 'Cricket Ground', 'Dance Performance'),
    ('Event 4', '2023-12-15 18:30:00', 'Cricket Ground', 'Magic Show'),
    ('Event 5', '2023-12-15 19:00:00', 'Cricket Ground', 'Funny Skit'),
    ('Event 6', '2024-01-10 19:30:00', 'Cricket Ground', 'Concert');

-- sql queries
SELECT COUNT(*) AS total_users
FROM register;

SELECT roleSelect, COUNT(*) AS user_count
FROM register
GROUP BY roleSelect;


--  Report on Menu:
-- Total Votes for Each Dish:

SELECT dish_name, votes
FROM menu;

-- Top 2 Voted Dishes:
SELECT dish_name, votes
FROM menu
ORDER BY votes DESC
LIMIT 5;


-- 3 Report on Performances:
-- Total Votes for Each Performance:

SELECT performance_name, votes
FROM performances;

-- Top 5 Voted Performances:

SELECT performance_name, votes
FROM performances
ORDER BY votes DESC
LIMIT 5;



-- 4 Report on Managers:
-- List of Managers:

SELECT username, role
FROM managers; 

-- 5. Report on Events:
-- List of Events:

SELECT event_name, event_datetime, event_location, event_description
FROM events;

-- Events with Descriptions Containing "Magic":

SELECT event_name, event_datetime, event_location, event_description
FROM events
WHERE event_description LIKE '%Magic%';


