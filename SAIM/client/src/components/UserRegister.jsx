// import { Card, CardHeader, CardBody, CardFooter, Text, Heading, Button, Drawer,
//   DrawerBody,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton, RadioGroup, Radio, Stack, useDisclosure,   AlertDialog,
//   AlertDialogBody,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogContent,
//   AlertDialogOverlay,
//   FormControl,
//   FormLabel,
//   FormErrorMessage,
//   FormHelperText,
//   Input, 
//   Box,
//   Image} from '@chakra-ui/react'
import React from 'react'
import "../App.css";
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const UserRegister = () => {
    const {register, handleSubmit, formState: { errors } } = useForm();
    const navigate= useNavigate();
    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const [placement, setPlacement] = React.useState('left')
    const onSubmit = (data) => {
        localStorage.setItem(data.email, JSON.stringify({ 
            screenName: data.screenName, password: data.password 
        }));
        console.log(JSON.parse(localStorage.getItem(data.email)));
            alert(`Thanks for registering: ${data.screenName}`);
            navigate("/login");
    };
    return (
    <>

    </>
    )
}

export default UserRegister