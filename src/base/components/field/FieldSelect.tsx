import { Col, Form } from "react-bootstrap";
import { SelectOption } from "../../types/types";

type FieldSelectProps = {
  fieldChangeValue: (fieldName: string, value: string) => void;
  fieldDisabled: boolean;
  fieldError: string;
  fieldLabel: string;
  fieldMd: string;
  fieldName: string;
  fieldOptions: SelectOption[];
  fieldValue: string;
};

const FieldSelect = ({
  fieldChangeValue,
  fieldDisabled,
  fieldError,
  fieldLabel,
  fieldMd,
  fieldName,
  fieldOptions,
  fieldValue,
}: FieldSelectProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    fieldChangeValue(fieldName, e.target.value);

  return (
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
        {fieldOptions &&
          fieldOptions.map((op: SelectOption) => (
            <option key={op.value} value={op.value}>
              {op.text}
            </option>
          ))}
      </Form.Control>
      <Form.Text className="text-error">{fieldError}</Form.Text>
    </Form.Group>
  );
};

export default FieldSelect;
