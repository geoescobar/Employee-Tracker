INSERT INTO department (department_name)
VALUES ("Accounting"),
        ("Marketing"),
        ("Engineering"),
        ("Sales"),
        ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 70000, 1),
        ('Social Media Analyst', 65000, 2),
        ('Front End Developer', 85000, 3),
        ('Business Development Rep', 75000, 4),
        ('Recruiter', 78000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('George', 'Escobar', 3, NULL),
        ('Tom', 'Brady', 1, 1),
        ('Mason', 'Mount', 2, 2),
        ('Serena', 'Williams', 4, 3),
        ('Luka', 'Doncic', 5, 4);
