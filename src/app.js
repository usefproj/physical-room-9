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
}
