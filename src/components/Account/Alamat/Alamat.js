import {
  Button,
  Grid,
  NativeSelect,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAddress,
  getKabupaten,
  getKecamatan,
  getKel,
  updateAddress,
} from '../../../actions/address';
import { getKode } from '../../../utils';

const Alamat = () => {
  const province = useSelector((state) => state.provReducers);
  const kabupaten = useSelector((state) => state.kabReducers);
  const kecamatan = useSelector((state) => state.kecReducers);
  const kelurahan = useSelector((state) => state.kelReducers);

  const [dataForm, setDataForm] = useState({});
  const [isDisplay, setIsDisplay] = useState(false);
  const [provinsi, setProvinsi] = useState(null);
  const [kab, setKab] = useState(null);
  const [kec, setKec] = useState(null);
  const [errMsg, setErrMsg] = useState('');

  const address = useSelector((state) => state.addressReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (address.length > 0) {
      setProvinsi(getKode(address[0].provinsi, province).kode);
      if (provinsi !== null) {
        dispatch(
          getKabupaten('kabupaten', provinsi, address[0].kabupaten, setKab)
        );
      }
      if (kab !== null) {
        dispatch(getKecamatan('kecamatan', kab, address[0].kecamatan, setKec));
      }
      // setKec(getKode(address[0].kecamatan, kecamatan).kode);
    }
  }, [dispatch, isDisplay, provinsi, kab, kec]);

  useEffect(() => {
    if (provinsi !== null) {
      dispatch(getKabupaten('kabupaten', provinsi));
    }
    if (kab !== null) {
      dispatch(getKecamatan('kecamatan', kab));
    }
    if (kec !== null) {
      dispatch(getKel('kelurahan', kec));
    }
  }, [dispatch, provinsi, kab, kec]);

  const handleClick = () => {
    setIsDisplay(!isDisplay);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('name') === '') {
      setErrMsg('Field [Nama Alamat] dan field lainnya tidak boleh kosong');
    } else if (data.get('detail') === '') {
      setErrMsg('Field [Detail Alamat] dan field lainnya tidak boleh kosong');
    } else if (data.get('provinsi') === null) {
      setErrMsg('Field [Provinsi] dan field lainnya tidak boleh kosong');
    } else if (data.get('kabupaten') === null) {
      setErrMsg('Field [Kabupaten] dan field lainnya tidak boleh kosong');
    } else if (data.get('kecamatan') === null) {
      setErrMsg('Field [Kecamatan] dan field lainnya tidak boleh kosong');
    } else if (data.get('kelurahan') === null) {
      setErrMsg('Field [Kelurahan] dan field lainnya tidak boleh kosong');
    }
    if (errMsg === '') {
      setDataForm({
        name: data.get('name'),
        provinsi: data.get('provinsi'),
        kabupaten: data.get('kabupaten'),
        kecamatan: data.get('kecamatan'),
        kelurahan: data.get('kelurahan'),
        detail: data.get('detail'),
      });
      if (address?.length > 0) {
        dispatch(updateAddress(dataForm, data.get('addressId'), setErrMsg));
      } else {
        dispatch(addAddress(dataForm, setErrMsg));
      }
    }
  };

  return (
    <div>
      <Button variant='contained' color='success' onClick={handleClick}>
        {isDisplay ? 'Batal' : address?.length > 0 ? 'Edit' : 'Add'}
      </Button>
      {isDisplay ? (
        <Grid
          container
          spacing={4}
          mt={2}
          component='form'
          onSubmit={handleSubmit}>
          <Grid item xs={2}>
            <Typography variant='body2'>
              Nama Alamat <span style={{ color: 'red' }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              name='name'
              label='Nama Alamat'
              variant='outlined'
              defaultValue={address?.length > 0 ? address[0].name : ''}
              sx={{ width: 300 }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant='body2'>
              Detail Alamat <span style={{ color: 'red' }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              multiline
              rows={4}
              name='detail'
              label='Detail Alamat'
              variant='outlined'
              defaultValue={address?.length > 0 ? address[0].detail : ''}
              sx={{ width: 300 }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant='body2'>
              Provinsi <span style={{ color: 'red' }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <NativeSelect
              defaultValue={address?.length > 0 ? address[0].provinsi : 0}
              sx={{ width: 300 }}
              name='provinsi'
              onChange={(e) =>
                setProvinsi(getKode(e.target.value, province).kode)
              }>
              <option value={0} disabled>
                Pilih Provinsi
              </option>
              {province.map((prov) => (
                <option value={prov.name} key={prov.kode}>
                  {prov.nama}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='body2'>
              Kabupaten/Kota <span style={{ color: 'red' }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <NativeSelect
              defaultValue={address?.length > 0 ? address[0].kabupaten : 0}
              sx={{ width: 300 }}
              name='kabupaten'
              onChange={(e) => setKab(getKode(e.target.value, kabupaten).kode)}>
              <option value={0} disabled>
                Pilih Kabupaten
              </option>
              {kabupaten.map((kab) => (
                <option value={kab.name} key={kab.kode}>
                  {kab.nama}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='body2'>
              Kecamatan <span style={{ color: 'red' }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <NativeSelect
              defaultValue={address?.length > 0 ? address[0].kecamatan : 0}
              sx={{ width: 300 }}
              name='kecamatan'
              onChange={(e) => setKec(getKode(e.target.value, kecamatan).kode)}>
              <option value={0} disabled>
                Pilih Kecamatan
              </option>
              {kecamatan.map((kec) => (
                <option value={kec.name} key={kec.kode}>
                  {kec.nama}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='body2'>
              Kelurahan <span style={{ color: 'red' }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <NativeSelect
              defaultValue={address?.length > 0 ? address[0].kelurahan : 0}
              sx={{ width: 300 }}
              name='kelurahan'>
              <option value={0} disabled>
                Pilih Kelurahan
              </option>
              {kelurahan.map((kel) => (
                <option value={kel.name} key={kel.kode}>
                  {kel.nama}
                </option>
              ))}
            </NativeSelect>
          </Grid>
          {address?.length > 0 && (
            <input
              type='hidden'
              id='addressId'
              name='addressId'
              value={address[0]._id}
            />
          )}
          {isDisplay && (
            <Grid item xs={6} sx={{ textAlign: 'center' }}>
              <Button
                type='submit'
                variant='contained'
                sx={{ mt: 3, mb: 3, background: '#595548' }}>
                Submit
              </Button>
              <Typography variant='body1'>
                <span style={{ color: 'red' }}>{errMsg}</span>
              </Typography>
            </Grid>
          )}
        </Grid>
      ) : (
        address?.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ width: '800px' }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                    Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {address?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>
                      {row.provinsi}, {row.kabupaten},{row.kecamatan},
                      {row.kelurahan},{row.detail}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
    </div>
  );
};

export default Alamat;
