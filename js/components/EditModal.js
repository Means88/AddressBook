import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableHighlight } from 'react-native';

class EditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.defaultName,
      tel: props.defaultTel,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.defaultName,
      tel: nextProps.defaultTel,
    });
  }

  handleOnConfirm = () => {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
    this.props.onConfirm(this.props.id, this.state.name, this.state.tel);
  };

  render() {
    const { defaultName, defaultTel, onConfirm, ...others } = this.props;
    return (
      <Modal {...others}>
        <View style={styles.container}>
          <View style={styles.appBar}>
            <Text style={styles.appBarText}>添加</Text>
          </View>
          <View style={styles.formComponent}>
            <TextInput
              style={[styles.text, styles.input]}
              placeholder="姓名"
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />
          </View>
          <View style={styles.formComponent}>
            <TextInput
              style={[styles.text, styles.input]}
              placeholder="电话"
              value={this.state.tel}
              onChangeText={tel => this.setState({ tel })}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              underlayColor="#fff"
              onPress={this.handleOnConfirm}
            >
              <Text style={[styles.confirm, styles.text, styles.input]}>
                确定
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#fff"
              onPress={this.props.onRequestClose}
            >
              <Text style={[styles.cancel, styles.text, styles.input]}>
                取消
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

EditModal.propTypes = {
  id: PropTypes.string,
  defaultName: PropTypes.string,
  defaultTel: PropTypes.string,
  onConfirm: PropTypes.func,
  onRequestClose: PropTypes.func,
};

EditModal.defaultProps = {
  id: null,
  defaultName: '',
  defaultTel: '',
  onConfirm: () => null,
  onRequestClose: () => null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  confirm: {
    color: '#007aff',
    width: '50%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  cancel: {
    color: '#E3170D',
    width: '50%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  formComponent: {
    paddingLeft: 12,
    paddingTop: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
  },
  input: {
    height: 44,
  },
  text: {
    fontSize: 14,
  },
  buttons: {
    padding: 24,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

export default EditModal;

