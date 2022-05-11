INSERT INTO department (department_name)
VALUES ("Accounting"),
        ("Marketing"),
        ("Engineering"),
        ("Sales"),
        ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 70000, 1),
        ('Social Media Manager', 65000, 2),
        ('Front End Developer', 85000, 3),
        ('Business Development Rep', 75000, 4),
        ('Logistics Coordinator', 82000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('George', 'Escobar', 3, NULL),
        ('John', 'Doe', 1, 1),
        ('asdfsg', 'qewfgwf', 2, 2),
        ('efvfv', 'ccdcc', 4, 3),
        ('fvefvev', 'ewffcwf', 5, 4);
