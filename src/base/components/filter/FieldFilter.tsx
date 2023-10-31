import React from "react";
import Form from "react-bootstrap/Form";

type Filter = { field: string; value: string };

type FieldFilterProps = {
  filter: Filter;
  filterHandleField: (field: string) => null;
  filterList: Filter[];
};

const FieldFilter = ({
  filter,
  filterHandleField,
  filterList,
}: FieldFilterProps) => {
  return (
    <Form.Control
      as="select"
      value={filter.field}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        filterHandleField(e.target.value)
      }
    >
      {filterList.map((it) => (
        <option key={it.value} value={it.value}>
          {it.value}
        </option>
      ))}
    </Form.Control>
  );
};

export default FieldFilter;
