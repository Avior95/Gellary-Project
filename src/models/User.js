class User {
  id;
  name;
  contact;
  address;
  security;
  checkBox;
  constructor(id, name, contact, address, security, checkBox) {
    this.id = id;
    this.name = name;
    this.contact = contact;
    this.address = address;
    this.security = security;
    this.checkBox = checkBox;
  }
}

class Name {
  name;
  lastName;

  constructor(name, lastName) {
    this.name = name;
    this.lastName = lastName;
  }
}

class Address {
  state;
  country;
  city;
  street;
  house;
  zipCode;

  constructor(state, country, city, street, house, zipCode) {
    this.state = state;
    this.country = country;
    this.city = city;
    this.street = street;
    this.house = house;
    this.zipCode = zipCode;
  }
}

class Contact {
  email;
  phone;
  constructor(email, phone) {
    this.email = email;
    this.Phone = phone;
  }
}

class Security {
  password;
  constructor(password) {
    this.password = password;
  }
}

export { User, Name, Address, Contact, Security };
