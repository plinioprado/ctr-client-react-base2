import { Col, Form } from 'react-bootstrap';

const FieldInteger = ({
    fieldAutoComplete,
    fieldChangeValue,
    fieldDisabled,
    fieldError,
    fieldLabel,
    fieldMaxLength,
    fieldMd,
    fieldName,
    fieldPlaceHolder,
    fieldValue
  }) => {

  const onChange = (e) => {
    const value = e.target.value.trim()
    fieldChangeValue(fieldName, value);
  };

  return (
  <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
    <Form.Label>{fieldLabel}</Form.Label>
    <Form.Control
      autoComplete={fieldAutoComplete}
      className={ fieldError && "border-danger"}
      defaultValue={fieldValue}
      disabled={fieldDisabled}
      maxLength={fieldMaxLength}
      onChange={onChange}
      placeholder={fieldPlaceHolder}
      type="text"
      style={{textAlign: 'right'}}
      key={fieldName}
    />
    <Form.Text className="text-error">{fieldError}</Form.Text>
  </Form.Group>
  );
};

export default FieldInteger;
