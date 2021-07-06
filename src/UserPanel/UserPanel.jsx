import React, { useState, useContext } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UserDialog from './UserDialog';
import AAMContext from '../context/AAMContext';
import CredentialModal from './CredentialModal.jsx';
import Pagination from '@material-ui/lab/Pagination';







const UserPanel = props => {


    const { handleValueChange, userName, password, mode, handleAddNewUser, savedUser,
        handleGeneratePassword, userProfiles, handleDeleteUser, handleUpdateCredentials } = props;
    const [credentialModal, setCredentialModal] = useState(false);

    const context = useContext(AAMContext);
    const { loggedInUser } = context;

    const [credentials, setCredentials] = useState({
        userName: loggedInUser?.userName || '',
        password: ''
    });
    const [pageNum, setPageNum] = useState(0);
    let employeesPerPage = 3;
    let employeeDisplayed = pageNum * employeesPerPage;
    let pageCount = Math.floor(userProfiles.length / employeesPerPage);



    const handleCredentialChange = e => {
        let obj = { ...credentials, [e.target.name]: e.target.value }
        setCredentials(obj);
    }



    const styles = {
        card: {
            width: '500px',
            minHeight: '300px',
            display: 'flex',
            backgroundColor: mode === 'add' ? 'white' : 'lightyellow'
        },
        item: {
            padding: '2%'
        },
        textfield: {
            padding: '2%'
        },
        chip: {
            backgroundColor: 'green'
        },
        detail: {
            padding: '2%'
        },
        profileContainer: {
            border: '2px solid black',
            borderRadius: '5px 5px',
            width: '90%',
            margin: '2%'
        }
    }




    const EmployeeTabs = props => {
        const { handleDeleteUser, id, userName, createdAt } = props;
        const [open, setOpen] = useState(false)

        return (
            < Slide direction='up' unmountOnExit timeout={{ enter: 900 }
            } in={true}  >
                <Grid container alignItems='center' justify='flex-start' style={styles.profileContainer}>
                    <Grid item xs={8} align='left'>
                        <Typography variant='h6'>
                            {userName} <br /> <Typography variant='caption'>Start Date:{new Date(createdAt).toDateString()}</Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <IconButton onClick={() => setOpen(true)}>
                            <DeleteForeverIcon />
                        </IconButton>
                        <UserDialog open={open} profileUserName={userName} setOpen={setOpen} handleDeleteUser={handleDeleteUser} id={id} />
                    </Grid>
                </Grid>
            </Slide >
        )

    }





    return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={{ enter: 900 }}>
            <Card style={styles.card}>
                {mode === 'add' && <Grid container justify='center' spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h5' >
                            Add Employee
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={styles.detail}>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleValueChange}
                            name='userName'
                            value={userName}
                            variant='outlined'
                            label='Set Username'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleValueChange}
                            name='password'
                            value={password}
                            variant='outlined'
                            label='Set Password'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color='secondary' variant='contained' onClick={handleGeneratePassword}>
                            Generate Random Password
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color='primary' variant='contained' onClick={handleAddNewUser}>
                            Create User
                        </Button>

                    </Grid>
                    <Grid item xs={12} style={styles.detail}>
                        <Divider />
                    </Grid>
                    {savedUser?.userName?.length > 0 && <Grid item xs={12}>
                        <Chip
                            style={styles.chip}
                            label={<b>User Name: {savedUser.userName}, Password:{savedUser.password}</b>}
                        />
                    </Grid>}
                </Grid>}
                {mode === 'employee' && <Grid container alignItems='center' >
                    <Grid item xs={12} >
                        <Typography variant='h5' >
                            Employees
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={styles.detail}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} align='row'>
                        {userProfiles.slice(employeeDisplayed, employeeDisplayed + employeesPerPage).map(profiles => (

                            <EmployeeTabs
                                key={profiles._id}
                                id={profiles._id}
                                userName={profiles.userName}
                                createdAt={profiles.createdAt}
                                handleDeleteUser={handleDeleteUser} />
                        ))}

                    </Grid>
                    <Grid container justify='center'>
                        <Pagination
                            data-cy="pagination"
                            variant='outlined'
                            color='primary'
                            onChange={(e, value) => setPageNum(value)}
                            defaultPage={1}
                            page={pageNum}
                            count={pageCount}
                        />
                    </Grid>

                </Grid>}
                {mode === 'password' && <Grid container alignItems='center'>
                    <Grid item xs={12} >
                        <Typography variant='h5' >
                            Credentials
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={styles.detail}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} style={styles.textfield}>
                        <TextField
                            variant='outlined'
                            fullWidth
                            label='User Name'
                            name='userName'
                            onChange={handleCredentialChange}
                            value={credentials.userName}

                        />
                    </Grid>
                    <Grid item xs={12} style={styles.textfield}>
                        <TextField
                            variant='outlined'
                            fullWidth
                            name='password'
                            label='Password'

                            value={credentials.password}
                            onChange={handleCredentialChange}

                        />
                    </Grid>
                    <Grid item xs={12} style={styles.detail}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' color='secondary' onClick={() => setCredentialModal(true)} disabled={credentials.password.length < 4}>
                            Update Credentials
                        </Button>
                    </Grid>
                    <CredentialModal open={credentialModal} setOpen={setCredentialModal} setCredentials={setCredentials} credentials={credentials} handleUpdateCredentials={handleUpdateCredentials} />

                </Grid>}
            </Card>
        </Slide>
    )
}

export default UserPanel;