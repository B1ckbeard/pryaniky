import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks';
import axios from 'axios';
import { actions as modalActions } from '../store/modalSlice';
import { actions } from '../store/itemsSlice';
import { TableRow, TableCell } from '@mui/material';
import { MdDelete, MdEdit } from "react-icons/md";
import routes from '../routes';

const SingleItem = ({data}) => {
  const context = useAuth();
  const dispatch = useDispatch();
  const handleUpdate = () => {dispatch(modalActions.openModal({ modalType: 'update', data }))};

  const deleteItem = async () => {
    const correctUrl = `${routes.deleteUrl()}/${data.id}`;
    console.log('deletedData>>', data);
    try {
      const deleteResponse = await axios.post(correctUrl, data, { headers: { 'x-auth': context.token } });
      dispatch(actions.removeItem(data.id));
      console.log('deleteResponse >>', deleteResponse);
    } catch (e) {
      console.log('error>>', e.response);
    }
  };

  return (
    <TableRow>
      <TableCell>{data.companySigDate}</TableCell>
      <TableCell>{data.companySignatureName}</TableCell>
      <TableCell>{data.documentName}</TableCell>
      <TableCell>{data.documentStatus}</TableCell>
      <TableCell>{data.documentType}</TableCell>
      <TableCell>{data.employeeNumber}</TableCell>
      <TableCell>{data.employeeSigDate}</TableCell>
      <TableCell>{data.employeeSignatureName}</TableCell>
      <TableCell>
        <MdEdit size={'20px'} onClick={handleUpdate}/>
      </TableCell>
      <TableCell>
        <MdDelete size={'20px'} onClick={deleteItem} />
      </TableCell>
    </TableRow>
  )
}

export default SingleItem;
