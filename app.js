#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.cyanBright("=".repeat(90)));
console.log(chalk.bold.italic.greenBright("\t\t Code With SDA - Welcome to Student Management System "));
console.log(chalk.cyanBright("=".repeat(90)));
//Empty Array to store data of students
const studentArray = [];
//Id's Of Students
let nextId = 54321;
// Define student class
class Students {
    id;
    name;
    courses;
    balance;
    attendance;
    // Property of student
    constructor() {
        this.id = nextId++;
        this.name = "default";
        this.courses = "default";
        this.balance = 300000;
        this.attendance = 0; // Initialize attendance
    }
    // Use inquirer to get student name and subject
    async addStudent() {
        const studentDetails = await inquirer.prompt([
            {
                name: "studentName",
                type: "input",
                message: "Please Enter the Name of Student.",
            },
            {
                name: "courses",
                type: "list",
                choices: [
                    "TypeScript",
                    "JavaScript",
                    "HTML",
                    "Python",
                    "React",
                    "Next.js",
                    "Web 3.0",
                ],
            },
        ]);
        this.name = studentDetails.studentName;
        this.courses = studentDetails.courses;
        console.log(chalk.bold.italic.greenBright(`Congratulations !!! ${chalk.bold.italic.blue(this.name)} is successfully enrolled in ${chalk.bold.italic.blue(this.courses)}.`));
    }
    // Method to show student details
    biodata() {
        return `
    Name: ${this.name}
    Course: ${this.courses}
    Balance: ${this.balance}
    Attendance: ${this.attendance}`;
    }
}
//Loop
let condition = true;
while (condition) {
    //Choices of Student Management
    const options = await inquirer.prompt([
        {
            type: "list",
            name: "choices",
            message: "\nSelect one option",
            choices: [
                "Enroll Student",
                "Fee Payment",
                "Show Status",
                "Search Student",
                "Delete Student",
                "Attendance",
                "Show Attendance",
                "Exit",
            ],
        },
    ]);
    //Enroll Student
    if (options.choices === "Enroll Student") {
        const student = new Students();
        await student.addStudent();
        studentArray.push(student);
    }
    //Show all students which enrolled
    else if (options.choices === "Show Status") {
        //Heading of student 1 , student 2 ............
        for (let i = 0; i < studentArray.length; i++) {
            const student = studentArray[i];
            console.log(chalk.bold.italic.green(`\nStudent History ${i + 1}:`));
            //Print one by one student
            console.log(chalk.bold.cyanBright("\n=============================================================================="));
            console.log(chalk.bold.italic.gray("\n                  Name: ") +
                chalk.bold.italic.greenBright(student.name));
            console.log(chalk.bold.italic.gray("                  ID: ") +
                chalk.bold.italic.greenBright(student.id));
            console.log(chalk.bold.italic.gray("                  Course: ") +
                chalk.bold.italic.greenBright(student.courses));
            console.log(chalk.bold.italic.gray("                  Balance: ") +
                chalk.bold.italic.greenBright(student.balance));
            console.log(chalk.bold.cyanBright("\n=============================================================================="));
        }
        //Delete Student
    }
    else if (options.choices === "Delete Student") {
        //first we'll ask student name which we want to delete
        const deleteStudent = await inquirer.prompt([
            {
                name: "studentName",
                type: "input",
                message: "Enter the name of student which you want to delete.",
            },
        ]);
        let indexToDelete = -1;
        // Find the index of the student to delete
        for (const [index, student] of studentArray.entries()) {
            if (deleteStudent.studentName === student.name) {
                indexToDelete = index;
                break; // Exit the loop once the student is found
            }
        }
        // Check if the student was found
        if (indexToDelete !== -1) {
            // Remove the student from the array
            studentArray.splice(indexToDelete, 1);
            console.log(chalk.bold.italic.greenBright(`Student "${chalk.bold.italic.blue(deleteStudent.studentName)}" is deleted successfully`));
        }
        else {
            console.log(chalk.bold.italic.redBright(`Student "${chalk.bold.blue(deleteStudent.studentName)}"is not found in system's Database !!!`));
        }
    }
    //Search Student
    else if (options.choices === "Search Student") {
        //first we'll ask student name which we want to search
        const searchStudent = await inquirer.prompt([
            {
                name: "studentName",
                type: "input",
                message: "Please Enter the Name of Student.",
            },
        ]);
        let found = false;
        //after asking name we print student's data
        for (const student of studentArray) {
            if (searchStudent.studentName == student.name) {
                found = true;
                console.log(chalk.bold.cyanBright("\n=============================================================================="));
                console.log(chalk.bold.italic.greenBright(`\n ${chalk.bold.italic.blue(student.name)} is found successfully.`));
                console.log(chalk.bold.italic.gray("\n                  Name: ") +
                    chalk.bold.italic.greenBright(student.name));
                console.log(chalk.bold.italic.gray("                  ID: ") +
                    chalk.bold.italic.greenBright(student.id));
                console.log(chalk.bold.italic.gray("                  Courses: ") +
                    chalk.bold.italic.greenBright(student.courses));
                console.log(chalk.bold.italic.gray("                  Balance: ") +
                    chalk.bold.italic.greenBright(student.balance));
                console.log(chalk.bold.cyanBright("\n=============================================================================="));
            }
        }
        if (!found) {
            console.log(chalk.bold.italic.redBright("Student Not found in system's Database !!!"));
        }
    }
    //Fee Payment
    else if (options.choices === "Fee Payment") {
        // first we'll ask student name which we want to pay fee and how much amount
        const payFees = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter student name which want to pay fee ",
            },
            {
                name: "fees",
                type: "number",
                message: "Please Enter the Amount. ",
            },
        ]);
        //then we minus the fee from balance if student amount is more than balance then insufficient balance will print.
        for (const student of studentArray) {
            if (payFees.name === student.name) {
                const changeInNumber = parseFloat(payFees.fees);
                if (changeInNumber > student.balance) {
                    console.log(chalk.bold.italic.redBright("Insufficient balance !!!"));
                }
                else {
                    student.balance -= parseFloat(payFees.fees);
                    console.log(chalk.bold.italic.greenBright(`Congratulations !!! ${chalk.bold.italic.blue(student.name)}'s fees ${chalk.bold.italic.blue(payFees.fees)} has been succesfully paid.`));
                }
            }
        }
    }
    else if (options.choices === "Attendance") {
        async function markAttendance() {
            const studentAttendance = await inquirer.prompt([
                {
                    name: "id",
                    type: "input",
                    message: "Please Enter Your Student ID.",
                },
                {
                    name: "name",
                    type: "input",
                    message: "Please Enter your Name",
                },
            ]);
            const studentId = parseInt(studentAttendance.id);
            const studentName = studentAttendance.name;
            for (const student of studentArray) {
                if (student.id === studentId && student.name === studentName) {
                    student.attendance += 1;
                    console.log(chalk.bold.italic.greenBright(`${chalk.bold.italic.blue(student.name)} your attendance has been marked successfully.`));
                    return;
                }
            }
            console.log(chalk.bold.italic.redBright("Student not found or ID and name do not match !!!"));
        }
        await markAttendance();
    }
    else if (options.choices === "Show Attendance") {
        console.log(chalk.bold.italic.greenBright("Attendance Records:"));
        studentArray.forEach((student) => {
            console.log(chalk.bold.cyanBright("\n=============================================================================="));
            console.log(chalk.bold.italic.greenBright(student.biodata()));
            console.log(chalk.bold.cyanBright("\n=============================================================================="));
        });
    }
    else if (options.choices === "Exit") {
        condition = false;
    }
}
console.log(chalk.cyanBright("=".repeat(90)));
console.log(chalk.bold.italic.greenBright("\t\t Thank You for Using Student Management System "));
console.log(chalk.cyanBright("=".repeat(90)));
