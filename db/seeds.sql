INSERT INTO department (id, name)
VALUES (01, "Billing"),
       (02, "Human Resources"),
       (03, "Customer Experience"),
       (04, "Information Technology"),
       (05, "Administration");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 95000.00, 01),
       ("Senior Lead", 65000.00, 02),
       ("Engineer", 80000.00, 03),
       ("Customer Liaison", 50000.00, 04),
       ("Receptionist", 40000.00, 05);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 01, 10),
       ("Dwight", "Shrute", 02, 14),
       ("Jim", "Halpert", 03, 19),
       ("Pam", "Beesly", 04, 21),
       ("Kevin", "Malone", 05, 25);