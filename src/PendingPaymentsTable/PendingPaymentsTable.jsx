import React, { useEffect, useState, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AAMService from '../service/ApexAutoMoversService';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AAMContext from '../context/AAMContext';
import { useHistory } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';




const PendingPaymentsTable = props => {
    const service = new AAMService();
    const history = useHistory();

    const context = useContext(AAMContext);
    const { setAllBrokerFees } = context;
    const [brokerFees, setBrokerFees] = useState([])
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);



    const emptyRows = rowsPerPage - Math.min(rowsPerPage, brokerFees.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 8));
        setPage(0);
    };

    useEffect(() => {

        const fetchFees = async () => {
            setLoading(true)
            try {
                let res = await service.getAllBFAs()
                let pendingBFAs = res.data.filter(x => x.paid !== true)

                setBrokerFees(pendingBFAs);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }

        fetchFees();

    }, []);


    const styles = {
        root: {
            width: '100%',
            marginLeft: '6%',
            paddingTop: '5%',

        },
        title: {
            padding: '.5%'
        },
        table: {
            width: '100%',
            display: 'block',
            overflow: 'auto',
            height: 'auto',
            maxHeight: '800px'
        }
    }

    const useStyles1 = makeStyles((theme) => ({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }));

    const TablePaginationActions = (props) => {
        const classes = useStyles1();
        const theme = useTheme();
        const { count, page, rowsPerPage, onChangePage } = props;


        const handleFirstPageButtonClick = (event) => {
            onChangePage(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onChangePage(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onChangePage(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        )

    }







    return (
        <Grid container style={styles.root} justify='center'>
            <Grid item xs={12} align='center' style={styles.title}>
                <Typography variant='h2' style={{ 'color': 'white' }}>
                    Pending Payments
                </Typography>
            </Grid>
            <Grid item xs={12} align='left'>

                <TableContainer component={Paper} style={styles.table}>
                    {loading ? <LinearProgress /> : null}

                    <Table aria-label="customized table" stlye={{ 'min-width': '400px' }} stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ 'width': '20%', 'backgroundColor': 'grey' }} align="center"><b>Carrier</b></TableCell>
                                <TableCell style={{ 'width': '10%', 'backgroundColor': 'grey' }} align="center"><b>Order ID</b></TableCell>
                                <TableCell style={{ 'width': '15%', 'backgroundColor': 'grey' }} align="center"><b>Vehicle Info</b></TableCell>
                                <TableCell style={{ 'width': '15%', 'backgroundColor': 'grey' }} align="center"><b>Delivery Date</b></TableCell>
                                <TableCell style={{ 'width': '10%', 'backgroundColor': 'grey' }} align="center"><b>Receivable</b></TableCell>
                                <TableCell style={{ 'width': '30%', 'backgroundColor': 'grey' }} align="center"><b>Notes</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0 ? brokerFees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : brokerFees).map(row => (
                                <TableRow key={row._id} hover onClick={() => history.push(`bfview/${row._id}`)}>
                                    <TableCell component="th" scope="row">
                                        <Grid container >
                                            <Grid item xs={12}>
                                                {row.carrier.name} - {row.buyerNum}
                                            </Grid>
                                            <Divider orientation="vertical" style={{ 'padding': '.5%', 'backgroundColor': 'blue', 'margin': '.3%' }} fullWidth flexItem />

                                            <Grid item>
                                                {row.carrier.contact} {row.carrier.phoneNumber}
                                            </Grid>

                                        </Grid>
                                    </TableCell>
                                    <TableCell align="center">{row.orderId}</TableCell>
                                    <TableCell align="center">{row.vehInfo.vehYear + " " + row.vehInfo.vehMake + " " + row.vehInfo.vehModel}</TableCell>
                                    <TableCell align="center">{new Date(row.deliveryDate).toDateString()}</TableCell>
                                    <TableCell align="center">{row.receivable}</TableCell>
                                    <TableCell align="center">{row.comments}</TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}

                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[8, 16]}
                                    count={brokerFees.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />


                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid >
    )
}

export default PendingPaymentsTable;