import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

const CarrierModal = props => {
    const { open, setOpen, carrierObj, setCarrierObj, addCarrier } = props;


    const styles = {
        input: {
            padding: '2%',
            width: '400px'
        },
        submitBtn: {
            padding: '2%'
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleValueChange = e => {
        let obj = { ...carrierObj, [e.target.name]: e.target.value }
        setCarrierObj(obj)
    }


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Add Carrier
            </DialogTitle>
            <Grid container>
                <Grid item xs={12} style={styles.input}>
                    <TextField
                        fullWidth
                        label='Company Name'
                        variant='outlined'
                        name='name'
                        onChange={handleValueChange}
                        value={carrierObj?.name}
                    />
                </Grid>
                <Grid item xs={12} style={styles.input}>
                    <TextField
                        fullWidth
                        label='Person of Contact'
                        variant='outlined'
                        name='contact'
                        onChange={handleValueChange}
                        value={carrierObj?.contact}
                    />
                </Grid>
                <Grid item xs={12} style={styles.input}>
                    <TextField
                        fullWidth
                        label='Phone Number'
                        variant='outlined'
                        name='phoneNumber'
                        onChange={handleValueChange}
                        value={carrierObj?.phonenumber}
                    />
                </Grid>
                <Grid item xs={12} style={styles.input}>
                    <TextField
                        fullWidth
                        label='Address'
                        variant='outlined'
                        name='address'
                        onChange={handleValueChange}
                        value={carrierObj?.address}
                    />
                </Grid>
                <Grid item xs={12} style={styles.input}>
                    <TextField
                        fullWidth
                        label='Notes'
                        variant='outlined'
                        name='notes'
                        onChange={handleValueChange}
                        value={carrierObj?.notes}
                    />
                </Grid>

                <Grid item xs={12} align='center' style={styles.submitBtn}>
                    <Button color='secondary' variant='contained' onClick={addCarrier}>
                        Add Carrier
                    </Button>

                </Grid>
            </Grid >
        </Dialog >
    )
}

export default CarrierModal