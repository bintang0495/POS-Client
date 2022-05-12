export const totalItemCart = (items) => {
  return items.reduce((acc, curr) => acc + curr.qty, 0);
};

export const totalHargaCart = (items) => {
  return items.reduce((acc, curr) => acc + curr.product.price * curr.qty, 0);
};

export const formatThousand = (x) => {
  return 'Rp. ' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const getKode = (namaLoc, data) => {
  return data.find((det) => det.nama === namaLoc);
};

export const ongkir = 7000;
