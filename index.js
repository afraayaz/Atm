import inquirer from "inquirer";
import chalk from "chalk";
let balance = 1000;
let pincode = 1234;
let exitmenu = false;
let attempt = 0;
while (!exitmenu && attempt < 3) {
    //this loop limits the user attempt to guess atm pincode (only 2 attempts can be made)
    const pinasnwer = await inquirer.prompt([
        {
            message: chalk.green("Enter your atm pin"),
            name: "pin",
            type: "number",
        },
    ]);
    if (pinasnwer.pin === pincode) {
        /*condition to check pincode whether it's correct or not, if the pincode is
                                                   correct, the menu is displayed*/
        let transaction = false;
        while (!transaction) {
            const Choice = await inquirer.prompt([
                {
                    message: chalk.green("Choose Option"),
                    name: "option",
                    type: "list",
                    choices: ["withdraw cash", "check balance", "exit"],
                },
            ]);
            if (Choice.option === "withdraw cash") {
                const amount = await inquirer.prompt([
                    {
                        message: chalk.green("Enter amount: "),
                        name: "amt",
                        type: "number",
                    },
                ]);
                if (amount.amt > balance) {
                    console.log(chalk.red("Your Balance is less than your amount."));
                }
                else {
                    const ans = await inquirer.prompt([
                        {
                            message: chalk.green("Do you want to print receipt?"),
                            name: "receipt",
                            type: "list",
                            choices: ["Yes", "No"],
                        },
                    ]);
                    balance -= amount.amt;
                    console.log("Take your cash.");
                    if (ans.receipt === "Yes") {
                        console.log("***************************");
                        console.log("\tReceipt\t");
                        console.log("***************************");
                        console.log("Amount withdraw: " + amount.amt);
                        console.log("Remaining balance: " + balance);
                        console.log("***************************");
                        console.log("\tThankyou\t");
                        console.log("***************************");
                    }
                }
            }
            else if (Choice.option === "check balance") {
                console.log("Your current balance: " + balance);
            }
            else if (Choice.option === "exit") {
                console.log("Take your card.");
                console.log("Thankyou for choosing our Atm.");
                exitmenu = true;
                transaction = true;
            }
            if (Choice.option !== "exit") {
                const continueTransaction = await inquirer.prompt([
                    // ask user whether they want to perform another transcation or not
                    {
                        message: chalk.green("Do you want to perform another transaction?"),
                        name: "continue",
                        type: "confirm",
                    },
                ]);
                if (!continueTransaction.continue) {
                    transaction = true;
                    console.log("Take your card.");
                    console.log("Thankyou for choosing our Atm.");
                }
            }
        }
        break;
    }
    else {
        // if the pincode is correct else loop will execute
        console.log(chalk.red("Incorrect Pin! Please try again."));
        attempt++;
    }
}
if (attempt === 3) {
    console.log(chalk.red("Maximum number of attempts reached!"));
}
