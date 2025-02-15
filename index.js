class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }

    async balanceCompare(amount) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.balance >= amount);
            }, 1000);
        });
    }
    async withdraw(amount) {
        const isEnoughBalance = await this.balanceCompare(amount); 
        if (isEnoughBalance) {
            this.balance -= amount;
            return `Withdrawal successful! New balance: ${this.balance}`;
        } else {
            return `Insufficient balance! Current balance: ${this.balance}`;
        }
    }
}
const account = new BankAccount($);

(async () => {
    console.log(await account.withdraw($));
    console.log(await account.withdraw($));
})();
