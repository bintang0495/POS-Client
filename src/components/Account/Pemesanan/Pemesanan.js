import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderItems } from '../../../actions/order';
import { formatThousand } from '../../../utils';

const Pemesanan = () => {
  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'total', headerName: 'Total', width: 130 },
  //   { field: 'status', headerName: 'Status', width: 130 },
  // ];

  const orderItem = useSelector((state) => state.orderReducers);
  // let rows = [];
  // let i = 0;
  // orderItem.data.map((data) => {
  //   rows[i] = {
  //     id: data.order_number,
  //     total: formatThousand(data.delivery_fee),
  //     status: data.status,
  //   };
  //   i++;
  // });

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderItems({ skip: 5 * page - 5, limit: 5 }));
  }, [dispatch, page]);
  return (
    <TableContainer component={Paper} sx={{ marginBottom: '50px' }}>
      <Table sx={{ width: '800px' }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>
              Total
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>
              Status
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>
              Invoice
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItem.data?.map((row) => (
            <TableRow
              key={row._id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}>
              <TableCell component='th' scope='row'>
                #{row.order_number}
              </TableCell>
              <TableCell align='right'>
                {formatThousand(row.delivery_fee)}
              </TableCell>
              <TableCell align='right'>{row.status}</TableCell>
              <TableCell align='right'>
                <Button
                  variant='contained'
                  color='success'
                  component={Link}
                  to={`/invoice/${row._id}`}>
                  {row.status}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={() => page !== 1 && setPage(page - 1)}>{'<'}</Button>
        {page === 1 ? (
          <>
            <Button variant='contained'>{page}</Button>
            {'    . . .    '}
            <Button onClick={() => setPage(Math.floor(orderItem.count / 5))}>
              {Math.floor(orderItem.count / 5)}
            </Button>
          </>
        ) : page !== Math.floor(orderItem.count / 5) ? (
          <>
            <Button onClick={() => setPage(1)}>1</Button>
            <Button variant='contained'>{page}</Button>
            <Button onClick={() => setPage(Math.floor(orderItem.count / 5))}>
              {Math.floor(orderItem.count / 5)}
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setPage(1)}>1</Button>
            {'    . . .    '}
            <Button variant='contained'>
              {Math.floor(orderItem.count / 5)}
            </Button>
          </>
        )}
        <Button
          onClick={() =>
            Math.floor(orderItem.count / 5) !== page && setPage(page + 1)
          }>
          {'>'}
        </Button>
      </div>
    </TableContainer>
    // <div style={{ height: 400, width: '100%' }}>
    //   <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     pageSize={5}
    //     rowsPerPageOptions={[5]}
    //     checkboxSelection
    //   />
    // </div>
  );
};

export default Pemesanan;
