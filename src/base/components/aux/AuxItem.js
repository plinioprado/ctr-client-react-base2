import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import FieldBoolean from '../field/FieldBoolean';
import FieldInteger from '../field/FieldInteger';
import FieldSelect from '../field/FieldSelect';
import FieldSerial from '../field/FieldSerial';
import FieldPassword from '../field/FieldPassword';
import FieldText from '../field/FieldText';

function AuxItemModal({
    accessDelete,
    accessSubmit,
    item,
    header,
    fields,
    itemValidate,
    primaryFieldName,
    handleField,
    handleFieldChange,
    handleFieldChangeBoolean,
    handleClose,
    handleSubmit,
    handleDelete
  }) {


  const errorMessages = itemValidate();
  const hasErrors = Object.keys(errorMessages).length > 0
  return (
    <div className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      {
      item &&
      <Modal.Dialog>
        <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate>
          <Row className="mb-3">
            {
              fields &&
              fields
                .filter(it => it.formPosition > 0)
                .sort((a, b) => a.formPosition - b.formPosition)
                .map(el => (
                    el.type === 'boolean' ?
                    <FieldBoolean
                      fieldChangeValue={handleField}
                      fieldError={errorMessages[el.name]}
                      fieldLabel={el.label}
                      fieldMd={el.fieldMd}
                      fieldName={el.name}
                      fieldRequired={el.required}
                      fieldValue={item[el.name]}
                    />
                    : el.type === 'integer' ?
                    <FieldInteger
                      fieldChangeValue={handleField}
                      fieldError={errorMessages[el.name]}
                      fieldLabel={el.label}
                      fieldMd={el.fieldMd}
                      fieldName={el.name}
                      fieldRequired={el.required}
                      fieldValue={item[el.name]}
                    />
                    :
                    el.type === 'password' ?
                    <FieldPassword
                      fieldChangeValue={handleField}
                      fieldError={errorMessages[el.name]}
                      fieldLabel={el.label}
                      fieldMd={el.fieldMd}
                      fieldName={el.name}
                      fieldRequired={el.required}
                      fieldValue={item[el.name]}
                    />
                    :
                    el.type === 'select' ?
                    <FieldSelect
                      fieldChangeValue={handleField}
                      fieldError={errorMessages[el.name]}
                      fieldLabel={el.label}
                      fieldMd={el.fieldMd}
                      fieldName={el.name}
                      fieldOptions={el.options}
                      fieldRequired={el.required}
                      fieldValue={item[el.name]}
                    />
                    : el.type === 'serial' ?
                    <FieldSerial
                      fieldError={errorMessages[el.name]}
                      fieldLabel={el.label}
                      fieldMd={el.fieldMd}
                      fieldName={el.name}
                      fieldValue={item[el.name]}
                    />
                    :
                    <FieldText
                      fieldChangeValue={handleField}
                      fieldError={errorMessages[el.name]}
                      fieldLabel={el.label}
                      fieldMd={el.fieldMd}
                      fieldName={el.name}
                      fieldRequired={el.required}
                      fieldValue={item[el.name]}
                    />
                )
              )
            }
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {
          accessDelete &&
          <Button variant="secondary" onClick={() => handleDelete(item[primaryFieldName])}>Delete</Button>
        }
        {
          accessSubmit &&
          <Button
            variant="primary"
            disabled={hasErrors}
            onClick={() => handleSubmit(item)}
          >
            Submit
          </Button>
        }
      </Modal.Footer>
    </Modal.Dialog>
  }
  </div>)
}

export default AuxItemModal;
