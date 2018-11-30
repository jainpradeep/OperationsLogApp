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
        addRowsEnabled : true,
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
        addRowsEnabled : true,
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
        addRowsEnabled : true,
    }],
    remarks:""
}