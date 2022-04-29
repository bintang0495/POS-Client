import {
  Button,
  Grid,
  NativeSelect,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAddress,
  getKabupaten,
  getKecamatan,
  getKel,
  getProvinsi,
} from '../../../actions/address';
import { getKode } from '../../../utils';

const Alamat = () => {
  // const province = useSelector((state) => state.provReducers);
  const province = useSelector((state) => state.provReducers);
  const kabupaten = useSelector((state) => state.kabReducers);
  const kecamatan = useSelector((state) => state.kecReducers);
  const kelurahan = useSelector((state) => state.kelReducers);

  const [isDisplay, setIsDisplay] = useState(false);
  const [provinsi, setProvinsi] = useState(null);
  const [kab, setKab] = useState(null);
  const [kec, setKec] = useState(null);
  const [kel, setKel] = useState(null);
  const address = useSelector((state) => state.addressReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddress());
    dispatch(getProvinsi());
  }, [dispatch, isDisplay]);

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
    console.log(data.get('provinsi'));
  };

  return (
    <>
      <Button variant='contained' color='success' onClick={handleClick}>
        {isDisplay ? 'Batal' : address?.length > 0 ? 'Edit' : 'Add'}
      </Button>
      {(isDisplay || address?.length > 0) && (
        <Grid
          container
          spacing={4}
          mt={2}
          component='form'
          onSubmit={handleSubmit}>
          <Grid item xs={2}>
            <Typography variant='body2'>Nama Alamat</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              name='nama_alamat'
              label='Nama Alamat'
              variant='outlined'
              sx={{ width: 300 }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant='body2'>Detail Alamat</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              multiline
              rows={4}
              name='detail_alamat'
              label='Detail Alamat'
              variant='outlined'
              sx={{ width: 300 }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant='body2'>Provinsi</Typography>
          </Grid>
          <Grid item xs={10}>
            <NativeSelect
              defaultValue={0}
              sx={{ width: 300 }}
              name='provinsi'
              onChange={(e) =>
                setProvinsi(getKode(e.target.value, 'provinsi', province).kode)
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
            <Typography variant='body2'>Kabupaten/Kota</Typography>
          </Grid>
          <Grid item xs={10}>
            <NativeSelect
              defaultValue={0}
              sx={{ width: 300 }}
              name='kabupaten'
              onChange={(e) =>
                setKab(getKode(e.target.value, 'kabupaten', kabupaten).kode)
              }>
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
            <Typography variant='body2'>Kecamatan</Typography>
          </Grid>
          <Grid item xs={10}>
            <NativeSelect
              defaultValue={0}
              sx={{ width: 300 }}
              name='kecamatan'
              onChange={(e) =>
                setKec(getKode(e.target.value, 'kecamatan', kecamatan).kode)
              }>
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
            <Typography variant='body2'>Kelurahan</Typography>
          </Grid>
          <Grid item xs={10}>
            <NativeSelect defaultValue={0} sx={{ width: 300 }} name='kelurahan'>
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
          <Grid item xs={10} sx={{ textAlign: 'center' }}>
            <Button
              type='submit'
              variant='contained'
              sx={{ mt: 3, mb: 3, background: '#595548' }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Alamat;
