export const totalItemCart = (items) => {
  return items.reduce((acc, curr) => acc + curr.qty, 0);
};

export const formatThousand = (x) => {
  return 'Rp. ' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
