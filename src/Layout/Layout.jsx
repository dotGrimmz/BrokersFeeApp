import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
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
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";








const Layout = (props) => {

    const drawerWidth = '240px';
    const context = useContext(AAMContext);
    const { loggedInUser, logoutUser, setLoggedInUser } = context;
    const history = useHistory();
    const theme = useTheme();
    const { children } = props;
    const medScreen = useMediaQuery(theme.breakpoints.between('xs', 'md'));
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {

        const getLoggedInUser = () => {
            if (sessionStorage.getItem('user') !== null) {
                let logInData = JSON.parse(sessionStorage.getItem('user'));
                setLoggedInUser(logInData)

            }
        }
        getLoggedInUser()
    }, [setLoggedInUser])


    const styles = {
        appbar: {
            backgroundColor: 'blue',
            position: 'fixed',
            zIndex: 1201,
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

            height: '100%',
            flexGrow: 1,

        },
        menuBtn: {
            display: medScreen ? 'flex' : 'none'

        },
        footer: {
            backgroundColor: "lightblue",
            zIndex: 1300,
            position: 'absolute',
            bottom: 0,
            width: '100%'

        },
        links: {
            padding: '.5%'
        }
    }

    const handleLogOut = () => {
        window.sessionStorage.removeItem('user')

        history.replace('/login');
        logoutUser()

    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }



    const menuLinks = [{
        label: 'Add Broker Fee',
        icon: <PostAddOutlinedIcon />,
        routeTo: () => {
            history.push('/create')
            setMobileOpen(false)
        }
    }, {
        label: 'Pending Payments',
        icon: <ReceiptOutlinedIcon />,
        routeTo: () => {
            history.push('/pending')
            setMobileOpen(false)
        }
    }, {
        label: 'Payments Recieved',
        icon: <AssignmentTurnedInOutlinedIcon />,
        routeTo: () => {
            history.push('/paid')
            setMobileOpen(false)
        }
    }, {
        label: 'Admin',
        icon: <SupervisorAccountOutlinedIcon />,
        routeTo: () => {
            history.push('/admin')
            setMobileOpen(false)
        }
    }]

    return (

        <div style={styles.root}>
            <CssBaseline />
            <AppBar style={styles.appbar}>
                <Toolbar>
                    <IconButton edge='start' onClick={() => setMobileOpen(!mobileOpen)}>
                        <MenuIcon style={styles.menuBtn} />

                    </IconButton>
                    <Typography variant="h6" style={styles.title}>
                        AAM Brokers Fee Application
                        </Typography>
                    {loggedInUser !== null ? <Button onClick={() => handleLogOut()} color="inherit"> Log Out</Button> : null}

                </Toolbar>

            </AppBar>

            {!medScreen && <Drawer
                style={styles.drawer}
                variant='permanent'
                classes={{
                    paper: '240',
                }}
            >
                <Toolbar />
                <div style={styles.drawerContainer} >

                    {loggedInUser !== null ?
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
                                <ListItem button key={text} onClick={() => history.push('/login')} >
                                    <ListItemIcon>
                                        <SupervisorAccountOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    }
                </div>

            </Drawer>}


            {medScreen && <Drawer
                style={styles.drawer}
                variant={window.location.href.includes('/login') ? 'temporary' : 'persistent'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                    paper: '240',
                }}
            >
                <Toolbar />
                <div style={styles.drawerContainer} >

                    {loggedInUser !== null ?
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
                                <ListItem button key={text} onClick={() => history.push('/login')} >
                                    <ListItemIcon>
                                        <SupervisorAccountOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    }
                </div>

            </Drawer>}
            <Container maxWidth='lg' style={styles.content}>
                {children}
            </Container>

        </div >
    )
}

export default Layout;