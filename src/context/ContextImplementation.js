import React, { useState, useMemo } from 'react';
import AAMContext from './AAMContext';



const ContextImplementation = (props) => {


    const setAllBrokerFees = (data) => {
        let obj = { ...state, brokerFees: data }

        setState(obj)
    }

    const logoutUser = () => {
        let obj = { ...state, loggedInUser: null }

        setState(obj);
    }

    const createTableData = (data) => {
        //iterate though each broker fee

        data.forEach((x) => {
            // get the month for each paid broker fee
            let month = new Date(x.deliveryDate).getMonth()
            // iterate though the yearly profit array
            for (let i = 0; i <= state.convertedMonth.length; i++) {
                //if the month number refrences the month obj
                if (state.convertedMonth[i][month]) {
                    //add up the sum o

                    if (x.paid) state.convertedMonth[i].profit += parseInt(x.receivable)
                    if (x.paid === false) state.convertedMonth[i].credit += parseInt(x.receivable)


                    break
                }
            }
        });
        // only render months that have profits
        let tableData = state.convertedMonth.filter(x => x.profit !== 0)

        return tableData
    }


    const clearTableData = () => {
        state.convertedMonth.forEach(x => { x.profit = 0; x.credit = 0 })

    }

    const setLoggedInUser = (user) => {
        let obj = { ...state, loggedInUser: user }
        setState(obj)
    }





    const [state, setState] = useState({
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
        ],
        convertedMonth: [
            { 0: 'Jan', profit: 0, month: 'Jan', credit: 0 },
            { 1: 'Feb', profit: 0, month: 'Feb', credit: 0 },
            { 2: 'Mar', profit: 0, month: 'Mar', credit: 0 },
            { 3: 'Apr', profit: 0, month: 'Apr', credit: 0 },
            { 4: 'May', profit: 0, month: 'May', credit: 0 },
            { 5: 'Jun', profit: 0, month: 'Jun', credit: 0 },
            { 6: 'Jul', profit: 0, month: 'Jul', credit: 0 },
            { 7: 'Aug', profit: 0, month: 'Aug', credit: 0 },
            { 8: 'Sep', profit: 0, month: 'Sep', credit: 0 },
            { 9: 'Oct', profit: 0, month: 'Oct', credit: 0 },
            { 10: 'Nov', profit: 0, month: 'Nov', credit: 0 },
            { 11: 'Dec', profit: 0, month: 'Dec', credit: 0 },
        ],
        brokerFees: [],
        yearlyRevenue: [],
        loggedInUser: JSON.parse(window.sessionStorage.getItem('user')),
        thisYear: new Date().getFullYear(),
        thisMonth: new Date().getMonth(),
        logoutUser: logoutUser,
        setLoggedInUser: setLoggedInUser,
        setAllBrokerFees: setAllBrokerFees,
        createTableData: createTableData,
        clearTableData: clearTableData,
        tableData: {}


    })

    const { children } = props;
    const cachedState = useMemo(() => (
        state
    ), [state])

    return (
        <AAMContext.Provider value={cachedState}>{children}</AAMContext.Provider>
    )

}

export default ContextImplementation;