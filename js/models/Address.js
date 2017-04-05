import uuid from 'uuid';
import { AsyncStorage } from 'react-native';
import { setToList } from '../utils';

class Address {

  static prefix = 'address';

  static get key() {
    return `${Address.prefix}:list`;
  }

  static getKeyList(callback) {
    return AsyncStorage.getItem(Address.key, callback).then((data) => {
      if (data === null) {
        return [];
      }
      return JSON.parse(data);
    }).catch(() => []);
  }

  static getList(callback) {
    return Address.getKeyList(callback).then(async (keyList) => {
      const list = [];
      for (const key of keyList) {
        const item = await AsyncStorage.getItem(key)
          .then(data => JSON.parse(data))
          .catch(() => null);
        list.push(item);
      }
      return list.filter(item => item !== null).map(item => new Address(item.name, item.tel, item.id));
    });
  }

  static add(name, tel, id) {
    const address = new Address(name, tel, id);
    return address.save();
  }

  constructor(name, tel, id = null) {
    this.id = id || uuid.v4();
    this.name = name;
    this.tel = tel;
  }

  get key() {
    return `${Address.prefix}:${this.id}`;
  }

  get json() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      tel: this.tel,
    });
  }

  async save(callback) {
    const keySet = new Set(await Address.getKeyList());
    if (!keySet.has(this.key)) {
      keySet.add(this.key);
      const keyList = setToList(keySet);
      await AsyncStorage.setItem(Address.key, JSON.stringify(keyList));
    }
    return AsyncStorage.setItem(this.key, this.json, callback);
  }

  async remove(callback) {
    const keySet = new Set(await Address.getKeyList());
    await keySet.delete(this.key);
    await AsyncStorage.setItem(Address.key, JSON.stringify(setToList(keySet)));
    return AsyncStorage.removeItem(this.key, callback);
  }

}

export default Address;
