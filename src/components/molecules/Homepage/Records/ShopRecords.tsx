import React, { useMemo } from 'react';
import { useStore } from '../../../../store/useStore';
import { formatMoney } from '../../../../utils/helper';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  TablePagination,
} from '@mui/material';
import { useColors } from '@/hooks';

type RecordType = {
  label: string;
  price: number;
  date: number;
};

export default function ShopRecords() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const colors = useColors();
  const prices = useStore((state) => state.prices);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const selectedShop = useStore((state) => state.selectedShop);

  const priceList = useMemo(() => {
    const tmpList: RecordType[] = [];
    prices
      ?.filter((item) => item.label === selectedProduct)
      .map((item) => {
        item.data.map((subItem) => {
          subItem?.data?.map((subSubItem) => {
            if (subItem.name === selectedShop) {
              tmpList.push({
                label: subItem.name,
                date: subSubItem.date,
                price: subSubItem.price,
              });
            }
          });
        });
      });
    return tmpList.sort((a, b) => b.date - a.date);
  }, [prices, selectedProduct, selectedShop]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        paddingX: '20px',
      }}
    >
      <TableContainer
        sx={{
          flex: 1,
          background: colors.background,
          color: colors.text,
        }}
      >
        <Table
          stickyHeader
          sx={{
            '.MuiTableCell-root': {
              color: colors.text,
              background: colors.background,
            },
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Shop</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priceList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={item.date}>
                  <TableCell component="th" scope="row">
                    {index + 1 + page * rowsPerPage}
                  </TableCell>
                  <TableCell>
                    {' '}
                    {`${new Date(item.date).getHours()}:${new Date(
                      item.date
                    ).getMinutes()} ${new Date(item.date).toDateString()}`}
                  </TableCell>
                  <TableCell>{item.label}</TableCell>
                  <TableCell>
                    {item.price === -1 ? 'No Data' : formatMoney(item.price)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        sx={{
          background: colors.background,
          color: colors.text,
          '.MuiTablePagination-displayedRows': {
            'margin-top': '1em',
            'margin-bottom': '1em',
          },
          '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel':
            {
              'margin-top': '1em',
              'margin-bottom': '1em',
            },
        }}
        count={priceList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, page) => {
          setPage(page);
        }}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Box>
  );
}
