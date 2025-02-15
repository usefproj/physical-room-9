class BankAccount {
  constructor(name, age, balance, address) {
    this.name = name;
    this.age = age;
    this.balance = balance;
    this.address = {
      city: address.city,
      street: address.street,
      buildingNumber: address.buildingNumber,
      apartmentNumber: address.apartmentNumber,
    };
  }

  accountInfo() {
    console.log(`Client Name: ${this.name}, Balance: $${this.balance}`);
  }

  deposit(amount) {
    return new Promise((resolve, reject) => {
      if (typeof amount !== "number" || amount <= 0) {
        reject(new Error("Deposit amount must be a positive number."));
        return;
      }

      console.log("Processing deposit...");
      setTimeout(() => {
        this.balance += amount;
        resolve(`Deposit successful! New Balance: $${this.balance}`);
      }, 1000);
    });
  }

  async withdraw(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      return "Withdrawal amount must be a positive number.";
    }

    const isEnoughBalance = await this.balanceCompare(amount);
    if (isEnoughBalance) {
      this.balance -= amount;
      return `Withdrawal successful! New balance: $${this.balance}`;
    } else {
      return `Insufficient balance! Current balance: $${this.balance}`;
    }
  }

  balanceCompare(amount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.balance >= amount);
      }, 500);
    });
  }
}

(async () => {
  const myAccount = new BankAccount("John Doe", 30, 1000, {
    city: "New York",
    street: "5th Avenue",
    buildingNumber: 10,
    apartmentNumber: 5,
  });

  myAccount.accountInfo(); // Client Name: John Doe, Balance: $1000

  try {
    console.log(await myAccount.deposit(500)); // Deposit successful! New Balance: $1500
    console.log(await myAccount.deposit(-100)); // Error: Deposit amount must be a positive number.
  } catch (error) {
    console.error("Deposit Error:", error.message);
  }

  console.log(await myAccount.withdraw(300)); // Withdrawal successful! New balance: $1200
  console.log(await myAccount.withdraw(1500)); // Insufficient balance! Current balance: $1200
  console.log(await myAccount.withdraw(-200)); // Withdrawal amount must be a positive number.
})();
