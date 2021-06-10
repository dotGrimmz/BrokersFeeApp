import React, { Component } from 'react';
import AAMContext from './AAMContext';



class ContextImplementation extends Component {



    tableData = {}


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

    createTableData = (data) => {
        //iterate though each broker fee
        data.map((x) => {
            // get the month for each paid broker fee
            let month = new Date(x.deliveryDate).getMonth()
            // iterate though the yearly profit array
            for (let i = 0; i <= this.state.convertedMonth.length; i++) {
                //if the month number refrences the month obj
                if (this.state.convertedMonth[i][month]) {
                    //add up the sum o
                    this.state.convertedMonth[i].profit += parseInt(x.receivable)

                    break
                }
            }
        });
        // only render months that have profits
        let tableData = this.state.convertedMonth.filter(x => x.profit !== 0)
        return tableData
    }


    clearTableData = () => {
        this.state.convertedMonth.map(x => x.profit = 0)

    }




    state = {
        userName: '',
        thisYear: new Date().getFullYear(),
        thisMonth: new Date().getMonth(),
        getUser: this.getUser,
        setUser: this.setUser,
        logoutUser: this.logoutUser,
        setAllBrokerFees: this.setAllBrokerFees,
        createTableData: this.createTableData,
        clearTableData: this.clearTableData,
        brokerFees: [],
        yearlyRevenue: [],
        convertedMonth: [
            { 0: 'Jan', profit: 0, month: 'Jan' },
            { 1: 'Feb', profit: 0, month: 'Feb' },
            { 2: 'Mar', profit: 0, month: 'Mar' },
            { 3: 'Apr', profit: 0, month: 'Apr' },
            { 4: 'May', profit: 0, month: 'May' },
            { 5: 'Jun', profit: 0, month: 'Jun' },
            { 6: 'Jul', profit: 0, month: 'Jul' },
            { 7: 'Aug', profit: 0, month: 'Aug' },
            { 8: 'Sep', profit: 0, month: 'Sep' },
            { 9: 'Oct', profit: 0, month: 'Oct' },
            { 10: 'Nov', profit: 0, month: 'Nov' },
            { 11: 'Dec', profit: 0, month: 'Dec' },
        ],
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