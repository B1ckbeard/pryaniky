import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectors, actions } from '../store/itemsSlice';
import { actions as modalActions } from '../store/modalSlice';
import { useAuth } from '../hooks';
import axios from 'axios';
import SingleItem from './SingleItem';
import {
  Table, TableBody, TableRow, TableCell, TableContainer, TableHead, Button,
  Box, Container, CircularProgress, ThemeProvider, createTheme
} from '@mui/material';
import routes from '../routes';

const DisplayData = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#424242',
      },
    },
  });

  const dispatch = useDispatch();
  const dataList = useSelector(selectors.selectAll);
  const context = useAuth();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(routes.getDataUrl(), { headers: { 'x-auth': context.token } });
      const { data } = response;
      const newData = data.data;
      dispatch(actions.addItems(newData));
      setLoading(false);
    } catch (e) {
      console.log('error>>', e);
    }
  };

  const handleShowAddModal = () => { dispatch(modalActions.openModal({ modalType: 'add' })); };

  useEffect(() => {
    if (context.token) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container maxWidth="xl" sx={{ textAlign: 'center', height: '100%', paddingTop: '70px' }}>
      <Box sx={{ marginBottom: '20px', width: '100%', height: '90%', boxShadow: 5, paddingTop: '10px' }}>
        {loading ? (
          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer sx={{ height: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>companySigDate</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>companySigName</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>docName</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>docStatus</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>docType</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>employeeNumber</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>employeeSigDate</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>employeeSigName</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(dataList).map((data) => {
                  return (
                    <SingleItem
                      key={data.id}
                      data={data}
                    />
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      {loading ? (
        null
      ) : (
        <ThemeProvider theme={darkTheme}>
          <Button sx={{ width: '150px' }}
            variant="contained"
            color="primary"
            onClick={handleShowAddModal}>
            Add
          </Button>
        </ThemeProvider>
      )}
    </Container>
  )
};

export default DisplayData;
