import store from '../js/stores/AddressStore';


it('is not loading', () => {
  expect(store.loading).toEqual(false);
});

it('should be loading', () => {
  store.setLoading(true);
  expect(store.loading).toEqual(true);
});

it('should get address list', () => {
  return store.fetchAddressList().then(() => {
    expect(store.data.length).toEqual(1);
  });
});

it('should add address', () => {
  return store.addAddress('name', 'tel').then(() => {
    expect(store.data.length).toEqual(2);
    expect(store.data[1].name).toEqual('name');
    expect(store.data[1].tel).toEqual('tel');
  });
});

it('should remove address', () => {
  return store.removeAddress('addid').then(() => {
    expect(store.data.length).toEqual(1);
    expect(store.data[0].name).toEqual('test name');
    expect(store.data[0].tel).toEqual('123');
  });
});

it('should put address', () => {
  return store.modifyAddress('testid', 'put', '456').then(() => {
    expect(store.data.length).toEqual(1);
    expect(store.data[0].name).toEqual('put');
    expect(store.data[0].tel).toEqual('456');
  });
});
