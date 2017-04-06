import { observable, action } from 'mobx';
import Address from '../models/Address';
import { bmob } from '../utils/axios';

class AddressStore {
  @observable loading = false;
  @observable data = [];

  @action setLoading(loading = true) {
    this.loading = loading;
  };

  @action setAddressList(list) {
    this.data = list;
  };

  @action modifyAddress(id, name, tel) {
    let index = -1;
    for (const address of this.data) {
      if (address.id === id) {
        index = this.data.indexOf(address);
        break;
      }
    }
    if (index === -1) {
      return;
    }
    this.data[index] = new Address(name, tel, id);
    return bmob.put(`address/${id}`, {
      name, tel,
    });
  };

  @action fetchAddressList() {
    this.setLoading();
    return bmob.get('address/').then(action((response) => {
      const list = response.data.results;
      this.setLoading(false);
      this.data = list.map(Address.mapModelToAddress);
    }));
  };

  @action addAddress(name, tel) {
    this.setLoading();
    return bmob.post('address', {
      name, tel,
    }).then(action((response) => {
      this.setLoading(false);
      this.data.push(new Address(name, tel, response.data.objectId));
    }));
  };

  @action removeAddress(id) {
    this.data = this.data.filter(address => address.id !== id);
    return bmob.delete(`address/${id}`);
  };
}

const addressStore = new AddressStore();
export default addressStore;