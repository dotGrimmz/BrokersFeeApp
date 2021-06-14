import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import AAMContext from '../context/AAMContext';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const AdminPanel = props => {
    const { yearlyRevenue, paymentAmtDue, rollingThreeMonthRevenue, userName, setMode, showEmployeePanel } = props;


    const styles = {
        card: {
            width: '500px',
            height: '300px'
        },
        detail: {
            padding: '2%'
        },
        paymentAmtDue: {
            color: paymentAmtDue === 0 ? 'green' : 'darkred'
        },
        yearlyRev: {
            color: 'green'
        }
    };
    return (

        <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={{ enter: 900 }}>
            <Card style={styles.card}>
                <Grid container >
                    <Grid item xs={12}>
                        <Typography variant='h5'>
                            Welcome {userName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider fullWidth />
                    </Grid>
                    <Grid item xs={6} style={styles.detail}>
                        <Typography variant='caption'>
                            Total Payments still due:
                        </Typography>
                    </Grid>
                    <Grid xs={6} style={styles.detail}>

                        <Typography style={styles.paymentAmtDue}> <b>${paymentAmtDue}</b> </Typography>
                    </Grid>
                    <Grid item xs={6} style={styles.detail}>
                        <Typography variant='caption'>
                            Rolling Three Month Revenue:
                        </Typography>
                    </Grid>
                    <Grid xs={6} style={styles.detail}>
                        <Typography style={styles.yearlyRev}> <b>${rollingThreeMonthRevenue}</b></Typography>
                    </Grid>
                    <Grid item xs={6} style={styles.detail}>
                        <Typography variant='caption'>
                            Yearly Revenue:
                        </Typography>
                    </Grid>
                    <Grid xs={6} style={styles.detail}>
                        <Typography style={styles.yearlyRev}> <b>${yearlyRevenue}</b></Typography>
                    </Grid>

                </Grid>
                <Grid item xs={12} style={styles.detail}>
                    <Divider fullWidth />
                </Grid>
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Button color='primary' variant='contained' onClick={() => setMode('add')} >
                            Add User
                        </Button>
                    </Grid >
                    <Grid item xs={6}>
                        <Button color='primary' variant='contained' onClick={() => showEmployeePanel()}>
                            Employees
                        </Button>
                    </Grid >
                    <Grid item xs={12}>
                        <Button color='primary' variant='contained' onClick={() => setMode('password')}>
                            Change Profile Credentials
                        </Button>
                    </Grid >

                </Grid>

            </Card>

        </Slide>

    )
}

export default AdminPanel;