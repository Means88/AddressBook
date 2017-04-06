class Address {

  static mapModelToAddress(model) {
    return new Address(model.name, model.tel, model.objectId);
  }

  constructor(name, tel, id = null) {
    this.id = id;
    this.name = name;
    this.tel = tel;
  }

  get json() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      tel: this.tel,
    });
  }
}

export default Address;
