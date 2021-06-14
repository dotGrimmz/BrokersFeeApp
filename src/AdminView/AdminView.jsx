import React, { useEffect, useState, useContext } from 'react';
import AdminPanel from './AdminPanel.jsx';
import AAMContext from '../context/AAMContext';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import UserPanel from '../UserPanel/UserPanel';
import { useSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';

import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Legend,
    Tooltip,
    Title,

} from '@devexpress/dx-react-chart-material-ui';
import { Animation, EventTracker, Stack } from '@devexpress/dx-react-chart';
import ApexAutoMoversService from '../service/ApexAutoMoversService';


const service = new ApexAutoMoversService();


const AdminView = props => {
    const [yearlyRevenue, setYearlyRevenue] = useState('');
    const [paymentAmountDue, setPaymentAmtDue] = useState('');
    const [rollingThreeMonthRevenue, setRollingThreeMonthRevenue] = useState('');
    const [savedUser, setSavedUser] = useState({})
    const [user, setUser] = useState({
        userName: '',
        password: ''
    });
    const [mode, setMode] = useState('password');
    const [userProfiles, setUserProfiles] = useState([]);
    const context = useContext(AAMContext);
    const { thisMonth, thisYear, createTableData, clearTableData, loggedInUser } = context;
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {

        const fetchFees = async () => {
            setLoading(true)
            try {
                let res = await service.getAllBFAs()
                let pendingBFAs = res.data.filter(x => !x.paid);
                let paidBFAs = res.data.filter(x => x.paid)
                setPaymentAmtDue(getTotalDue(pendingBFAs))
                setYearlyRevenue(getYearlyEarnings(paidBFAs))
                setRollingThreeMonthRevenue(getRollingThreeMonthEarnings(paidBFAs))
                setTableData(createTableData(res.data))


            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }

        fetchFees();
        return clearTableData()

    }, []);

    useEffect(() => {
        const fetchUserProfiles = async () => {
            try {
                let res = await service.getAllUserProfiles()
                if (res.status === 200) {
                    let filtered = res.data.filter(x => loggedInUser.userName !== x.userName)
                    setUserProfiles(filtered)
                }
            } catch (err) {
                enqueueSnackbar('Unable to fetch user profiles', { variant: "error" })
                console.error(err)
            }
        }
        fetchUserProfiles()

    }, [])


    const getTotalDue = (data) => {
        let arr = []
        data.map((x) => {

            arr.push(parseInt(x.receivable))
        });
        let newArr = arr.reduce((total, num) => total + num)
        return newArr

    }

    const getYearlyEarnings = data => {
        let arr = []
        data.map(x => {
            if (new Date(x.deliveryDate).getFullYear() === thisYear) {
                arr.push(parseInt(x.receivable))
            }
        });
        return arr.reduce((total, num) => total + num)

    }

    const getRollingThreeMonthEarnings = data => {
        let arr = [];
        data.map(x => {
            if (new Date(x.deliveryDate).getMonth() >= thisMonth - 3) {
                arr.push(parseInt(x.receivable))
            }
        });

        return arr.reduce((total, num) => total + num)

    }

    const handleValueChange = e => {
        let obj = { ...user, [e.target.name]: e.target.value }
        setUser(obj);
    }

    const handleAddNewUser = async () => {
        let clear = { userName: '', password: '' }
        try {
            let res = await service.createNewUser(user)
            if (res.status === 200) {
                enqueueSnackbar('Successfully Created New User', { variant: 'success' });
                setSavedUser(res.data)
            }
        } catch (err) {
            enqueueSnackbar('Unable to Create New User', { variant: 'error' })

            console.error(err)
        } finally {
            setUser(clear);

        }
    };

    const fetchUserProfiles = async () => {
        try {
            let res = await service.getAllUserProfiles()
            if (res.status === 200) {
                let filtered = res.data.filter(x => loggedInUser.userName !== x.userName)
                setUserProfiles(filtered)
            }
        } catch (err) {
            enqueueSnackbar('Unable to fetch user profiles', { variant: "error" })
            console.error(err)
        }
    }

    const handleGeneratePassword = () => {
        let date = new Date().getTime()
        setUser({ password: `apex_${date}` });

    }

    const handleDeleteUser = async (id) => {
        try {
            let res = await service.deleteUserProfile(id);
            if (res.status === 200) {
                enqueueSnackbar('Successfully Deleted User', { variant: 'success' });
                fetchUserProfiles()
            }
        } catch (err) {
            enqueueSnackbar('Unable to Delete User', { variant: 'error' });

            console.error(err)
        } finally {
        }
    }


    const showEmployeePanel = () => {
        setMode('employee');
        fetchUserProfiles()
    };

    const handleUpdateCredentials = async (credentials) => {
        try {
            let res = await service.updateUserProfile(loggedInUser._id, credentials)

            if (res.status === 200) enqueueSnackbar('Successfully Updated Profile', { variant: 'success' });

        } catch (err) {
            console.error(err)
            enqueueSnackbar('Unable to Update Profile', { variant: 'error' });

        }
    }



    const styles = {
        paper: {

            background: "radial-gradient(ellipse at center," +
                "#FFFFFF" +
                " 0," +
                "#808080" +
                " 100%)",
        },
        titleContainer: {
            marginTop: '7%',
        },

        title: {
            paddingBottom: '4%',
            color: 'white'
        },
        userPanel: {
            position: 'relative',
            top: '-100px'
        }

    }

    const legendStyles = () => ({
        root: {
            display: 'flex',
            margin: 'auto',
            flexDirection: 'row',
        },
    });
    const legendRootBase = ({ classes, ...restProps }) => (
        <Legend.Root {...restProps} className={classes.root} />
    );
    const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
    return (

        <Grid container justify='flex-start'>
            <Grid item xs={12} align='center' style={styles.titleContainer}>
                <Typography variant='h2' style={styles.title}>
                    Admin View
        </Typography>
            </Grid>
            {loading ? <LinearProgress /> : null}

            <Grid item xs={6} align='center' >
                <Grid container justify='center' direction='column' spacing={4}>
                    <Grid item>
                        <AdminPanel
                            yearlyRevenue={yearlyRevenue}
                            paymentAmtDue={paymentAmountDue}
                            rollingThreeMonthRevenue={rollingThreeMonthRevenue}
                            userName={loggedInUser.userName}
                            setMode={setMode}
                            showEmployeePanel={showEmployeePanel}
                        />
                    </Grid>
                    <Grid item>
                        <UserPanel
                            handleValueChange={handleValueChange}
                            userName={user.userName}
                            password={user.password}
                            handleAddNewUser={handleAddNewUser}
                            savedUser={savedUser}
                            handleGeneratePassword={handleGeneratePassword}
                            userProfiles={userProfiles}
                            loggedInUser={loggedInUser}
                            mode={mode}
                            handleDeleteUser={handleDeleteUser}
                            handleUpdateCredentials={handleUpdateCredentials}
                        />
                    </Grid>
                </Grid>

            </Grid>

            <Grid item xs={6} align='center' style={styles.chart}>
                <Paper style={styles.paper}>
                    <Chart
                        data={tableData}
                    >
                        <ArgumentAxis />


                        <ValueAxis showGrid={false} showLine showTicks />
                        <BarSeries
                            name="Profit"
                            valueField="profit"
                            argumentField="month"

                        />
                        <BarSeries
                            name="Credit"
                            valueField="credit"
                            argumentField="month"

                        />
                        <EventTracker />
                        <Tooltip contentComponent={toolTipComponent} />
                        <Animation />
                        <Legend position='bottom' rootComponent={Root} />
                        <Title text="Monthly Profits and Credits" />
                        <Stack
                            stacks={[
                                { series: ['profit', 'credit'] },
                            ]}
                        />
                    </Chart>
                </Paper>

            </Grid>

        </Grid>
    )
}

const toolTipComponent = (props) => {
    return (
        <div>
            ${props.text}
        </div>
    )
};



export default AdminView;