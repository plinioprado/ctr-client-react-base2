import Form from 'react-bootstrap/Form';

const FieldFilter = ({
  filter,
  filterHandleField,
  filterList
  }) => {
   return(
    <Form.Control
      as="select"
      value={filter.field}
      onChange={(e) => filterHandleField(e.target.value)}
    >
      {
        filterList.map(it => (<option key={it.value} value={it.value}>{it.text}</option>))
      }
    </Form.Control>);
};

export default FieldFilter;
