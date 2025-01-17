import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ErrorMessage, SuccesMessage} from '../../actions/messages';
import Loading from '../../actions/loading'
const theme = createTheme();

export default function Register() {
    
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        roles: "customer"
    });
    const [messageError, setMessageError] = useState(null)
    const [messageSucces, setMessageSuccess] = useState(null)
    const { email, username, password} = formData;

    const dispatch = useDispatch();
    
    const userRegister = useSelector((state) => state.userRegister);
    //errors from response(backend); 
    // loading for progress line
    const { loading, error} = userRegister;

  

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(password.length < 8){
            setMessageError('Password must be at least 8 digits long!')
            
            }else {
                dispatch(register(username, email, password, "customer"));
                setMessageSuccess("Registration Successful.")
        }

    };
    const setAlertMessage = () =>{
        if(error){
            return <ErrorMessage>{error}</ErrorMessage>
        }else if (messageError){
            return <ErrorMessage>{messageError}</ErrorMessage>
        }else if (messageSucces){
            return  <SuccesMessage>
            {messageSucces}
            <Link href="/users/login" variant="body2">
                Please click here to Login
            </Link>
        </SuccesMessage>
        }
    }
   

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {loading && <Loading/>}
                    {setAlertMessage()}
                    <Box component="form" onSubmit={(e) => onSubmit(e)} sx={{ mt: 1 }}>
                        <TextField
                            required
                            type="text"
                            id="text"
                            label="User Name"
                            fullWidth
                            name="username"
                            value={username}
                            onChange={(e) => onChange(e)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/users/login" variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>

    );
}