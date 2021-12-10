import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Add, HighlightOff, Save } from '@material-ui/icons';
import axios from 'axios';
import { useManyInputs, useToggle } from 'hooks';
import { toast } from 'react-toastify';
import useStyles from './newMenuStyles';
import { MenusContext } from 'contexts/MenusContext';
import UseToggle from 'hooks/useToggle';
import v4 from 'uuid/dist/v4';
import { useNavigate, useParams } from 'react-router-dom';

const EditMenu = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  const { menus, getMenuById, editMenu, loading } = useContext(MenusContext);
  const initialState = {
    name: '',
    items: [],
  };

  const newItem = {
    name: '',
    price: '',
    description: '',
    image: '',
    type: 'appetizers',
  };

  const [
    state,
    handleTxtChange,
    handleToggleChange,
    changeInput,
    resetState,
    setState,
  ] = useManyInputs(initialState);

  const [isSubmitting, toggleIsSubmitting] = UseToggle(false);

  useEffect(() => {
    if (loading) return;

    let el = getMenuById(id);

    if (!el) {
      toast.error('No Menu found... Redirecting');
      setTimeout(() => {
        navigate('/menus');
      }, 1500);
    }

    setState({ ...el });
  }, [getMenuById, menus, loading, id]);

  const addNewItem = () => {
    setState((st) => ({
      ...st,

      items: [...st.items, { ...newItem, _id: v4() }],
    }));
  };

  const deleteItem = (e) => {
    const { id } = e.currentTarget.dataset;
    setState((st) => ({
      ...st,
      items: st.items.filter((el) => el._id !== id),
    }));
  };

  const handleItemTextChange = (e, _id) => {
    console.log(`e.currentTarget.dataset`, e.currentTarget.dataset);
    setState((st) => ({
      ...st,
      items: st.items.map((el) => {
        return el._id === _id ? { ...el, [e.target.name]: e.target.value } : el;
      }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.items.length) return toast.error('Please select Menu Items');
    toggleIsSubmitting();

    // * Check if any menu item exists without an Image
    const invalidMenuItems = state.items.filter((item) => !item.image);
    if (invalidMenuItems.length > 0)
      return toast.error('Menu Items must have an Image');

    editMenu(id, { ...state }, () => {
      toggleIsSubmitting();
      resetState();
      navigate(`/menus/${id}`);
    });
  };

  const handleImageUpload = async (e, toggleFunc, cb) => {
    toggleFunc?.();
    const selectedFile = e.target.files[0];
    const fileType = ['image/'];
    try {
      if (selectedFile && selectedFile.type.includes(fileType)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
          const file = e.target.result;

          // TODO  Delete Image from cloudinary if it exists on this user

          // // * 1 Upload Image on Cloudinary
          const formData = new FormData();
          formData.append('file', file);
          formData.append(
            'upload_preset',
            process.env.REACT_APP_CLOUDINARY_PRESET
          );

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          const uploadedImage = res.data.url;

          cb(uploadedImage);
          toggleFunc?.();
        };
      } else {
        toast.error('Only Image files are acceptable !');
      }
    } catch (err) {
      toast(
        err?.response?.data?.message || err.message || 'Something Went Wrong'
      );
      console.log(`err`, err);
    }
  };

  return (
    <Container
      style={{
        paddingBlock: '2rem',
        backgroundColor: '#f2f2f2',
        maxWidth: 'unset',
      }}
    >
      <Typography align='center' variant='h5'>
        Update Menu
      </Typography>
      <Box className={classes.FormBox}>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            label='Name'
            fullWidth
            variant='outlined'
            name='name'
            id='name'
            type='text'
            value={state.name}
            onChange={handleTxtChange}
            style={{ marginBottom: '1rem' }}
          />

          <Button
            onClick={addNewItem}
            variant='outlined'
            color='primary'
            size='small'
            startIcon={<Add />}
          >
            New Item
          </Button>

          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            {state.items.map((item) => (
              <Box key={item.id || item._id} className={classes.MenuItem}>
                <Box
                  key={item}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}
                >
                  {/* <img src={item} style={{ width: 100, height: 70 }} /> */}
                  <HighlightOff
                    data-img={item}
                    data-id={item.id || item._id}
                    onClick={deleteItem}
                    color='error'
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                </Box>
                <TextField
                  data-_id={item._id}
                  required
                  label='Name'
                  fullWidth
                  variant='outlined'
                  name='name'
                  type='text'
                  value={item.name}
                  onChange={(e) => handleItemTextChange(e, item._id)}
                  style={{ marginBottom: '1rem' }}
                />
                <TextField
                  data-_id={item._id}
                  required
                  label='Price'
                  fullWidth
                  variant='outlined'
                  name='price'
                  id='price'
                  type='number'
                  inputProps={{ min: 0 }}
                  value={item.price}
                  onChange={(e) => handleItemTextChange(e, item._id)}
                  style={{ marginBottom: '1rem' }}
                />
                <TextField
                  data-_id={item._id}
                  required
                  label='Description'
                  fullWidth
                  variant='outlined'
                  name='description'
                  id='description'
                  type='text'
                  value={item.description}
                  onChange={(e) => handleItemTextChange(e, item._id)}
                  style={{ marginBottom: '1rem' }}
                />
                <FormControl>
                  <InputLabel htmlFor={`${item._id}-type`}>Type</InputLabel>

                  <Select
                    value={item.type}
                    onChange={(e) => handleItemTextChange(e, item._id)}
                    name='type'
                    inputProps={{
                      name: 'type',
                      id: `${item._id}-type`,
                    }}
                  >
                    <MenuItem value='appetizers'>appetizers</MenuItem>
                    <MenuItem value='sandwiches'>sandwiches</MenuItem>
                    <MenuItem value='entrees'>entrees</MenuItem>
                    <MenuItem value='dessert'>dessert</MenuItem>
                    <MenuItem value='platters'>platters</MenuItem>
                  </Select>
                </FormControl>

                <label htmlFor={`${item._id}-image`}>
                  <Box
                    style={{
                      marginBlock: '1rem',
                      display: 'flex',
                      gap: 10,
                    }}
                  >
                    <Add style={{ color: '#808080' }} />
                    <input
                      accept='image/*'
                      style={{ display: 'none' }}
                      id={`${item._id}-image`}
                      multiple
                      type='file'
                      onChange={(e) =>
                        handleImageUpload(e, null, (img) => {
                          setState((st) => ({
                            ...st,
                            items: st.items.map((el) =>
                              el._id === item._id ? { ...el, image: img } : el
                            ),
                          }));
                        })
                      }
                    />
                    <Typography style={{ color: '#808080' }}>Image</Typography>
                  </Box>
                </label>
                {item.image && (
                  <img src={item.image} style={{ width: 100, height: 70 }} />
                )}
              </Box>
            ))}
          </Box>
          <Button
            variant='contained'
            color='secondary'
            style={{ marginTop: '1rem' }}
            type='submit'
            endIcon={<Save />}
            disabled={isSubmitting}
          >
            Upadate
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditMenu;
