import React, { useState, useEffect, useContext } from 'react';
import { filter } from 'lodash';

// material
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Card,
  Table,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  Checkbox,
  Box,
} from '@material-ui/core';
// components
import Skeleton from '@material-ui/lab/Skeleton';
import UserListHead from './UserListHead';
//

import { withStyles } from '@material-ui/styles';
import v4 from 'uuid/dist/v4';

const Styles = {
  Dialog: {
    '& .MuiDialog-paper': {
      maxWidth: 'unset',
      width: 800,
    },
  },
};

const AddToRestaurantModal = (props) => {
  const { open, toggleDialog, restaurants, handleAdd } = props;

  const tableHeadings = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'description', label: 'Description', alignRight: false },
    { id: 'hours', label: 'hours', alignRight: false },
  ];

  const [selected, setSelected] = useState();

  useEffect(() => {
    if (!restaurants || restaurants === null) return;
  }, [restaurants]);

  const handleSubmit = (e) => {
    console.log('where');
    handleAdd(selected);
    setSelected(null);
    toggleDialog();
    e.preventDefault();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={toggleDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add Menu To Restaurant</DialogTitle>
        <DialogContent>
          <Card>
            <TableContainer sx={{ minWidth: 800 }}>
              <TableContainer>
                <UserListHead headLabel={tableHeadings} />

                <TableBody>
                  {restaurants
                    ? restaurants.map((row) => {
                        const { _id, name, description, hours, images } = row;

                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role='checkbox'
                            selected={false}
                            aria-checked={false}
                          >
                            <TableCell padding='checkbox'>
                              <Checkbox
                                checked={selected === _id}
                                onChange={() => setSelected(_id)}
                                // disabled={isAlreadyHere(targetId, row.employees)}
                              />
                            </TableCell>
                            <TableCell
                              component='th'
                              scope='row'
                              padding='none'
                            >
                              <Box
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 10,
                                }}
                              >
                                <Avatar alt={name} src={images?.[0]} />
                                <Typography variant='subtitle2' noWrap>
                                  {name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align='left'>{description}</TableCell>
                            <TableCell align='left'>{hours}</TableCell>
                          </TableRow>
                        );
                      })
                    : Array(5)
                        .fill()
                        .map(() => (
                          <TableRow key={v4()}>
                            <TableCell></TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                          </TableRow>
                        ))}
                </TableBody>
              </TableContainer>
            </TableContainer>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Add
          </Button>
          <Button onClick={toggleDialog} variant='contained' color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(Styles)(AddToRestaurantModal);
