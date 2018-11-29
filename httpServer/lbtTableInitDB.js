exports.lbtTableInitDB =  {
    date : new Date(),
    lbtNo : "",
    data :  [
        {
        name : "Opening Stock",
        details : [{
            product:"",
            seq_no:"",
            qty:"",
            editHistory: null,
            editedDate: "",        
            oficer: ""
        }],
        addRowsEnabled : false,
    },
    {
        name: "Delivery",
        details : [{
            product:"",
            seq_no:"",
            qty:"",
            editHistory: null,
            editedDate: "",        
            oficer: ""
        }],
        addRowsEnabled : false,
    },{
        name : "Pumping",
        details : [{
            product:"",
            seq_no:"",
            qty:"",
            editHistory: null,
            editedDate: "",        
            oficer: ""
        }],
        addRowsEnabled : false,
    },{
        name : "Closing Stock",
        details : [{
            product:"",
            seq_no:"",
            qty:"",
            editHistory: null,
            editedDate: "",        
            oficer: ""
        }],
        addRowsEnabled : false,
    }],
    remarks:""
}