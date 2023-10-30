import React from "react";
import { Col, Form } from "react-bootstrap";

type FieldEmailProps = {
  fieldAutoComplete: string;
  fieldChangeValue: (fieldName: string, value: string) => void;
  fieldDisabled: boolean;
  fieldError: string;
  fieldLabel: string;
  fieldMd: string;
  fieldName: string;
  fieldValue: string;
};

const FieldEmail = ({
  fieldAutoComplete,
  fieldChangeValue,
  fieldDisabled,
  fieldError,
  fieldLabel,
  fieldMd,
  fieldName,
  fieldValue,
}: FieldEmailProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target !== null ? e.target.value.trim() : "";
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
        maxLength={60}
        onChange={onChange}
        type="text"
        key={fieldName}
      />
      <Form.Text className="text-error">{fieldError}</Form.Text>
    </Form.Group>
  );
};

export default FieldEmail;
