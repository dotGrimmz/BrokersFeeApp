import React, { useEffect, useState, useContext } from 'react';
import Slide from '@material-ui/core/Slide';
import AdminPanel from './AdminPanel.jsx';
import AAMContext from '../context/AAMContext';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';


import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Legend,
    Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Animation, EventTracker } from '@devexpress/dx-react-chart';
import ApexAutoMoversService from '../service/ApexAutoMoversService';




const AdminView = props => {
    const service = new ApexAutoMoversService();
    const [yearlyRevenue, setYearlyRevenue] = useState('');
    const [paymentAmountDue, setPaymentAmtDue] = useState('');
    const [rollingThreeMonthRevenue, setRollingThreeMonthRevenue] = useState('')
    const context = useContext(AAMContext);
    const { userName, thisMonth, thisYear, createTableData, clearTableData } = context;
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);


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
                setTableData(createTableData(paidBFAs))


            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }

        fetchFees();
        return clearTableData()

    }, []);
    const getTotalDue = (data) => {
        let arr = []
        data.map((x) => {

            arr.push(parseInt(x.receivable))
        });
        return arr.reduce((total, num) => total + num)

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
        }

    }
    return (

        <Grid container justify='flex-start'>
            <Grid item xs={12} align='center' style={styles.titleContainer}>
                <Typography variant='h2' style={styles.title}>
                    Admin View
        </Typography>
            </Grid>
            {loading ? <LinearProgress /> : null}

            <Grid item xs={6} align='center' >
                <AdminPanel
                    yearlyRevenue={yearlyRevenue}
                    paymentAmtDue={paymentAmountDue}
                    rollingThreeMonthRevenue={rollingThreeMonthRevenue}
                    userName={userName}
                />
            </Grid>
            <Grid item xs={6} align='center' style={styles.chart}>
                <Paper style={styles.paper}>
                    <Chart
                        data={tableData}
                    >
                        <ValueScale name="profit" />
                        <ValueScale name="total" />
                        <ValueAxis scaleName="profit" showGrid={false} showLine showTicks />
                        <ValueAxis scaleName="total" position="right" showGrid={false} showLine showTicks />
                        <ArgumentAxis />


                        <BarSeries
                            name="Monthly Profit"
                            valueField="profit"
                            argumentField="month"
                            scaleName="profit"

                        />
                        <EventTracker />
                        <Tooltip contentComponent={toolTipComponent} />
                        <Animation />
                        <Legend />

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



const sales = {
    2017: [
        { month: 'Jan', profit: 50 },
        { month: 'Feb', profit: 100 },
        { month: 'Mar', profit: 30 },
        { month: 'Apr', profit: 107 },
        { month: 'May', profit: 95 },
        { month: 'Jun', profit: 150 },
        { month: 'Jul', profit: 120 },

    ],
    2018: [
        { month: 'Jan', profit: 100, total: 1000 },
        { month: 'Feb', profit: 200, total: 4300 },
        { month: 'Mar', profit: 50, total: 1200 },
        { month: 'Apr', profit: 127, total: 7150 },
        { month: 'May', profit: 105, total: 4340 },
        { month: 'Jun', profit: 180, total: 7520 },
        { month: 'Jul', profit: 150, total: 5380 },
        { month: 'Aug', profit: 120, total: 2590 },
        { month: 'Sep', profit: 59, total: 2700 },
        { month: 'Oct', profit: 139, total: 2800 },
        { month: 'Nov', profit: 66, total: 3450 },
        { month: 'Dec', profit: 55, total: 3260 },
    ],
    2019: [
        { month: 'Jan', profit: 170, total: 856 },
        { month: 'Feb', profit: 150, total: 3574 },
        { month: 'Mar', profit: 10, total: 1198 },
        { month: 'Apr', profit: 33, total: 6150 },
        { month: 'May', profit: 84, total: 3340 },
        { month: 'Jun', profit: 120, total: 5520 },
        { month: 'Jul', profit: 110, total: 3380 },
        { month: 'Aug', profit: 90, total: 1890 },
        { month: 'Sep', profit: 29, total: 1900 },
        { month: 'Oct', profit: 118, total: 2300 },
        { month: 'Nov', profit: 48, total: 3198 },
        { month: 'Dec', profit: 12, total: 2410 },
    ],
};


export default AdminView;