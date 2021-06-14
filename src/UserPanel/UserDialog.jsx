import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';


// build up the dialog for edit and delting users 
const UserDialog = props => {
    const { open, onClose, profileUserName, setOpen, handleDeleteUser, id } = props;

    const setDeleteUser = (id) => {
        handleDeleteUser(id);
        setOpen(false);
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        Are you sure you want to delete user <b>{profileUserName}</b> ?

                    </Grid>
                    <Grid item xs={12} align='right'>
                        <Button color='primary' variant='contained' style={{ 'margin': '2%' }} onClick={() => setDeleteUser(id)}>
                            Yes
                        </Button>
                        <Button color='secondary' variant='contained' onClick={() => setOpen(false)}>
                            No
                </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default UserDialog;