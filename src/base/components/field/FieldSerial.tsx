import { Col, Form } from "react-bootstrap";

type FieldKeySerialProps = {
  fieldLabel: string;
  fieldMd: string;
  fieldName: string;
  fieldValue: number;
};

const FieldKeySerial = ({
  fieldLabel,
  fieldMd,
  fieldName,
  fieldValue,
}: FieldKeySerialProps) => {
  return (
    <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
      <Form.Label>{fieldLabel}</Form.Label>
      <Form.Control
        disabled
        type="text"
        defaultValue={fieldValue === 0 ? "Serial" : fieldValue}
        className="form-control"
        key={fieldName}
      />
    </Form.Group>
  );
};

export default FieldKeySerial;
