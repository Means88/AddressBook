import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, ListView, AsyncStorage, Button, TouchableHighlight } from 'react-native';
import Address from '../models/Address';
import ListItem from '../components/ListItem';
import DetailPage from './DetailPage';
import EditModal from '../components/EditModal';

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  onItemClick = (data, sectionId, rowId) => {
    this.props.navigator.push({
      component: DetailPage,
      props: {
        data: data.data,
        refreshList: this.refreshList,
      }
    });
  };

  refreshList = (callback) => {
    Address.getList().then((list) => {
      this.setState({ dataSource: this.ds.cloneWithRows(list), callback });
    });
  };

  onAddConfirm = (id, name, tel) => {
    if (id == null) {
      Address.add(name, tel).then(() => {
        this.refreshList();
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appBar}>
          <Text style={styles.appBarText}>通讯录</Text>
        </View>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
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
  }
});

export default IndexPage;

