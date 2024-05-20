import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/itemsSlice';
import { useAuth } from '../../hooks';
import axios from 'axios';
import { Button, TextField, Modal, Box } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import routes from '../../routes';

const AddDataFormModal = ({ show, onHide }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 5,
    textAlign: 'center'
  };

  const context = useAuth();
  const dispatch = useDispatch();

  const initState = {
    companySigDate: dayjs().toISOString(),
    companySignatureName: '',
    documentName: '',
    documentStatus: '',
    documentType: '',
    employeeNumber: '',
    employeeSigDate: dayjs().toISOString(),
    employeeSignatureName: ''
  }

  const [formData, setFormData] = useState(initState);

  const addData = async () => {
    try {
      const addResponse = await axios.post(routes.addDataurl(), formData, { headers: { 'x-auth': context.token } });
      dispatch(actions.addItem(addResponse.data.data));
      console.log('addResponse >>',addResponse);
    } catch (e) {
      console.log('error>>', e.response);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleDateChange = (event, name) => {
    const newSelectedDate = dayjs(event);
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newSelectedDate.toISOString()
    }));
  };

  const handleSubmit = (event) => {
    addData()
    event.preventDefault();
    setFormData(initState);
    onHide();
  };

  return (
    <Modal
      open={show}
      onClose={onHide}
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker sx={{width:'75%', marginBottom: '10px'}}
              name="companySigDate"
              label="companySigDate"
              value={dayjs(formData.companySigDate)}
              onChange={(event) => handleDateChange(event, 'companySigDate')}
            />
          </LocalizationProvider>
          <TextField sx={{width:'75%', marginBottom: '10px'}}
            name="companySignatureName"
            label="companySignatureName"
            variant="outlined"
            value={formData.companySignatureName}
            onChange={handleChange}
            required
          />
          <TextField sx={{width:'75%', marginBottom: '10px'}}
            name="documentName"
            label="documentName"
            variant="outlined"
            value={formData.documentName}
            onChange={handleChange}
            required
          />
          <TextField sx={{width:'75%', marginBottom: '10px'}}
            name="documentStatus"
            label="documentStatus"
            variant="outlined"
            value={formData.documentStatus}
            onChange={handleChange}
            required
          />
          <TextField sx={{width:'75%', marginBottom: '10px'}}
            name="documentType"
            label="documentType"
            variant="outlined"
            value={formData.documentType}
            onChange={handleChange}
            required
          />
          <TextField sx={{width:'75%', marginBottom: '10px'}}
            name="employeeNumber"
            label="employeeNumber"
            variant="outlined"
            value={formData.employeeNumber}
            onChange={handleChange}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker sx={{width:'75%', marginBottom: '10px'}}
              name="employeeSigDate"
              label="employeeSigDate"
              value={dayjs(formData.employeeSigDate)}
              onChange={(event) => handleDateChange(event, 'employeeSigDate')}
            />
          </LocalizationProvider>
          <TextField sx={{width:'75%', marginBottom: '10px'}}
            name="employeeSignatureName"
            label="employeeSignatureName"
            variant="outlined"
            value={formData.employeeSignatureName}
            onChange={handleChange}
            required
          />
          <Button sx={{width:'75%'}}
            type="submit"
            variant="contained">
            Add
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default AddDataFormModal;
