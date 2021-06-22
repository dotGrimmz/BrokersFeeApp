import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import { KeyboardDatePicker } from "@material-ui/pickers";
import Button from '@material-ui/core/Button';
import ApexAutoMoversService from '../service/ApexAutoMoversService';
import AAMContext from '../context/AAMContext';
import { withRouter } from 'react-router';
import LinearProgress from '@material-ui/core/LinearProgress';
import CarrierModal from '../CarrierModal/CarrierModal';
import MenuItem from '@material-ui/core/MenuItem';
import CarrierDropdown from './CarrierDropdown';
import { useHistory } from "react-router-dom";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useSnackbar } from 'notistack';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";




const service = new ApexAutoMoversService();


const CreateBrokerFee = () => {
    const context = useContext(AAMContext);
    const { loggedInUser, years } = context;
    const theme = useTheme();

    const medScreen = useMediaQuery(theme.breakpoints.between('xs', 'md'));

    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openCarrier, setOpenCarrier] = useState(false)
    const [vehYear, setVehYear] = useState("");
    const [vehMake, setVehMake] = useState("");
    const [vehModel, setVehModel] = useState("");
    const [vehicleModels, setVehicleModels] = useState([]);
    const [vehicleMakes, setVehicleMakes] = useState([]);
    const [carrierObj, setCarrierObj] = useState({
        name: '',
        address: '',
        contact: '',
        phoneNumber: '',
    })
    const [brokerObj, setBrokerObj] = useState({
        orderId: '',
        carrier: {
            name: '',
            address: '',
            contact: '',
            phoneNumber: ''
        },
        receivable: '',
        comments: '',
        buyerNum: '',
        lotNum: "",
        vehInfo: {
            vehMake: '',
            vehModel: '',
            vehYear: ''
        }
    });



    const [selectedCarrierId, setSelectedCarrierId] = useState('');
    const [carrierList, setCarrierList] = useState([]);


    useEffect(() => {
        let mounted = true;
        const fetchCarriers = async () => {
            try {
                let res = await service.getCarriers();
                if (res.status === 200 && mounted) setCarrierList(res.data);
            } catch (err) {
                console.error('could not fetch carriers');
            }

        }
        fetchCarriers()
        return () => mounted = false
    }, []);

    useEffect(() => {
        const assignVehicleModels = async () => {
            let models = [];
            try {
                let response = await service.getVehModel(vehYear, vehMake);
                response.data.map((x) => models.push(x.model));
                setVehicleModels(models);
            } catch (err) {
                console.error(err);
            }
        };
        if (vehMake !== "" && vehYear !== "") assignVehicleModels();
    }, [vehMake, vehYear]);

    useEffect(() => {
        const assignVehicleMakes = async () => {
            let makes = [];
            try {
                let response = await service.getVehMake(vehYear);
                response.data.map((x) => {
                    return makes.push(x.make);

                });
                setVehicleMakes(makes);
            } catch (error) {
                console.error(error);
            }
        };
        if (vehYear !== "") assignVehicleMakes();
    }, [vehYear]);

    const handleValueChange = e => {
        let obj = { ...brokerObj, [e.target.name]: e.target.value }
        setBrokerObj(obj)
    }

    const handleCarrierListValueChange = (e, element) => {
        setSelectedCarrierId(e.target.value)
        let selectedCarrierInfo = element.props.children.props
        setBrokerObj({ ...brokerObj, "carrier": selectedCarrierInfo })
    }

    const styles = {
        card: {
            width: '100%',
            height: 'auto',
            marginTop: '2%',
            marginLeft: medScreen ? '0%' : '7%',

        },
        title: {
            marginBottom: '0%',
            paddingTop: medScreen ? '12%' : '5%'
        },
        input: {
            padding: '4%',
            width: '400px'
        },
        divider: {
            width: '80%'
        },
        formControl: {
            margin: "2%",
            minWidth: 120,
        },
        firstSection: {
            backgroundColor: 'lightblue',
            border: '1px solid black',
            boxShadow: '-1px 1px #77aff',
        },
        vehSection: {
            backgroundColor: 'lightblue',
            margin: '2%',
            border: '1px solid black',
            boxShadow: '-1px 1px #77aff',
            height: '200px'
        }
    }


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };



    const handleSubmit = async () => {
        setLoading(true)
        let completedBrokerFee = {
            ...brokerObj, "deliveryDate": selectedDate, 'userName': loggedInUser.userName, 'paid': false,
            paidTo: '', vehInfo: {
                vehYear, vehMake, vehModel
            }
        }
        try {

            await service.postFee({}, completedBrokerFee);
            history.push('/pending');

            enqueueSnackbar("Broker Fee Created!", { variant: 'success' })
        } catch (error) {
            enqueueSnackbar("Failed to Create New Brokers Fee", { variant: 'error' })
            console.error(error)
        } finally {
            setLoading(false)

        }
    }

    const handleClickOpen = () => {
        setOpenCarrier(true);
    };


    const addCarrier = async () => {

        try {
            let res = await service.createCarrier({}, carrierObj)
            if (res.status === 200) {
                enqueueSnackbar('Successfully Added Carrier', { variant: 'success' })
                fetchCarriers()
                setOpenCarrier(false)
            }

        } catch (err) {
            console.error(err);
            enqueueSnackbar('Failed to Add Carrier', { variant: 'error' })

        }
    }

    const handleDeleteCarrier = async (id) => {
        try {
            await service.deleteCarrier({}, id)
            enqueueSnackbar('Successfully Deleted Broker', { variant: 'success' });
            fetchCarriers()

        } catch (err) {
            console.error(err);
            enqueueSnackbar('Failed to  Deleted Broker', { variant: 'error' });

        }
    }

    const fetchCarriers = async () => {
        try {
            let res = await service.getCarriers();
            if (res.status === 200) setCarrierList(res.data);
        } catch (err) {
            console.error('could not fetch carriers');
        }

    }



    return (
        <Grid container justify='center' >
            <Grid item xs={12} align='center' style={styles.title}>

                <Typography variant='h2' style={{ 'color': 'white' }}>
                    Create Broker Fee
            </Typography>
            </Grid>
            <Grid item xs={12} align='center' >

                <Card style={styles.card}>
                    {loading ? <LinearProgress /> : null}
                    <FormControl>
                        <Grid container justify='center'>
                            <Grid item xs={12} md={4} style={styles.input} >
                                <Card style={styles.vehSection} raised>
                                    <Grid container direction='column' >
                                        <Grid item style={{ 'padding': '2%' }}>
                                            <TextField
                                                fullWidth
                                                label='Order ID'
                                                variant='standard'
                                                name='orderId'
                                                onChange={handleValueChange}
                                                value={brokerObj.orderId}

                                            />
                                        </Grid>
                                        <Grid item style={{ 'padding': '2%' }}>
                                            <TextField
                                                fullWidth
                                                label='Buyer #'
                                                variant='standard'
                                                name='buyerNum'
                                                onChange={handleValueChange}
                                                value={brokerObj.buyerNum}

                                            />
                                        </Grid>
                                        <Grid item style={{ 'padding': '2%' }}>
                                            <TextField
                                                fullWidth
                                                label='Lot #'
                                                variant='standard'
                                                name='lotNum'
                                                onChange={handleValueChange}
                                                value={brokerObj.lotNum}

                                            />
                                        </Grid>

                                    </Grid>
                                </Card>

                            </Grid>

                            <Grid item xs={12} md={4} style={styles.input}>
                                <TextField
                                    select
                                    fullWidth
                                    label='Carrier'
                                    variant='standard'
                                    name='carrier'
                                    onChange={handleCarrierListValueChange}
                                    value={selectedCarrierId}

                                >
                                    {carrierList.map(carrier => (
                                        <MenuItem key={carrier._id} value={carrier.name}>

                                            <CarrierDropdown
                                                name={carrier.name}
                                                address={carrier.address}
                                                phoneNumber={carrier.phoneNumber}
                                                notes={carrier.notes}
                                                contact={carrier.contact}
                                            />
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <CarrierModal open={open} setOpen={setOpen} />

                            </Grid>
                            <Grid item xs={12} md={4} style={styles.input}>
                                <Card raised style={styles.vehSection} >
                                    <Grid container direction='column' alignItems='center'>
                                        <Grid item >
                                            <FormControl style={styles.formControl}>
                                                <InputLabel>Year</InputLabel>
                                                <Select
                                                    name='vehYear'
                                                    value={vehYear}
                                                    onChange={(e) => setVehYear(e.target.value)}
                                                >
                                                    {years.map((x, index) => {
                                                        return (
                                                            <MenuItem key={index} value={x}>
                                                                {x}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                </Select>
                                            </FormControl>

                                        </Grid>

                                        <Grid item>
                                            <FormControl
                                                style={styles.formControl}
                                                disabled={vehYear === ""}
                                            >
                                                <InputLabel>Make</InputLabel>
                                                <Select
                                                    value={vehMake}
                                                    name='vehMake'
                                                    onChange={(e) => setVehMake(e.target.value)}
                                                >
                                                    {vehYear !== "" &&
                                                        vehicleMakes.map((x, index) => {
                                                            return (
                                                                <MenuItem key={index} value={x}>
                                                                    {x}
                                                                </MenuItem>
                                                            );
                                                        })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
                                            <FormControl
                                                style={styles.formControl}
                                                disabled={vehMake === ""}
                                            >
                                                <InputLabel>Model</InputLabel>
                                                <Select
                                                    value={vehModel}
                                                    name='vehModel'
                                                    onChange={(e) => setVehModel(e.target.value)}
                                                >
                                                    {vehMake !== "" &&
                                                        vehYear !== "" &&
                                                        vehicleModels.map((x, index) => {
                                                            return (
                                                                <MenuItem key={index} value={x}>
                                                                    {x}
                                                                </MenuItem>
                                                            );
                                                        })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12} >
                                <Divider style={styles.divider} />
                            </Grid>

                            <Grid item xs={6} style={styles.input} >
                                <KeyboardDatePicker
                                    disableToolbar
                                    autoOk
                                    variant='inline'
                                    disablePast
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    label="Delivery Date"
                                    name='deliveryDate'
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} style={styles.input}>
                                <TextField
                                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}

                                    label='Receivable'
                                    variant='standard'
                                    name='receivable'
                                    onChange={handleValueChange}
                                    value={brokerObj.receivable}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider style={styles.divider} />
                            </Grid>
                            <Grid item xs={12} style={styles.input} >
                                <Card raised style={styles.firstSection}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        label='Comments'
                                        variant='outlined'
                                        name='comments'
                                        onChange={handleValueChange}
                                        value={brokerObj.comments}
                                        rowsMax={4}
                                        rows={4}

                                    />
                                </Card>

                            </Grid>

                            <Grid item xs={2}>
                                <Button variant='contained' color='primary' style={{ 'margin': '2%' }} onClick={handleClickOpen}>
                                    Add Carrier
                                    </Button>
                                <CarrierModal open={openCarrier} setOpen={setOpenCarrier} carrierObj={carrierObj} setCarrierObj={setCarrierObj} addCarrier={addCarrier} handleDeleteCarrier={handleDeleteCarrier} id={carrierObj._id} />

                            </Grid>
                            <Grid item xs={10} align='center' style={{ 'paddingRight': '15%' }}>
                                <Button disabled={loading} variant='contained' color='primary' onClick={() => handleSubmit()} style={{ 'margin': '2%' }}>
                                    Add Fee
                            </Button>
                            </Grid>


                        </Grid>
                    </FormControl>
                </Card>
            </Grid>
        </Grid >
    )
}



export default withRouter(CreateBrokerFee);