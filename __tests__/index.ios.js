import 'react-native';
import React from 'react';
import Index from '../index.ios.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('mobx-react/native', () => require('mobx-react/custom'));

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
});
