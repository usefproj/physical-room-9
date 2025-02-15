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

  // Deposit function (using Promises)
  deposit(amount) {
    return new Promise((resolve, reject) => {
      if (amount <= 0) {
        reject("Deposit amount must be greater than zero.");
      } else {
        console.log("Processing deposit...");
        setTimeout(() => {
          resolve(amount);
        }, 1000);
      }
    });
  }

  // Add amount to balance after deposit
  addAmount(amount) {
    this.balance += amount;
    return `Deposit successful! New Balance: $${this.balance}`;
  }

  // Check if there are sufficient funds for withdrawal
  async balanceCompare(amount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.balance >= amount);
      }, 1000);
    });
  }

  // Withdraw function (using async/await)
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

// Instantiate BankAccount
const myAccount = new BankAccount("John Doe", 30, 1000, {
  city: "New York",
  street: "5th Avenue",
  buildingNumber: 10,
  apartmentNumber: 5,
});

// Test deposit function
myAccount
  .deposit(500)
  .then((amount) => {
    console.log(myAccount.addAmount(amount));
  })
  .catch((error) => console.error("Deposit Error:", error));

(async () => {
  console.log(await myAccount.withdraw(300)); // Should succeed
  console.log(await myAccount.withdraw(1500)); // Should fail due to insufficient balance
})();
