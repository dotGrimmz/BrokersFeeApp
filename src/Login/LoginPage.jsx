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
        marginLeft: '30%',
        zIndex: '2',
        position: 'fixed',
        top: '30%'
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

const LoginPage = props => {
    const service = new ApexAutoMoversService();
    const history = useHistory();
    const context = useContext(AAMContext);
    const { setUser, getUser } = context;

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
        try {
            setLoading(true)

            let res = await service.fetchLogin(credentials)
            if (res.data.login !== false) {
                setUser(res.data.userName)

                history.push('/pending');
            }


        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }




    return (
        <Container maxWidth='xl' style={styles.container}>
            <Card style={styles.cardContainer}>
                <Grid container justify='center' alignItems='center'>
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
                    <Grid >
                        <IconButton style={styles.loginBtn} onClick={handleLogin}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Grid>
                </Grid>

            </Card>

        </Container>
    )
}

export default LoginPage