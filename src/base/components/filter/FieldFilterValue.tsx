import Form from "react-bootstrap/Form";

type FieldFilterValueProps = {
  value: string;
  onChange: (value: string) => void;
};

const FieldFilterValue = ({ value, onChange }: FieldFilterValueProps) => {
  return (
    <Form.Control
      type="text"
      maxLength={30}
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default FieldFilterValue;
