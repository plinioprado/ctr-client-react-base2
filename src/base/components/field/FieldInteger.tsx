import { Col, Form } from "react-bootstrap";

type FieldIntegerProps = {
  fieldAutoComplete: string;
  fieldChangeValue: (fieldName: string, value: string) => void;
  fieldDisabled: boolean;
  fieldError: string;
  fieldLabel: string;
  fieldMaxLength: number;
  fieldMd: string;
  fieldName: string;
  fieldPlaceHolder: string;
  fieldValue: number;
};

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
  fieldValue,
}: FieldIntegerProps) => {
  const onChange = (e: any) => {
    const value = e.target.value.trim();
    fieldChangeValue(fieldName, value);
  };

  return (
    <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
      <Form.Label>{fieldLabel}</Form.Label>
      <Form.Control
        autoComplete={fieldAutoComplete}
        className={fieldError && "border-danger"}
        defaultValue={fieldValue}
        disabled={fieldDisabled}
        maxLength={fieldMaxLength}
        onChange={onChange}
        placeholder={fieldPlaceHolder}
        type="text"
        style={{ textAlign: "right" }}
        key={fieldName}
      />
      <Form.Text className="text-error">{fieldError}</Form.Text>
    </Form.Group>
  );
};

export default FieldInteger;
