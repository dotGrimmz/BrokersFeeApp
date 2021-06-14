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
import MenuItem from '@material-ui/core/MenuItem';
import CarrierDropdown from '../CreateBrokerFee/CarrierDropdown';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSnackbar } from 'notistack';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CarrierModal from '../CarrierModal/CarrierModal';

const service = new ApexAutoMoversService();



const BrokerFeeView = (props) => {
    const { match } = props;
    const { enqueueSnackbar } = useSnackbar();

    const context = useContext(AAMContext);
    const { userName, years } = context;
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [dateChanged, setDateChanged] = useState(false)
    const [vehYear, setVehYear] = useState("");
    const [vehMake, setVehMake] = useState("");
    const [vehModel, setVehModel] = useState("");
    const [vehicleModels, setVehicleModels] = useState([]);
    const [vehicleMakes, setVehicleMakes] = useState([]);
    const [newCarrier, toggleNewCarrier] = useState(false);
    const [newVehicle, toggleNewVehicle] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
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
        paid: false,
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
        const findBrokerFee = async (selectedId) => {
            try {
                let res = await service.fetchBrokerFee(selectedId);
                setBrokerObj(res.data);
                setSelectedDate(res.data.deliveryDate)
            } catch (err) {
                console.error(err)
            }
        }

        findBrokerFee(match.params.id)

    }, [match.params.id]);


    useEffect(() => {
        const fetchCarriers = async () => {
            try {
                let res = await service.getCarriers();
                if (res.status === 200) setCarrierList(res.data);
            } catch (err) {
                console.error('could not fetch carriers');
            }

        }
        fetchCarriers()
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



    const handleCarrierListValueChange = (e, element) => {
        setSelectedCarrierId(e.target.value)
        let selectedCarrierInfo = element.props.children.props
        setBrokerObj({ ...brokerObj, "carrier": selectedCarrierInfo })
    }
    const handleValueChange = e => {
        let obj = { ...brokerObj, [e.target.name]: e.target.value }
        setBrokerObj(obj)
    }

    const handleDateChange = (date) => {
        setDateChanged(true);
        setSelectedDate(date)
    };

    const handlePaid = () => {
        setBrokerObj({ ...brokerObj, "paid": !brokerObj.paid });

    }
    const fetchCarriers = async () => {
        try {
            let res = await service.getCarriers();
            if (res.status === 200) setCarrierList(res.data);
        } catch (err) {
            console.error('could not fetch carriers');
        }

    }

    const findBrokerFee = async (selectedId) => {
        try {
            let res = await service.fetchBrokerFee(selectedId);
            setBrokerObj(res.data);
            setSelectedDate(res.data.deliveryDate)
        } catch (err) {
            console.error(err)
        }
    }


    const addCarrier = async () => {

        try {
            let res = await service.createCarrier(carrierObj)
            if (res.status === 200) {
                enqueueSnackbar('Successfully Added Carrier', { variant: 'success' })
                fetchCarriers()
                setOpen(false)
            }

        } catch (err) {
            console.error(err);
            enqueueSnackbar('Failed to Add Carrier', { variant: 'error' })

        }
    }
    const handleUpdate = async () => {
        let id = match.params.id;
        let updatedVehInfo = {
            vehYear, vehMake, vehModel
        }
        let updatedBrokerFee = {
            ...brokerObj, 'userName': userName,
        }

        if (vehModel !== "") updatedBrokerFee = { ...brokerObj, 'userName': userName, "vehInfo": updatedVehInfo }
        if (dateChanged) updatedBrokerFee = { ...brokerObj, 'deliveryDate': selectedDate }

        setLoading(true)
        try {
            let res = await service.updateBFA(id, updatedBrokerFee);
            if (res.status === 200) {
                setBrokerObj(res.data)
                enqueueSnackbar('Successfully Updated Broker Fee', { variant: 'success' })
                findBrokerFee(match.params.id)

            }
        } catch (err) {
            console.error(err);
            enqueueSnackbar('Unable to Update Broker Fee', { variant: 'error' })

        } finally {
            setLoading(false)
        }
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDeleteCarrier = async (id) => {
        try {
            await service.deleteCarrier(id)
            enqueueSnackbar('Successfully Deleted Broker', { variant: 'success' });
            fetchCarriers()

        } catch (err) {
            console.error(err);
            enqueueSnackbar('Failed to  Deleted Broker', { variant: 'error' });

        }
    }

    const styles = {
        card: {
            width: '100%',
            minHeight: '500px',
            marginTop: '5%',
            marginLeft: '10%'
        },
        title: {
            marginTop: '7%'
        },
        input: {
            padding: '4%',
            width: '400px'
        },
        divider: {
            width: '80%'
        },
        updateBtn: {
            margin: '2%'
        },
        formControl: {
            margin: "2%",
            minWidth: 120,
        }
    }


    return (
        <Grid container justify='center' >
            <Grid item xs={12} align='center' style={styles.title}>
                <Typography variant='h2' style={{ 'color': 'white' }}>
                    Modify Broker Fee
        </Typography>
            </Grid>
            <Grid item xs={12} align='center' >
                <Card style={styles.card}>
                    {loading ? <LinearProgress /> : null}
                    <FormControl>
                        <Grid container justify='center'>
                            <Grid item xs={4} style={styles.input} >
                                <Grid container direction='column' >
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            label='Order ID'
                                            variant='standard'
                                            name='orderId'
                                            onChange={handleValueChange}
                                            value={brokerObj.orderId}

                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            label='Buyer #'
                                            variant='standard'
                                            name='buyerNum'
                                            onChange={handleValueChange}
                                            value={brokerObj.buyerNum}

                                        />
                                    </Grid>
                                    <Grid item>
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
                            </Grid>

                            <Grid item xs={4} style={styles.input}>
                                {newCarrier ? <TextField
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
                                                id={carrier._id}
                                                handleDeleteCarrier={handleDeleteCarrier}
                                            />
                                        </MenuItem>
                                    ))}
                                </TextField> : <CarrierDropdown
                                        name={brokerObj?.carrier?.name || ''}
                                        address={brokerObj?.carrier?.address || ''}
                                        phoneNumber={brokerObj?.carrier?.phoneNumber || ''}
                                        notes={brokerObj?.carrier?.notes || ''}
                                        contact={brokerObj?.carrier?.contact || ''}
                                    />}

                                <Button style={{ 'margin': '1%' }} variant='contained' color='secondary' onClick={() => toggleNewCarrier(!newCarrier)}>
                                    {newCarrier ? 'Original Carrier' : 'Update Carrier'}
                                </Button>

                            </Grid>
                            <Grid item xs={4} style={styles.input} align='center'>
                                {!newVehicle ? <Grid container direction='column' alignItems='center'>
                                    <Typography>
                                        Vehicle: {`${brokerObj?.vehInfo?.vehYear} ${brokerObj?.vehInfo?.vehMake} ${brokerObj?.vehInfo.vehModel}`}
                                    </Typography>  </Grid> : <Grid container direction='column' alignItems='flex-start'>
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
                                    </Grid>}
                                <Button align='center' style={{ 'margin': '1%' }} variant='contained' color='secondary' onClick={() => toggleNewVehicle(!newVehicle)}>
                                    {newVehicle ? "Original Vehicle" : "Update Vehicle"}
                                </Button>
                            </Grid>

                            <Grid item xs={12} >
                                <Divider style={styles.divider} />
                            </Grid>
                            <Grid item xs={6} style={styles.input} >
                                <KeyboardDatePicker
                                    disableToolbar
                                    autoOk
                                    variant='inline'

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
                            <Grid item xs={8} style={styles.input}>
                                <TextField
                                    fullWidth
                                    multiline
                                    label='Comments'
                                    variant='outlined'
                                    name='comments'
                                    onChange={handleValueChange}
                                    value={brokerObj.comments}
                                    rowsMax={4}
                                />
                            </Grid>
                            <Grid item xs={4} style={styles.input}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={brokerObj.paid}
                                            onChange={handlePaid}
                                            name="paid"
                                            color="primary"
                                        />
                                    }
                                    label="Paid"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant='contained' color='primary' style={{ 'margin': '2%' }} onClick={handleClickOpen}>
                                    Add Carrier
                                    </Button>
                            </Grid>
                            <Grid item xs={10} align='center' style={{ 'paddingRight': '15%' }}>
                                <Button disabled={loading} variant='contained' color='primary' onClick={() => handleUpdate()} style={{ 'margin': '2%' }}>
                                    Update Broker Fee
                            </Button>
                                <CarrierModal open={open} setOpen={setOpen} carrierObj={carrierObj} setCarrierObj={setCarrierObj} addCarrier={addCarrier} handleDeleteCarrier={handleDeleteCarrier} id={carrierObj._id} />
                            </Grid>
                        </Grid>
                    </FormControl>
                </Card>
            </Grid>

        </Grid>
    )
}

export default BrokerFeeView;