import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

import { SessionContext } from '../../contexts/SessionContext';
import { BaseContext } from '../../contexts/BaseContext';
import FieldFilter from '../filter/FieldFilter';
import FieldFilterValue from '../filter/FieldFilterValue';

import AuxItem from './AuxItem';

function AuxList({ table }) {

  const { session } = useContext(SessionContext)
  const {list, item, format, getList, getItem, updateField, clearItem, createItem, updateItem, deleteItem, itemValidate} = useContext(BaseContext);

  useEffect(
    () => {
      async function getData(table) {
        await getList(table);
      };
      getData(table)
    },
    [table]);

  // access

  const access = JSON.parse(session.auth_access)[table];
  const accessDelete = item && !item.opNew && /d/.test(access);
  const accessSubmit = item && ((item.opNew && /c/.test(access)) || (!item.opNew && /u/.test(access)));
  const showNew = /c/.test(access);

  const columnFormat = (format && format.columns && format.columns.filter(it => it.listPosition !== 0)) || [];

  const primaryFieldName = (columnFormat.filter(it => it.primaryKey)[0] || {}).name || '';

  // order

  const [order, setOrder] = useState({field: primaryFieldName, asc: true});
  const orderHandleField = (field) => {
    if (field === order.field) setOrder({ field, asc: !order.asc});
    else setOrder({ field, asc: order.asc});
  }

  // filter

  const [filter, setFilter] = useState({field: primaryFieldName, value: ''});
  const columnList = columnFormat
    ?
    columnFormat
      .filter(it => it.listPosition > 0)
      .sort((a, b) => a.formmPosition - b.formPosition)
      .map(it => ({ value: it.name, text: it.label}))
    :
    [];

  const filterHandleField = (field) => setFilter({ field, value: filter.value})
  const filterHandleValue = (value) => setFilter({ field: filter.field, value})
  const filterApply = (item) => {
    if (!item || !filter || !item[filter.field]) return true;
    return item[filter.field].toString().toLowerCase().includes(filter.value.toLowerCase())
  }

  // handlers

  const handleShowModal = async (cod) => {
    await getItem(table, cod);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  const handleField = (name, value) => updateField({name, value})

  const handleCloseModal = () =>  {
    clearItem();
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  const handleSubmit = async (item) => {

    const submitItem = {...item};
    delete submitItem.opNew;
    let ok;
    if (item.opNew) {
      ok = await createItem(table, submitItem);
    } else {
      ok = await updateItem(table, submitItem);
    }
    if (ok) handleCloseModal();
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  const handleDelete = () => {
    deleteItem(table, item[primaryFieldName])
    handleCloseModal();
  };

  const ListCell = ({ item, format }) => {
    if (format.listPosition < 2) return false;
    return (
      format.type === 'boolean'?
      <td key={format.listPosition}>{item[format.name] ? 'Yes' : 'No'}</td>
      :
      <td
        key={format.name}
        className={format.type === 'integer' ? 'number' : ''}
      >
        {item[format.name]}
      </td>
    )
  };

  return (
    <main className='dataList'>
      {
      (!list || !format) ?
      <Container><p>Loading</p></Container>
      :
      <Container>
        <h2>{format.listHeader}</h2>
        <Table>
          <thead>
            <tr>
              <td colSpan={columnList.length} align='right'>
                {
                  showNew &&
                  <Button variant="primary" onClick={() => handleShowModal(0)}>New</Button>
                }
              </td>
            </tr>
            <tr>
              <td colSpan={columnList.length}>
                <div className='table-filter'>
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
              {
                columnFormat.map((item, index) => <th key={index}>
                    <a href='/' onClick={(e) => { e.preventDefault(); orderHandleField(item.name) }}>
                    {item.label}
                    {(item.name === order.field) && (order.asc ? '▲' : '▼')}
                    </a>
                  </th>)
              }
            </tr>
          </thead>
          <tbody>
          {
            Array.isArray(list) &&
            list
              .filter(filterApply)
              .sort((a, b) => (a[order.field] < b[order.field] ? -1 : 1) * (order.asc ? 1 : -1 ))
              .map((item, index) => (
              <tr key={index}>
                <td
                  key="cod"
                  onClick={(e) => {e.preventDefault(); handleShowModal(item[primaryFieldName])}}
                >
                  <a href='/#'>{item[primaryFieldName]}</a>
                </td>
                {
                columnFormat.map((val, ndx) => <ListCell
                  key={ndx}
                  item={item}
                  format={val}
                />)
                }
              </tr>))
          }
          </tbody>
        </Table>

        {
          item && Object.keys(item).length > 0 &&
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
            primaryFieldName={primaryFieldName}
          />
        }

      </Container>
    }
    </main>
  )
};

export default AuxList;
