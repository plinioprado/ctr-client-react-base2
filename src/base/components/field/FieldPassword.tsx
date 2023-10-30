import { Col, Form } from "react-bootstrap";

type FieldPasswordProps = {
  fieldChangeValue: (fieldName: string, value: string) => void;
  fieldDisabled: boolean;
  fieldError: string;
  fieldLabel: string;
  fieldMaxLength: number;
  fieldMd: string;
  fieldName: string;
  fieldPlaceHolder: string;
  fieldValue: string;
};

const FieldPassword = ({
  fieldChangeValue,
  fieldDisabled,
  fieldError,
  fieldLabel,
  fieldMaxLength,
  fieldMd,
  fieldName,
  fieldPlaceHolder,
  fieldValue,
}: FieldPasswordProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    fieldChangeValue(fieldName, value);
  };

  return (
    <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
      <Form.Label>{fieldLabel}</Form.Label>
      <Form.Control
        className={fieldError && "border-danger"}
        defaultValue={fieldValue}
        disabled={fieldDisabled}
        maxLength={fieldMaxLength}
        onChange={onChange}
        placeholder={fieldPlaceHolder}
        type="password"
        autoComplete="current-password"
        key={fieldName}
      />
      <Form.Text className="text-error">{fieldError}</Form.Text>
    </Form.Group>
  );
};

export default FieldPassword;
