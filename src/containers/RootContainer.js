import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Routes from '../routes';

const RootContainer = ({ store }) => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

RootContainer.propTypes = {
  store: PropTypes.object.isRequired,
};

export default RootContainer;
