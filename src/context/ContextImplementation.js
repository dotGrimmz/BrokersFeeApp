import React, { Component } from 'react';
import AAMContext from './AAMContext';



class ContextImplementation extends Component {




    getLoggedInUser() {
        return this.state.loggedIn
    }

    setUser = (userName) => {
        this.setState({ 'userName': userName })
    }

    getUser = () => {
        return this.state.userName
    }

    setAllBrokerFees = (data) => {
        this.setState({ brokerFees: data })
    }

    logoutUser = () => {
        this.setState({ 'userName': '' });
    }




    state = {
        userName: 'Grimmz',
        getUser: this.getUser,
        setUser: this.setUser,
        logoutUser: this.logoutUser,
        setAllBrokerFees: this.setAllBrokerFees,
        brokerFees: [],
        years: [
            "1990",
            "1991",
            "1992",
            "1993",
            "1994",
            "1995",
            "1996",
            "1997",
            "1998",
            "1999",
            "2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
        ]

    }



    render() {
        const { children } = this.props;
        console.log(this.state, 'state obj')

        return (
            <AAMContext.Provider value={this.state}>{children}</AAMContext.Provider>
        )
    }
}

export default ContextImplementation;