// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require('./Student')
const readline = require('readline');

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  // console.log('the commands: ', command, command.trim().split(' '))
  const [operation, ...args] = command.trim().split(' ');
  // console.log('after theyre split: ', operation, args)
  switch (operation) {
    case 'add':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (code is given)
       *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
       */
        console.log('Adding student...')
        const [name, year, email, specialization] = args
        // const name = args[0]
        // const year = args[1]
        // const email = args[2]
        // const specialization = args[3]
        // --------> WRITE YOUR CODE BELOW
        let newStudent = new Student(name, year, email, specialization)
        await studentManagementSystem.addStudent(newStudent)
          console.log("Finished adding student", studentManagementSystem, newStudent.getString())
        // --------> WRITE YOUR CODE ABOVE
        break;

    case 'remove':
      /**
       * TODO:
       *  Removes a particular student by email
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (removeEmail)
       *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
       */
      console.log('Removing student...')
      // --------> WRITE YOUR CODE BELOW
      // console.log('the args: ', args)
      const [removeEmail] = args
      // const removeEmail = args[0]
        await studentManagementSystem.removeStudent(removeEmail)
        console.log(studentManagementSystem)
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'display':
      /**
       * TODO:
       *  Displays the students in the Linked List
       *  You will need to do the following:
       *   - Use implemneted functions in LinkedList to display the student
       */
      console.log('Displaying students...')
      // --------> WRITE YOUR CODE BELOW
      let displayNames = await studentManagementSystem.displayStudents()
      console.log(displayNames)

      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'find':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (findEmail)
       *   - Use implemented functions in LinkedList to grab the Student
       *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
       */
      console.log('Finding student...')
      // --------> WRITE YOUR CODE BELOW
      const [findEmail] = args
        let foundStudent = await studentManagementSystem.findStudent(findEmail)
        console.log(foundStudent.getString())

      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'save':
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (save[FileName])
       *   - Use implemented functions in LinkedList to save the data
       */
      console.log('Saving data...')
      // --------> WRITE YOUR CODE BELOW
      const [fileName] = args;
      await studentManagementSystem.saveToJson(fileName)
      // --------> WRITE YOUR CODE ABOVE
      break;

    case "load":
      /**
       * TODO:
       *  Loads data from specified JSON file into current Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (loadFileName)
       *   - Use implemented functions in LinkedList to save the data, and display the updated LinkedList
       */
      console.log('Loading data...')
      // --------> WRITE YOUR CODE BELOW
      const [loadedFile] = args
      await studentManagementSystem.loadFromJSON(loadedFile)
      console.log(studentManagementSystem)

      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'clear':
      /**
       * TODO:
       *  Clears all data in the Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Use implemented functions in LinkedList to clear the data
       */
      console.log('Clearing data...')
      // --------> WRITE YOUR CODE BELOW
      await studentManagementSystem.clearStudents()
      console.log(studentManagementSystem)
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'q':
        console.log('Exiting...');
        rl.close();
        break;

    default:
        console.log('Unknown command. Type "help" for a list of commands.');
        break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log('Welcome to the Student Management System!');
main();
rl.on('line', async (input) => {
  if (input.trim().toLowerCase() === 'help') {
    main();
  } else {
      await handleCommand(input);
  }
});
rl.on('close', () => {
  console.log('Goodbye!');
});
