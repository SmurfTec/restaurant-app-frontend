import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';
import { Add, CameraAlt, Delete, HighlightOff } from '@material-ui/icons';
import axios from 'axios';
import { useManyInputs, useToggle } from 'hooks';
import { toast } from 'react-toastify';
import useStyles from './newRestaurantStyles';
import LoadingOverlay from 'react-loading-overlay';
import { RestaurantsContext } from 'contexts/RestaurantsContext';
import UseToggle from 'hooks/useToggle';

const NewRestaurant = () => {
  const classes = useStyles();
  const { createRestaurant } = useContext(RestaurantsContext);
  const initialState = {
    name: '',
    description: '',
    logo: '',
    hours: '',
    images: [],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.logo) return toast.error('Please select Restaurant Logo');
    if (!state.images.length)
      return toast.error('Please select Restaurant Images');
    toggleIsSubmitting();

    createRestaurant({ ...state }, () => {
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

  const filterImage = (e) => {
    const { img } = e.currentTarget.dataset;
    setState((st) => ({
      ...st,
      images: st.images.filter((el) => el !== img),
    }));
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
        New Restaurant
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
          {state.logo && (
            <img
              src={state.logo}
              style={{
                width: 100,
                marginTop: '1rem',
              }}
            />
          )}
          <label htmlFor='logo'>
            <LoadingOverlay
              active={isLogoUploading}
              spinner
              text={uploadingText}
            >
              <Box
                style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  gap: 10,
                }}
              >
                <CameraAlt style={{ color: '#808080' }} />
                <input
                  accept='image/*'
                  style={{ display: 'none' }}
                  id='logo'
                  multiple
                  type='file'
                  onChange={(e) =>
                    handleImageUpload(e, toggleLogoUploading, (img) => {
                      setState((st) => ({
                        ...st,
                        logo: img,
                      }));
                    })
                  }
                />
                <Typography style={{ color: '#808080' }}>Logo</Typography>
              </Box>
            </LoadingOverlay>
          </label>
          <TextField
            required
            label='Description'
            fullWidth
            variant='outlined'
            name='description'
            id='description'
            type='text'
            value={state.description}
            onChange={handleTxtChange}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            required
            label='Hours'
            fullWidth
            variant='outlined'
            name='hours'
            id='hours'
            type='text'
            value={state.hours}
            onChange={handleTxtChange}
            style={{ marginBottom: '1rem' }}
          />

          <LoadingOverlay
            active={isImageUploading}
            spinner
            text={uploadingText}
          >
            <label htmlFor='image'>
              <Box
                style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  gap: 10,
                }}
              >
                <Add style={{ color: '#808080' }} />
                <input
                  accept='image/*'
                  style={{ display: 'none' }}
                  id='image'
                  multiple
                  type='file'
                  onChange={(e) =>
                    handleImageUpload(e, toggleImageUploading, (img) => {
                      setState((st) => ({
                        ...st,
                        images: [...st.images, img],
                      }));
                    })
                  }
                />
                <Typography style={{ color: '#808080' }}>Image</Typography>
              </Box>
            </label>
          </LoadingOverlay>

          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            {state.images.map((el) => (
              <Box
                key={el}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <img src={el} style={{ width: 100, height: 70 }} />
                <HighlightOff
                  data-img={el}
                  onClick={filterImage}
                  color='error'
                  style={{
                    cursor: 'pointer',
                  }}
                />
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

export default NewRestaurant;
