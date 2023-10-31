import { Col, Form } from "react-bootstrap";

type FieldBooleanProps = {
  fieldChangeValue: (fieldName: string, value: boolean) => void;
  fieldDisabled: boolean;
  fieldError: string;
  fieldLabel: string;
  fieldMd: string;
  fieldName: string;
  fieldValue: boolean;
};

const FieldBoolean = ({
  fieldChangeValue,
  fieldDisabled,
  fieldError,
  fieldLabel,
  fieldMd,
  fieldName,
  fieldValue,
}: FieldBooleanProps) => {
  const onChange = (e: any) => {
    const value = e.target.value === "true";
    fieldChangeValue(fieldName, value);
  };

  return (
    <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
      <Form.Label>{fieldLabel}</Form.Label>
      <Form.Control
        as="select"
        className={fieldError && "border-danger"}
        disabled={fieldDisabled}
        value={fieldValue ? "true" : "false"}
        onChange={onChange}
        key={fieldName}
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Form.Control>
      <Form.Text className="text-error">{fieldError}</Form.Text>
    </Form.Group>
  );
};

export default FieldBoolean;
