import React, { useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import AAMContext from '../context/AAMContext';
import { useHistory } from "react-router-dom";





const Layout = (props) => {

    const drawerWidth = '240px';
    const context = useContext(AAMContext);
    const { userName, logoutUser } = context;
    const history = useHistory();

    const { children } = props;
    const [toggleDrawer, setToggleDrawer] = useState(false);


    const styles = {
        appbar: {
            backgroundColor: 'blue',
            position: 'fixed',
            zIndex: 1201,
        },
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: '2%',
        },
        title: {
            flexGrow: 1,
            marginLeft: '2%'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
        },
        root: {
            background: "radial-gradient(ellipse at center," +
                "#808080" +
                " 0," +
                "#000000" +
                " 100%)",
            height: '100vh'
        }
    }
    console.log(toggleDrawer, 'toggle');

    const handleLogOut = () => {
        history.push('/login')
        logoutUser()

    }

    // route isnt loading the correct component

    const menuLinks = [{
        label: 'Add Broker Fee',
        icon: <PostAddOutlinedIcon />,
        routeTo: () => history.push('/create')
    }, {
        label: 'Pending Payments',
        icon: <ReceiptOutlinedIcon />,
        routeTo: () => history.push('/pending')
    }, {
        label: 'Payments Recieved',
        icon: <AssignmentTurnedInOutlinedIcon />,
        routeTo: () => history.push('/paid')
    }, {
        label: 'Admin',
        icon: <SupervisorAccountOutlinedIcon />,
        routeTo: () => history.push('/admin')
    }]


    return (

        <div style={styles.root}>
            <CssBaseline />
            <AppBar style={styles.appbar}>
                <Toolbar>
                    <Typography variant="h6" style={styles.title}>
                        AAM Brokers Fee Application
                        </Typography>
                    {userName ? <Button onClick={() => handleLogOut()} color="inherit"> Log Out</Button> : null}
                </Toolbar>
            </AppBar>
            <Drawer
                style={styles.drawer}
                variant="permanent"

                classes={{
                    paper: '240',
                }}
            >
                <Toolbar />
                <div style={styles.drawerContainer} >

                    {userName !== '' ?
                        < List >
                            {
                                menuLinks.map((menuLink) => (
                                    <ListItem button key={menuLink.label} onClick={menuLink.routeTo}>
                                        <ListItemIcon>{menuLink.icon}</ListItemIcon>
                                        <ListItemText primary={menuLink.label} />
                                    </ListItem>
                                ))
                            }
                        </List> : <List style={{ 'width': '225px' }}>
                            {['Login'].map((text) => (
                                <ListItem button key={text} >
                                    <ListItemIcon>
                                        <SupervisorAccountOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    }
                </div>

            </Drawer>
            <Container maxWidth='lg' style={styles.content}>
                {children}
            </Container>
        </div >
    )
}

export default Layout;