import Form from 'react-bootstrap/Form';

const FieldFilterValue = ({
  value,
  onChange,
}) => {
  return <Form.Control
    type="text"
    maxLength="30"
    defaultValue={value}
    onChange={(e) => onChange(e.target.value)}
  />
};

export default FieldFilterValue;
