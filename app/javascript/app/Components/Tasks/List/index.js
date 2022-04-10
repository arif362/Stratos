import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import
{
  Table , 
  TableCell ,
  TableContainer, 
  TableHead ,
  TableBody ,
  TableRow, 
  IconButton,
 } from '@mui/material/';
 import Checkbox from '@mui/material/Checkbox';
 import { Circle } from '@mui/icons-material'
 import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
//  import IconButton from '@mui/material/IconButton';

function List({items}) {

  const [selected, setSelected] = React.useState(false);

  const isSelected = (name) => selected.indexOf(name) !== -1


  const headCells = [

    {
      id: 'Select',
      numeric: false,
      disablePadding: false,
      label: 'Select Task',
    },
    {
      id: 'id',
      numeric: true,
      disablePadding: true,
      label: 'Task #',
    },
    {
      id: 'project_id',
      numeric: false,
      disablePadding: false,
      label: 'Project',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Task Name',
    },
    {
      id: 'assigned',
      numeric: false,
      disablePadding: false,
      label: 'Assigned To',
    },
    {
      id: 'information',
      numeric: false,
      disablePadding: false,
      label: 'Information',
    },
    {
      id: 'due_date',
      numeric: false,
      date: true,
      disablePadding: false,
      label: 'Due Date',
    },
    {
      id: 'critical',
      Boolean: true,
      disablePadding: false,
      label: 'Critical Issue',
    },
    {
      id: 'buttons',
      numeric: false,
      disablePadding: false,
      label: '',
    },
  ];

  return(
    <React.Fragment>
      <TableContainer>
      <Table stickyHeader>
      <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id ? 'left' : 'center'}
          >
        {headCell.label}
          </TableCell>
        ))}
        </TableRow>
    </TableHead>
    <TableBody>
      {items.map((task) => (
        <TableRow key={task.id}>
          <TableCell >
            <Checkbox
              icon={<CircleOutlinedIcon />}
              checkedIcon={<Circle />}
              onChange={() => setSelected(!selected)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </TableCell>
          <TableCell>{task.attributes["id"]}</TableCell>
          <TableCell>{task.attributes["project_id"]}</TableCell>
          <TableCell><Link to={`/tasks/${task.id}`} className="underline">{task.attributes["name"]}</Link></TableCell>
          <TableCell>{task.attributes["assigned"]}</TableCell>
          <TableCell>{task.attributes["information"]}</TableCell>
          <TableCell>{moment(task.DueDate).format('MM/DD/YYYY')}</TableCell>
          <TableCell>{task.attributes["critical"] ? 'Yes' : 'No'}</TableCell>
          <TableCell>{task.attributes["buttons"]}</TableCell>
        </TableRow>
      ))}
    </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  )
}

export default List
