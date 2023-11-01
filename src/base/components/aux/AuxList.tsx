import { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import { SessionContext } from "../../contexts/SessionContext";
import { BaseContext } from "../../contexts/BaseContext";
import FieldFilter from "../filter/FieldFilter";
import FieldFilterValue from "../filter/FieldFilterValue";

import AuxItem from "./AuxItem";

type AuxListProps = {
  table: string;
};

type Cod = string | number;
type FormatField = any;
type Item = any;
type fieldName = string;
type fieldValue = any;

function AuxList({ table }: AuxListProps) {
  const { session } = useContext(SessionContext);
  const {
    list,
    item,
    format,
    getList,
    getItem,
    updateField,
    clearItem,
    createItem,
    updateItem,
    deleteItem,
    itemValidate,
  } = useContext(BaseContext);

  useEffect(() => {
    async function getData(table: string) {
      await getList(table);
    }
    getData(table);
  }, [table]);

  // access

  const access = JSON.parse(session.auth_access)[table];
  const accessDelete = item && !item.opNew && /d/.test(access);
  const accessSubmit =
    item &&
    ((item.opNew && /c/.test(access)) || (!item.opNew && /u/.test(access)));
  const showNew = /c/.test(access);

  const columnFormat =
    (format &&
      format.columns &&
      format.columns.filter((it: FormatField) => it.listPosition !== 0)) ||
    [];

  const primaryFieldName =
    (columnFormat.filter((it: FormatField) => it.primaryKey)[0] || {}).name ||
    "";

  // order

  const [order, setOrder] = useState({ field: primaryFieldName, asc: true });
  const orderHandleField = (field: any) => {
    if (field === order.field) setOrder({ field, asc: !order.asc });
    else setOrder({ field, asc: order.asc });
  };

  // filter

  const [filter, setFilter] = useState({ field: primaryFieldName, value: "" });
  const columnList = columnFormat
    ? columnFormat
        .filter((it: any) => it.listPosition > 0)
        .sort((a: any, b: any) => a.formmPosition - b.formPosition)
        .map((it: any) => ({ value: it.name, text: it.label }))
    : [];

  const filterHandleField = (field: any) =>
    setFilter({ field, value: filter.value });

  const filterHandleValue = (value: any) =>
    setFilter({ field: filter.field, value });
  const filterApply = (item: Item) => {
    if (!item || !filter || !item[filter.field]) return true;
    return item[filter.field]
      .toString()
      .toLowerCase()
      .includes(filter.value.toLowerCase());
  };

  // handlers

  const handleShowModal = async (cod: Cod) => {
    await getItem(table, cod);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleField = (fieldName: fieldName, fieldValue: fieldValue) =>
    updateField(fieldName, fieldValue);

  const handleCloseModal = () => {
    clearItem();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleSubmit = async (item: Item) => {
    const submitItem = { ...item };
    delete submitItem.opNew;
    let ok;
    if (item.opNew) {
      ok = await createItem(table, submitItem);
    } else {
      ok = await updateItem(table, submitItem);
    }
    if (ok) handleCloseModal();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleDelete = () => {
    deleteItem(table, item[primaryFieldName]);
    handleCloseModal();
  };

  const ListCell = ({
    fieldValue,
    fieldFormat,
  }: {
    fieldValue: any;
    fieldFormat: FormatField;
  }) => {
    return fieldFormat.type === "boolean" ? (
      <td key={fieldFormat.listPosition}>{fieldValue ? "Yes" : "No"}</td>
    ) : (
      <td
        key={fieldFormat.name}
        className={fieldFormat.type === "integer" ? "number" : ""}
      >
        {fieldValue}
      </td>
    );
  };

  return (
    <main className="dataList">
      {!list || !format ? (
        <Container>
          <p>Loading</p>
        </Container>
      ) : (
        <Container>
          <h2>{format.listHeader}</h2>
          <Table>
            <thead>
              <tr>
                <td colSpan={columnList.length} align="right">
                  {showNew && (
                    <Button
                      variant="primary"
                      onClick={() => handleShowModal(0)}
                    >
                      New
                    </Button>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={columnList.length}>
                  <div className="table-filter">
                    <div>
                      <span>Filter:</span>
                      <FieldFilter
                        filter={filter}
                        filterHandleField={filterHandleField}
                        filterList={columnList}
                      />
                      <span>contains</span>
                      <FieldFilterValue
                        value={filter.value}
                        onChange={filterHandleValue}
                      />
                    </div>
                    <div>&nbsp;</div>
                  </div>
                </td>
              </tr>
              <tr>
                {columnFormat.map((item: Item, index: number) => (
                  <th key={index}>
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        orderHandleField(item.name);
                      }}
                    >
                      {item.label}
                      {item.name === order.field && (order.asc ? "▲" : "▼")}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(list) &&
                list
                  .filter(filterApply)
                  .sort(
                    (a, b) =>
                      (a[order.field] < b[order.field] ? -1 : 1) *
                      (order.asc ? 1 : -1),
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td
                        key="cod"
                        onClick={(e) => {
                          e.preventDefault();
                          handleShowModal(item[primaryFieldName]);
                        }}
                      >
                        <a href="/#">{item[primaryFieldName]}</a>
                      </td>
                      {columnFormat
                        .filter(
                          (fieldFormat: any) => fieldFormat.formPosition > 1,
                        )
                        .map((fieldFormat: any, ndx: number) => (
                          <ListCell
                            key={ndx}
                            fieldValue={item[fieldFormat.name]}
                            fieldFormat={fieldFormat}
                          />
                        ))}
                    </tr>
                  ))}
            </tbody>
          </Table>

          {item && Object.keys(item).length > 0 && (
            <AuxItem
              accessDelete={accessDelete}
              accessSubmit={accessSubmit}
              fields={format.columns}
              handleField={handleField}
              handleClose={handleCloseModal}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
              header={format.itemHeader}
              item={item}
              itemValidate={itemValidate}
            />
          )}
        </Container>
      )}
    </main>
  );
}

export default AuxList;
