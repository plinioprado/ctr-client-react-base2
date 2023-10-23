import { Col, Form }from 'react-bootstrap';

const FieldSelect = ({
    fieldChangeValue,
    fieldDisabled,
    fieldError,
    fieldLabel,
    fieldMd,
    fieldName,
    fieldOptions,
    fieldValue
  }) => {

  const onChange = (e) => fieldChangeValue(fieldName, e.target.value.trim());

   return(
    <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
      <Form.Label>{fieldLabel}</Form.Label>
      <Form.Control
        as="select"
        disabled={fieldDisabled}
        value={fieldValue}
        onChange={onChange}
        className={fieldError && "border-danger"}
        key={fieldName}
      >
        <option key="empty" value=""></option>
        {
          fieldOptions && fieldOptions
            .map(op => (<option key={op.value} value={op.value}>{op.text}</option>))
        }
      </Form.Control>
      <Form.Text className="text-error">{fieldError}</Form.Text>
    </Form.Group>
    );
};

export default FieldSelect;
