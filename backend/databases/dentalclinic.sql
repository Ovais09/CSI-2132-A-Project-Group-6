CREATE DATABASE heroku_18cb672458b367b;

CREATE TABLE Person (
	SSN INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(15) NOT NULL,
	middle_name VARCHAR(15),
	last_name VARCHAR(15) NOT NULL,
	gender CHAR(1) NOT NULL,
	email_address VARCHAR(30) NOT NULL,
	date_of_birth DATE NOT NULL,
	phone_number VARCHAR(15) NOT NULL,
	house_number INT NOT NULL,
	street VARCHAR(30) NOT NULL,
	city VARCHAR(15) NOT NULL,
	province VARCHAR(5) NOT NULL
);

CREATE TABLE User (
	user_id INT NOT NULL auto_increment PRIMARY KEY, 
	userName VARCHAR(15) NOT NULL,
	SSN INT NOT NULL,
	password VARCHAR(30) NOT NULL,
	FOREIGN KEY (SSN) REFERENCES Person(SSN) ON DELETE CASCADE
);

CREATE TABLE Patient (
	patient_id INT NOT NULL  PRIMARY KEY,
	user_id INT NOT NULL,
	insurance_company VARCHAR(15),
	FOREIGN KEY (user_id) REFERENCES User(user_id),
	FOREIGN KEY (patient_id) REFERENCES Person(SSN) ON DELETE CASCADE
);

CREATE TABLE Branch (
	branch_id INT NOT NULL auto_increment PRIMARY KEY,
	city VARCHAR(15) NOT NULL
);

CREATE TABLE Employee (
     employee_id INT NOT NULL PRIMARY KEY,
     branch_id INT NOT NULL,
     manager_id INT,
     salary DECIMAL(8,2) NOT NULL check(salary>=0),
     employee_type VARCHAR(15) NOT NULL,
     employee_role VARCHAR(15) NOT NULL,
     FOREIGN KEY (branch_id) REFERENCES Branch(branch_id) on delete cascade,
     FOREIGN KEY (manager_id) REFERENCES Employee(employee_id),
     FOREIGN key (employee_id) REFERENCES person(SSN) on delete cascade
 );
 
 CREATE TABLE Review (
	review_id INT NOT NULL auto_increment,
	branch_id INT NOT NULL,
	user_id INT NOT NULL,
	professionalism_of_employees INT check(professionalism_of_employees BETWEEN 1 and 10),
	communication INT check(communication BETWEEN 1 and 10),
	cleanliness INT check(cleanliness BETWEEN 1 and 10),
	employee_values INT check(employee_values between 1 and 10),
	FOREIGN KEY (branch_id) REFERENCES Branch(branch_id) on delete cascade,
	FOREIGN KEY (user_id) REFERENCES User(user_id) on delete cascade,
    PRIMARY KEY (review_id, branch_id, user_id) 
);

CREATE TABLE Appointment (
	appointment_id INT NOT NULL AUTO_INCREMENT,
	patient_id INT NOT NULL,
	user_id INT NOT NULL,
	appointment_type VARCHAR(15) NOT NULL,
	appointment_status VARCHAR(15) NOT NULL,
	appointment_date DATE NOT NULL,
	start_time TIME(0) NOT NULL,
	end_time TIME(0) NOT NULL,
	room_assigned VARCHAR(15) NOT NULL,
	FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) on delete cascade,
	FOREIGN KEY (user_id) REFERENCES User(user_id) on delete cascade,
    PRIMARY KEY (appointment_id, patient_id)
);

CREATE TABLE InsuranceClaim (
	insurance_claim_id INT NOT NULL,
	patient_id INT NOT NULL,
    insurance_claim_amount Decimal(8,2) NOT NULL check (insurance_claim_amount>=0),
	appointment_id INT NOT NULL,
	FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) on delete cascade,
	FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id) on delete cascade,
    PRIMARY KEY (insurance_claim_id, patient_id, appointment_id)
);

CREATE TABLE Invoice (
	invoice_id INT NOT NULL auto_increment,
	patient_id INT NOT NULL,
	appointment_id INT NOT NULL,
	insurance_claim_id INT,
	patient_charge Decimal(8,2) NOT NULL check (patient_charge >=0),
	insurance_charge Decimal(8,2) NOT NULL check (insurance_charge >=0),
	total_charge Decimal(8,2) NOT NULL check (total_charge >=0),
	date_of_issue DATE NOT NULL,
	contact_name VARCHAR(15) NOT NULL,
	phone_number VARCHAR(15) NOT NULL,
	email_address VARCHAR(30) NOT NULL,
	discount Decimal(8,2),
	penalty Decimal(8,2),
	insurance_company VARCHAR(15),
	FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) on delete cascade,
	FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id) on delete cascade,
	FOREIGN KEY (insurance_claim_id) REFERENCES InsuranceClaim(insurance_claim_id) on delete cascade,
    PRIMARY KEY (invoice_id, patient_id, appointment_id)
);

CREATE TABLE PatientRecords (
	record_id INT NOT NULL,
	patient_id INT NOT NULL,
	records_date TIMESTAMP NOT NULL,
	FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) on delete cascade,
    PRIMARY KEY (record_id, patient_id)
);

CREATE TABLE AppointmentProcedure (
	procedure_id INT NOT NULL,
	patient_id INT NOT NULL,
	appointment_id INT NOT NULL,
	invoice_id INT NOT NULL,
	insurance_claim_id INT,
	procedure_date DATE NOT NULL,
	procedure_code VARCHAR(20) NOT NULL,
	procedure_type VARCHAR(15) NOT NULL,
	description VARCHAR(250) NOT NULL,
	medication VARCHAR(15) NOT NULL,
	quantity INT NOT NULL,
    penalized BOOL NOT NULL,
	FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) on delete cascade,
	FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id) on delete cascade,
	FOREIGN KEY (invoice_id) REFERENCES Invoice(invoice_id) on delete cascade,
	FOREIGN KEY (insurance_claim_id) REFERENCES InsuranceClaim(insurance_claim_id) on delete cascade,
    PRIMARY KEY (procedure_id, patient_id, appointment_id, invoice_id)
);

CREATE TABLE FeeCharge (
	fee_id INT NOT NULL,
	patient_id INT NOT NULL,
	appointment_id INT NOT NULL,
	procedure_id INT NOT NULL,
	charge Decimal(8,2) NOT NULL check (charge>=0),
	fee_code VARCHAR(20) NOT NULL,
	FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) on delete cascade,
	FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id) on delete cascade,
	FOREIGN KEY (procedure_id) REFERENCES AppointmentProcedure(procedure_id) on delete cascade,
    PRIMARY KEY (fee_id, patient_id, appointment_id, procedure_id)
);

CREATE TABLE PatientPayment (
	payment_id INT NOT NULL,
	user_id INT NOT NULL,
	patient_id INT NOT NULL,
	appointment_id INT NOT NULL,
	invoice_id INT NOT NULL,
	patient_charge Decimal(8,2) NOT NULL check(patient_charge>=0),
	insurance_charge Decimal(8,2) check(insurance_charge>=0),
	total_charge Decimal(8,2) NOT NULL check(total_charge>=0),
	FOREIGN KEY (user_id) REFERENCES User(user_id) on delete cascade,
	FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) on delete cascade,
	FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id) on delete cascade,
	FOREIGN KEY (invoice_id) REFERENCES Invoice(invoice_id) on delete cascade,
    PRIMARY KEY (payment_id, invoice_id, patient_id, appointment_id)
);

CREATE TABLE Treatment (
	treatment_id INT NOT NULL,
	patient_id INT NOT NULL,
	appointment_id INT NOT NULL, 
	record_id INT NOT NULL,
	appointment_type VARCHAR(15) NOT NULL,
	treatment_type VARCHAR(15) NOT NULL,
	medication VARCHAR(15) NOT NULL,
	quantity INT NOT NULL,
	comments VARCHAR(250),
	FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) on delete cascade,
	FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id) on delete cascade,
	FOREIGN KEY (record_id) REFERENCES PatientRecords(record_id) on delete cascade,
    PRIMARY KEY (treatment_id, patient_id, appointment_id)
);

CREATE Table Person_PhoneNumber(
person_phonenumber VARCHAR(15) NOT NULL,
SSN INT NOT NULL,
FOREIGN KEY(SSN) REFERENCES Person(SSN) on delete cascade,
PRIMARY KEY(person_phonenumber, SSN)
);

CREATE TABLE Appointment_EmployeeID(
    employee_id INT NOT NULL,
    appointment_id INT NOT NULL,
    patient_id INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id) on delete cascade,
    FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id) on delete cascade,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) on delete cascade,
    PRIMARY KEY(employee_id, appointment_id, patient_id)
);

CREATE TABLE Employee_PatientRecords(
    employee_id INT NOT NULL,
    record_id INT NOT NULL,
    patient_id INT NOT NULL,
    FOREIGN KEY(employee_id) REFERENCES Employee(employee_id) on delete cascade,
    FOREIGN KEY(record_id) REFERENCES PatientRecords(record_id) on delete cascade,
    FOREIGN KEY(patient_id) REFERENCES Patient(patient_id) on delete cascade,
    PRIMARY KEY(employee_id, record_id, patient_id)
);

CREATE TABLE PatientPayment_PaymentType(
    appointment_id INT NOT NULL,
    patient_id INT NOT NULL,
    invoice_id INT NOT NULL,
    payment_id INT NOT NULL,
    payment_type INT NOT NULL,
    FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id) on delete cascade,
    FOREIGN KEY(patient_id) REFERENCES Patient(patient_id) on delete cascade,
    FOREIGN KEY(invoice_id) REFERENCES Invoice(invoice_id) on delete cascade,
    FOREIGN KEY(payment_id) REFERENCES PatientPayment(payment_id) on delete cascade,
    PRIMARY KEY (appointment_id, patient_id, invoice_id, payment_id, payment_type)
);

CREATE TABLE PatientPayment_ProcedureID(
    appointment_id INT NOT NULL,
    patient_id INT NOT NULL,
    invoice_id INT NOT NULL,
    payment_id INT NOT NULL,
    procedure_id INT NOT NULL,
    FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id) on delete cascade,
    FOREIGN KEY(patient_id) REFERENCES Patient(patient_id) on delete cascade,
    FOREIGN KEY(invoice_id) REFERENCES Invoice(invoice_id) on delete cascade,
    FOREIGN KEY(payment_id) REFERENCES PatientPayment(payment_id) on delete cascade,
    FOREIGN KEY(procedure_id) REFERENCES AppointmentProcedure(procedure_id) on delete cascade,
    PRIMARY KEY (appointment_id, patient_id, invoice_id, payment_id, procedure_id)
);

CREATE TABLE Treatment_Symptoms(
    appointment_id INT NOT NULL,
    patient_id INT NOT NULL,
    treatment_id INT NOT NULL,
    symptom varchar(250),
    FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id) on delete cascade,
    FOREIGN KEY(patient_id) REFERENCES Patient(patient_id) on delete cascade,
    FOREIGN KEY(treatment_id) REFERENCES Treatment(treatment_id) on delete cascade,
    PRIMARY KEY(appointment_id, patient_id, treatment_id, symptom)
);

CREATE TABLE Treatment_Teeth(
    appointment_id INT NOT NULL,
    patient_id INT NOT NULL,
    treatment_id INT NOT NULL,
    teeth varchar(50),
    FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id) on delete cascade,
    FOREIGN KEY(patient_id) REFERENCES Patient(patient_id) on delete cascade,
    FOREIGN KEY(treatment_id) REFERENCES Treatment(treatment_id) on delete cascade,
    PRIMARY KEY(appointment_id, patient_id, treatment_id, teeth)
);
