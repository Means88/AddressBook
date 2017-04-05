import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class ListItem extends React.Component {

  handleOnClick = () => {
    const { onClick, ...others } = this.props;
    if (onClick) {
      onClick(others);
    }
  };

  render() {
    return (
      <TouchableHighlight
        style={styles.listItem}
        underlayColor="#e5e5e5"
        onPress={this.handleOnClick}
      >
        <Text>{this.props.data.name}</Text>
      </TouchableHighlight>
    )
  }
}

ListItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  sectionId: PropTypes.string.isRequired,
  rowId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const styles = StyleSheet.create({
  listItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#e5e5e5',
    backgroundColor: 'white',
  },
});

export default ListItem;

