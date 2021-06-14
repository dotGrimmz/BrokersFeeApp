import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const CredentialModal = props => {
    const { open, setOpen, credentials, handleUpdateCredentials, setCredentials } = props;

    const handleUpdate = () => {
        handleUpdateCredentials(credentials)
        setOpen(false)
        setCredentials({
            userName: '',
            password: ''
        })
    }
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>
                            <b>Are you sure you want to change your credentials</b> ? <br />
                            User Name: {credentials.userName} <br />
                            Password: {credentials.password}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align='right'>
                        <Button color='primary' variant='contained' style={{ 'margin': '2%' }} onClick={handleUpdate}>
                            Yes
                        </Button>
                        <Button color='secondary' variant='contained' onClick={() => setOpen(false)}>
                            No
                </Button>
                    </Grid>
                </Grid>

            </DialogContent>
        </Dialog >
    )
}

export default CredentialModal;