import React, { useState, useContext } from 'react';
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
import { Add, CameraAlt, Delete, HighlightOff } from '@material-ui/icons';
import axios from 'axios';
import { useManyInputs, useToggle } from 'hooks';
import { toast } from 'react-toastify';
import useStyles from './newMenuStyles';
import LoadingOverlay from 'react-loading-overlay';
import { MenusContext } from 'contexts/MenusContext';
import UseToggle from 'hooks/useToggle';
import v4 from 'uuid/dist/v4';

const NewMenu = () => {
  const classes = useStyles();
  const { createMenu } = useContext(MenusContext);
  const initialState = {
    name: '',
    items: [
      {
        name: '',
        price: '',
        description: '',
        image: '',
        type: 'appetizers',
        uid: v4(),
      },
    ],
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

  const [isImageUploading, toggleImageUploading] = useToggle(false);
  const [isLogoUploading, toggleLogoUploading] = useToggle(false);
  const [uploadingText, setUploadingText] = useState('Uploading Image...');
  const [isSubmitting, toggleIsSubmitting] = UseToggle(false);

  const addNewItem = () => {
    setState((st) => ({
      ...st,

      items: [...st.items, { ...newItem, uid: v4() }],
    }));
  };

  const deleteItem = (e) => {
    const { id } = e.currentTarget.dataset;
    setState((st) => ({
      ...st,
      items: st.items.filter((el) => el.uid !== id),
    }));
  };

  const handleItemTextChange = (e, uid) => {
    console.log(`uid`, uid);
    console.log(`e.currentTarget.dataset`, e.currentTarget.dataset);
    setState((st) => ({
      ...st,
      items: st.items.map((el) => {
        console.log(`el.uid === uid`, el.uid === uid);
        return el.uid === uid ? { ...el, [e.target.name]: e.target.value } : el;
      }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.items.length) return toast.error('Please select Menu Items');
    toggleIsSubmitting();

    createMenu({ ...state }, () => {
      toggleIsSubmitting();
      resetState();
    });
  };

  const handleImageUpload = async (e, toggleFunc, cb) => {
    setUploadingText('Uploading Image ...');
    toggleFunc();
    const selectedFile = e.target.files[0];
    const fileType = ['image/'];
    try {
      console.log(`selectedFile.type`, selectedFile.type);
      if (selectedFile && selectedFile.type.includes(fileType)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
          //console.log(`result onLoadEnd`, e.target.result);
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
          console.log(`res`, res);

          setUploadingText('Updating Logo ...');

          cb(uploadedImage);
          toggleFunc();
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
        New Menu
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
              <Box key={item.uid} className={classes.MenuItem}>
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
                    data-id={item.uid}
                    onClick={deleteItem}
                    color='error'
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                </Box>
                <TextField
                  data-uid={item.uid}
                  required
                  label='Name'
                  fullWidth
                  variant='outlined'
                  name='name'
                  type='text'
                  value={item.name}
                  onChange={(e) => handleItemTextChange(e, item.uid)}
                  style={{ marginBottom: '1rem' }}
                />
                <TextField
                  data-uid={item.uid}
                  required
                  label='Price'
                  fullWidth
                  variant='outlined'
                  name='price'
                  id='price'
                  type='number'
                  inputProps={{ min: 0 }}
                  value={item.price}
                  onChange={(e) => handleItemTextChange(e, item.uid)}
                  style={{ marginBottom: '1rem' }}
                />
                <TextField
                  data-uid={item.uid}
                  required
                  label='Description'
                  fullWidth
                  variant='outlined'
                  name='description'
                  id='description'
                  type='text'
                  value={item.description}
                  onChange={(e) => handleItemTextChange(e, item.uid)}
                  style={{ marginBottom: '1rem' }}
                />
                <FormControl>
                  <InputLabel htmlFor={`${item.uid}-type`}>Type</InputLabel>

                  <Select
                    value={item.type}
                    onChange={(e) => handleItemTextChange(e, item.uid)}
                    name='type'
                    inputProps={{
                      name: 'type',
                      id: `${item.uid}-type`,
                    }}
                  >
                    <MenuItem value='appetizers'>appetizers</MenuItem>
                    <MenuItem value='sandwiches'>sandwiches</MenuItem>
                    <MenuItem value='entrees'>entrees</MenuItem>
                    <MenuItem value='dessert'>dessert</MenuItem>
                    <MenuItem value='platters'>platters</MenuItem>
                  </Select>
                </FormControl>

                <label htmlFor={`${item.uid}-image`}>
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
                      id={`${item.uid}-image`}
                      multiple
                      type='file'
                      onChange={(e) =>
                        handleImageUpload(e, toggleImageUploading, (img) => {
                          console.log(`item.uid`, item.uid);
                          setState((st) => ({
                            ...st,
                            items: st.items.map((el) => {
                              console.log(`item.uid`, item.uid);
                              console.log(`item`, item);
                              console.log(`el`, el);
                              return el.uid === item.uid
                                ? { ...el, image: img }
                                : el;
                            }),
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
            endIcon={<Add />}
            style={{ marginTop: '1rem' }}
            type='submit'
            disabled={isSubmitting}
          >
            Create
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default NewMenu;
