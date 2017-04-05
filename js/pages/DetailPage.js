import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Address from '../models/Address';
import EditModal from '../components/EditModal';

class DetailPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      data: props.data,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: false,
      data: nextProps.data,
    });
  }

  onEditConfirm = (id, name, tel) => {
    const address = new Address(name, tel, id);
    this.setState({
      data: address,
    });
    address.save().then(this.props.refreshList);
  };

  removeAddress = () => {
    this.state.data.remove().then(this.props.refreshList);
    this.navigateBack();
  };

  navigateBack = () => {
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appBar}>
          <TouchableHighlight
            underlayColor="#fff"
            onPress={this.navigateBack}
          >
            <Text style={styles.appBarText}>返回</Text>
          </TouchableHighlight>
          <Text style={styles.appBarText}>通讯录</Text>
          <TouchableHighlight
            underlayColor="#fff"
            onPress={() => this.setState({
              modalVisible: true,
            })}
          >
            <Text style={styles.appBarText}>修改</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.line}>
          <Text style={styles.label}>姓名</Text>
          <Text style={styles.value}>{this.state.data.name}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.label}>电话</Text>
          <Text style={styles.value}>{this.state.data.tel}</Text>
        </View>
        <View style={styles.deleteContainer}>
          <TouchableHighlight
            onPress={this.removeAddress}
            underlayColor="#fff"
          >
            <Text style={styles.deleteText}>删除</Text>
          </TouchableHighlight>
        </View>
        <EditModal
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
          onConfirm={this.onEditConfirm}
          id={this.props.data.id}
          defaultName={this.state.data.name}
          defaultTel={this.state.data.tel}
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
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderColor: '#e5e5e5',
    flexDirection: 'row',
  },
  appBarText: {
    color: '#007aff',
    fontSize: 14,
  },
  line: {
    padding: 12,
  },
  label : {
    color: '#7f7f7f',
  },
  value: {
    marginTop: 12,
  },
  deleteText: {
    color: '#E3170D',
    fontSize: 14,
  },
  deleteContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  }
});

export default DetailPage;

