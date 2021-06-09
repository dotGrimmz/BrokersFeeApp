import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@material-ui/core';




const CarrierDropdown = props => {
    const { name, address, contact, phoneNumber, notes, handleDeleteCarrier, id } = props;

    const handleAvatarInitials = (str) => {
        let first = str.charAt(0).toUpperCase()
        let secondIndex = str.indexOf(' ');
        let second = str.charAt(secondIndex + 1).toUpperCase();
        return first + second
    }
    // console.log(name, 'name in the dropdown')
    const styles = {
        card: {
            width: '400px'
        },

    }


    return (
        <Grid container justify='flex-start' style={styles.card}>
            <Grid item xs={2}>
                <Avatar
                    rounded='true'
                    raised="true"
                    overlaysontainerstyle={{ "backgroundColor": "black" }}
                    activeopacity={0.7}
                >
                    {handleAvatarInitials(name)}
                </Avatar>
            </Grid>
            <Grid item xs={8} align='left'>
                <Typography>
                    {name}
                </Typography>
            </Grid>
            {id ? <Grid item xs={2} align='right'>
                <IconButton onClick={() => handleDeleteCarrier(id)}>
                    <DeleteForeverIcon />
                </IconButton>
            </Grid> : null}
            <Grid item xs={4} align='left'>
                <Typography variant='caption'>
                    Contact:
                    </Typography>
            </Grid>
            <Grid item xs={8} align='left'>
                <Typography variant='subtitle2'>
                    {contact}
                </Typography>
            </Grid>
            <Grid item xs={4} align='left'>
                <Typography variant='caption'>
                    Phone Number:
                    </Typography>
            </Grid>
            <Grid item xs={8} align='left'>
                <Typography variant='subtitle2'>
                    {phoneNumber}
                </Typography>
            </Grid>
            <Grid item xs={4} align='left'>
                <Typography variant='caption'>
                    Address:
                    </Typography>
            </Grid>
            <Grid item xs={8} align='left'>
                <Typography variant='subtitle2'>
                    {address}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default CarrierDropdown;