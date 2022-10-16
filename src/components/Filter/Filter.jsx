import React from 'react';
import PropTypes from 'prop-types';

import { Text, Container, Input } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <Container>
      <Text>Find contacts by name</Text>
      <Input type="text" value={value} onChange={onChange} />
    </Container>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
