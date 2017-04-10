import React, { PropTypes } from 'react';
import { observer } from 'mobx-react/native';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  AsyncStorage,
  Button,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import ListItem from '../components/ListItem';
import DetailPage from './DetailPage';
import EditModal from '../components/EditModal';
import AddressStore from '../stores/AddressStore';


@observer
class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        console.log(r1, r2);
        return r1.name !== r2.name || r1.tel !== r2.tel;
      }
    });
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.props.addressStore.fetchAddressList();
  }

  onItemClick = (data, sectionId, rowId) => {
    this.props.navigator.push({
      component: DetailPage,
      props: {
        data: data.data,
        addressStore: this.props.addressStore,
      }
    });
  };

  onAddConfirm = (id, name, tel) => {
    if (id == null) {
      this.props.addressStore.addAddress(name, tel);
    }
  };

  render() {
    const addressList = Array.prototype.slice.call(this.props.addressStore.data);
    return (
      <View style={styles.container}>
        <View style={styles.appBar}>
          <Text style={styles.appBarText}>通讯录</Text>
        </View>
        <ListView
          renderHeader={() => (this.props.addressStore.loading &&
            <View style={styles.indicator}>
              <ActivityIndicator />
            </View>
          )}
          style={styles.list}
          dataSource={this.ds.cloneWithRows(addressList)}
          enableEmptySections
          renderRow={(data, sectionId, rowId) =>
            <ListItem data={data} sectionId={sectionId} rowId={rowId} onClick={this.onItemClick} />
          }
        />
        <View style={styles.button}>
          <Button
            onPress={() => this.setState({ modalVisible: true })}
            title="+"
            color="#007aff"
            style={{ fontSize: 14 }}
          />
        </View>
        <EditModal
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
          onConfirm={this.onAddConfirm}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  appBar: {
    height: 60,
    paddingTop: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    borderColor: '#e5e5e5',
  },
  appBarText: {
    color: '#007aff',
    fontSize: 14,
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderColor: '#e5e5e5',
  },
  indicator: {
    padding: 10,
  }
});


const _IndexPage = function _IndexPage(props) {
  return <IndexPage {...props} addressStore={AddressStore} />;
};

export default _IndexPage;

