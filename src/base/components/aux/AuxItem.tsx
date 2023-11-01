import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import FieldBoolean from "../field/FieldBoolean";
import FieldInteger from "../field/FieldInteger";
import FieldSelect from "../field/FieldSelect";
import FieldSerial from "../field/FieldSerial";
import FieldPassword from "../field/FieldPassword";
import FieldText from "../field/FieldText";

type AuxItemModalProps = {
  accessDelete: boolean;
  accessSubmit: boolean;
  fields: any;
  handleField: (name: string, value: any) => void;
  handleClose: () => void;
  handleDelete: () => void;
  handleSubmit: (item: any) => void;
  header: string;
  item: any;
  itemValidate: () => { [key: string]: string };
};

function AuxItemModal({
  accessDelete,
  accessSubmit,
  fields,
  handleField,
  handleClose,
  handleDelete,
  handleSubmit,
  header,
  item,
  itemValidate,
}: AuxItemModalProps) {
  const errorMessages = itemValidate();
  const hasErrors = Object.keys(errorMessages).length > 0;
  const formatFields: any = fields;
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      {item && (
        <Modal.Dialog>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>{header}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form noValidate>
              <Row className="mb-3">
                {formatFields &&
                  formatFields
                    .filter((it: any) => it.formPosition > 0)
                    .sort((a: any, b: any) => a.formPosition - b.formPosition)
                    .map((el: any, ndx: number) =>
                      el.type === "boolean" ? (
                        <FieldBoolean
                          fieldChangeValue={handleField}
                          fieldDisabled={false}
                          fieldError={(errorMessages as any)[el.name]}
                          fieldLabel={el.label}
                          fieldMd={el.fieldMd}
                          fieldName={el.name}
                          fieldValue={item[el.name]}
                          key={ndx}
                        />
                      ) : el.type === "integer" ? (
                        <FieldInteger
                          fieldAutoComplete=""
                          fieldChangeValue={handleField}
                          fieldDisabled={false}
                          fieldError={(errorMessages as any)[el.name]}
                          fieldLabel={el.label}
                          fieldMaxLength={el.maxLength || 30}
                          fieldMd={el.fieldMd}
                          fieldName={el.name}
                          fieldPlaceHolder=""
                          fieldValue={item[el.name]}
                          key={ndx}
                        />
                      ) : el.type === "password" ? (
                        <FieldPassword
                          fieldChangeValue={handleField}
                          fieldDisabled={false}
                          fieldError={(errorMessages as any)[el.name]}
                          fieldLabel={el.label}
                          fieldMaxLength={30}
                          fieldMd={el.fieldMd}
                          fieldName={el.name}
                          fieldPlaceHolder=""
                          fieldValue={item[el.name]}
                          key={ndx}
                        />
                      ) : el.type === "select" ? (
                        <FieldSelect
                          fieldChangeValue={handleField}
                          fieldDisabled={false}
                          fieldError={(errorMessages as any)[el.name]}
                          fieldLabel={el.label}
                          fieldMd={el.fieldMd}
                          fieldName={el.name}
                          fieldOptions={el.options}
                          fieldValue={item[el.name]}
                          key={ndx}
                        />
                      ) : el.type === "serial" ? (
                        <FieldSerial
                          fieldLabel={el.label}
                          fieldMd={el.fieldMd}
                          fieldName={el.name}
                          fieldValue={item[el.name]}
                          key={ndx}
                        />
                      ) : (
                        <FieldText
                          fieldAutoComplete=""
                          fieldChangeValue={handleField}
                          fieldDisabled={false}
                          fieldError={(errorMessages as any)[el.name]}
                          fieldLabel={el.label}
                          fieldMaxLength={el.maxLength || 30}
                          fieldMd={el.fieldMd}
                          fieldName={el.name}
                          fieldPlaceHolder=""
                          fieldValue={item[el.name]}
                          key={ndx}
                        />
                      ),
                    )}
              </Row>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            {accessDelete && (
              <Button variant="secondary" onClick={handleDelete}>
                Delete
              </Button>
            )}
            {accessSubmit && (
              <Button
                variant="primary"
                disabled={hasErrors}
                onClick={() => handleSubmit(item)}
              >
                Submit
              </Button>
            )}
          </Modal.Footer>
        </Modal.Dialog>
      )}
    </div>
  );
}

export default AuxItemModal;
