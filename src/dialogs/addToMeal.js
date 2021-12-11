import React, { useState } from 'react';

// material
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Card,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from '@material-ui/core';
// components
//

import { withStyles } from '@material-ui/styles';

const Styles = {
  Dialog: {
    '& .MuiDialog-paper': {
      maxWidth: 'unset',
      width: 800,
    },
  },
};

const AddToRestaurantModal = (props) => {
  const { open, toggleDialog, handleAdd } = props;

  const [selected, setSelected] = useState();

  const handleSubmit = (e) => {
    console.log('where');
    handleAdd(selected);
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
            <List>
              {['breakfast', 'lunch', 'dinner'].map((el) => (
                <ListItem key={el}>
                  <Checkbox
                    checked={selected === el}
                    onChange={() => setSelected(el)}
                  />
                  <ListItemText>
                    {el[0]}
                    {el.slice(1)}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
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
