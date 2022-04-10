import React from 'react';
import PropTypes from 'prop-types';
import
{
  Box,
  Collapse ,
  IconButton ,
  Table ,
  TableBody ,
  TableCell ,
  TableContainer,
  TableHead ,
  TableRow ,
  Typography,
  Paper,
  TablePagination,
  TableSortLabel,
  FormControlLabel,
  Switch,
  Toolbar,
  Tooltip,
  Checkbox,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';
import { styled } from '@mui/system';
import _ from 'lodash';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import { Key } from 'paper/dist/paper-core';
import { BoltRounded } from '@mui/icons-material';
import { client as apiClient } from 'utils/api';
import { useQuery } from 'react-query';
import { budgetItems as budgetItemsQueryKey } from 'utils/queryKeys';

function createData(id, majorCategory, subCategory, categoryBreakdowns, lineItems, approvedConceptBudget, anticipatedCost, committedToDate, expendituresToDate) {
  let varianceFromBudget = anticipatedCost - approvedConceptBudget
  let remainingBalance = (approvedConceptBudget - expendituresToDate).toFixed(2)
  return {
    id,
    majorCategory,
    subCategory,
    categoryBreakdowns,
    lineItems,
    approvedConceptBudget,
    anticipatedCost,
    varianceFromBudget ,
    committedToDate,
    expendituresToDate,
    remainingBalance,

    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

// const rows = [
//   createData('Land Purchase', 'Land Cost', 'Line Item Title', 203400, 15700.73, 4.11, 99.99, 929.00),
//   createData('2', 'Land Cost', 'Line Item Title', 200504, 5700.73, 4.12, 929.99, 5700.73),
//   createData('3', 'Land Cost', 'Line Item Title', 289980, 1500.73, 4.13, 919.90, 1500.73),
//   createData('4', 'Land Cost', 'Line Item Title', 202300, 1700.73, 4.14, 699.99, 1700.73),
// ];


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
//   {
//     id: 'Icon-Column',
//     numeric: false,
//     disablePadding: true,
//     label: ''
// },
  {
    id: 'subCategory',
    numeric: false,
    disablePadding: true,
    label: 'Sub Category',
  },
  {
    id: 'categoryBreakdowns',
    numeric: false,
    disablePadding: false,
    label: 'Category Breakdown',
  },
  {
    id: 'lineItems',
    numeric: false,
    disablePadding: false,
    label: 'Line Items',
  },
  {
    id: 'approvedConceptBudget',
    numeric: true,
    disablePadding: false,
    label: 'Approved Budget',
  },
  {
    id: 'anticipatedCost',
    numeric: true,
    disablePadding: false,
    label: 'Anticipated Cost',
  },
  {
    id: 'varianceFromBudget',
    numeric: true,
    disablePadding: false,
    label: 'Variance From Budget',
  },
  {
    id: 'committedToDate',
    numeric: true,
    disablePadding: false,
    label: 'Committed To Date',
  },
  {
    id: 'expendituresToDate',
    numeric: true,
    disablePadding: false,
    label: 'Expenditures To Date',
  },
  {
    id: 'remainingBalance',
    numeric: true,
    disablePadding: false,
    label: 'Remaining Balance',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  console.log(headCells);

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// const EnhancedTableToolbar = (props) => {
//   const { numSelected } = props;

//   return (
    // <Toolbar
    //   sx={{
    //     pl: { sm: 2 },
    //     pr: { xs: 1, sm: 1 },
    //     ...(numSelected > 0 && {
    //       bgcolor: (theme) =>
    //         alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
    //     }),
    //   }}
    // >
    //   {numSelected > 0 ? (
    //     <Typography
    //       sx={{ flex: '1 1 100%' }}
    //       color="inherit"
    //       variant="subtitle1"
    //       component="div"
    //     >
    //       {numSelected} selected
    //     </Typography>
    //   ) : (
    //     <Typography
    //       sx={{ flex: '1 1 100%' }}
    //       variant="h6"
    //       id="tableTitle"
    //       component="div"
    //     >
    //       {props.title}
    //     </Typography>
    //   )}

    //   {numSelected > 0 ? (
    //     <Tooltip title="Delete">
    //       <IconButton>
    //         <DeleteIcon />
    //       </IconButton>
    //     </Tooltip>
    //   ) : (
    //     <Tooltip title="Filter list">
    //       <IconButton>
    //         <FilterListIcon />
    //       </IconButton>
    //     </Tooltip>
    //   )}
    // </Toolbar>
  // );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };



function ProformaTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlecollapse = (event, row) => {
    const [open, setOpen] = React.useState(false);
    setOpen(!open);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;



  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  // page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  let projectId = props.projectId
  let majorCategory = props.majorCategory

  async function getBudgetItems() {
    const resp = await apiClient.get(`/budget_items?project_id=${projectId}`)
    return resp.data
  }

  const budgetItems = useQuery(budgetItemsQueryKey, getBudgetItems)

  function getRows(budgetItems) {
    let items = []
    if (!budgetItems.isLoading) {
      budgetItems.data.map((item) => {
        let data = item.attributes
        items.push(createData(data.id, data.major_category, data.sub_category, data.category_breakdown, data.line_item_name, data.approved_budget, data.anticipated_cost, 44.7, data.expenditures_to_date))
      })
    }
    return items
  }
  let markup = '';
  const rows = getRows(budgetItems)

  if (rows.length && majorCategory === rows[0].majorCategory) {
    markup = (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 700 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    return (
                      <TableRow
                        hover
                        // handlecollapse={handlecollapse}
                        onClick={(event) => handleClick(event, row.name)}
                        aria-checked={isItemSelected}
                        key={`${projectId}-${row.id}`}
                        selected={isItemSelected}
                      >
                        <TableCell align="right">{row.subCategory}</TableCell>
                        <TableCell align="right">{row.categoryBreakdowns}</TableCell>
                        <TableCell align="right">{row.lineItems}</TableCell>
                        <TableCell align="right">{row.approvedConceptBudget}</TableCell>
                        <TableCell align="right">{row.anticipatedCost}</TableCell>
                        <TableCell align="right">{row.varianceFromBudget}</TableCell>
                        <TableCell align="right">{row.committedToDate}</TableCell>
                        <TableCell align="right">{row.expendituresToDate}</TableCell>
                        <TableCell align="right">{row.remainingBalance}</TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    )
  }
  else {
    markup = (<p> No data found! </p>)
  }

  return markup;
}

export default ProformaTable;
