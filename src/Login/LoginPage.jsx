import React, { useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import loginbg from '../images/loginbg.jpg';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AAMContext from '../../src/context/AAMContext';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import ApexAutoMoversService from '../service/ApexAutoMoversService';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useSnackbar } from 'notistack';










const LoginPage = props => {
    const service = new ApexAutoMoversService();
    const history = useHistory();
    const context = useContext(AAMContext);
    const { enqueueSnackbar } = useSnackbar();
    const { setLoggedInUser } = context;
    const theme = useTheme();

    const medScreen = useMediaQuery(theme.breakpoints.between('xs', 'md'));

    const [credentials, setCredentials] = useState({
        userName: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleValueChange = e => {
        let obj = { ...credentials, [e.target.name]: e.target.value }
        setCredentials(obj);
    }

    const handleLogin = async () => {
        setLoading(true)
        try {

            let res = await service.fetchLogin({}, credentials);


            if (res.status === 200) {
                setLoggedInUser(res.data)
                let strData = JSON.stringify(res.data)
                sessionStorage.setItem('user', strData)

                enqueueSnackbar(`Welcome ${res.data.userName}`, { variant: 'success' })

                history.push('/create');
            }


        } catch (error) {
            console.error(error)
            enqueueSnackbar(`Sorry Wrong User Name or Password`, { variant: 'error' })

        } finally {
            setLoading(false)
        }
    }

    const styles = {
        container: {
            backgroundImage: `url(${loginbg})`,
            height: '100vh',
            backgroundPosition: '2200% 0%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: "cover",
        },
        cardContainer: {
            height: '40%',
            width: '500px',
            marginLeft: medScreen ? '0%' : '30%',
            zIndex: '2',
            marginTop: '20%'
        },
        title: {
            padding: '3%'
        },
        input: {
            padding: '3%'
        },
        loginBtn: {
            width: '45px',
            color: 'green'
        }
    }



    return (
        <Container maxWidth='xl' style={styles.container}>
            <Grid container justify='center' alignItems='center'>
                <Card style={styles.cardContainer}>

                    <Grid item xs={12} align='center' style={styles.title}>
                        {loading ? <LinearProgress /> : null}
                        <Typography variant='h4' >
                            Login
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} style={styles.input}>
                        <TextField
                            value={credentials.userName}
                            label="User Name"
                            variant="filled"
                            fullWidth
                            name='userName'
                            onChange={(e) => handleValueChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} style={styles.input}>
                        <TextField
                            value={credentials.password}
                            label="Password"
                            variant="filled"
                            fullWidth
                            name='password'
                            onChange={(e) => handleValueChange(e)}

                        />
                    </Grid>
                    <Grid align='center' >
                        <IconButton style={styles.loginBtn} onClick={handleLogin}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Grid>
                </Card>

            </Grid>


        </Container>
    )


}

export default LoginPage