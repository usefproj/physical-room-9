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
      if (amount <= 0) {
        reject("Deposit amount must be greater than zero.");
      } else {
        console.log("Processing deposit...");
        setTimeout(() => {
          this.balance += amount; // Update balance directly inside the Promise
          resolve(`Deposit successful! New Balance: $${this.balance}`);
        }, 1000);
      }
    });
  }

  async balanceCompare(amount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.balance >= amount);
      }, 1000);
    });
  }

  async withdraw(amount) {
    const isEnoughBalance = await this.balanceCompare(amount);
    if (isEnoughBalance) {
      this.balance -= amount;
      return `Withdrawal successful! New balance: $${this.balance}`;
    } else {
      return `Insufficient balance! Current balance: $${this.balance}`;
    }
  }
}

// ✅ Correctly invoke the arrow function
(async () => {
  const myAccount = new BankAccount("John Doe", 30, 1000, {
    city: "New York",
    street: "5th Avenue",
    buildingNumber: 10,
    apartmentNumber: 5,
  });

  myAccount.accountInfo(); // Client Name: John Doe, Balance: $1000

  try {
    console.log(await myAccount.deposit(500)); // Processing deposit... // Deposit successful! New Balance: $1500
  } catch (error) {
    console.error("Deposit Error:", error);
  }
  console.log(await myAccount.withdraw(300)); // Withdrawal successful! New balance: $1200
  console.log(await myAccount.withdraw(1500)); // Insufficient balance! Current balance: $1200
})();
