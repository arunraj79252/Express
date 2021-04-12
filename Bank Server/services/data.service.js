var accountdetails = {
    1000: { accno: 1000, name: "userone", balance: 6000, password: "user1" },
    1001: { accno: 1001, name: "usertwo", balance: 9000, password: "user2" },
    1002: { accno: 1002, name: "usertwo", balance: 5000, password: "user3" }

}
function register(accno, name, password) {
    console.log("register called");
    if (accno in accountdetails) {
        //  alert("User exist.Please log in")
        return {
            status: false,
            statusCode: 422,
            message: "User exist.Please log in"
        }
    }
    else {

        accountdetails[accno] = {
            accno, name, balance: 0, password

        }
        //alert("registration successful");
        //   this.saveDetails();
        return {
            status: true,
            statusCode: 200,
            message: "registration successful"
        }
    }
}
function login(req,uname, pass) {
    let data = accountdetails;
    if (uname in data) {
        if (pass == data[uname].password) {
           req.session.currentUser=data[uname].accno;
            return {
                status: true,
                statusCode: 200,
                message: "log in successful"
            }
        }
        else {
            return {
                status: false,
                statusCode: 422,
                message: "Invalid username or password"
            }
        }

    }
    else {
        return {
            status: false,
            statusCode: 404,
            message: "No user with this account number"
        }
    }
}
function dash(req,accno, amt){
    
    let data = accountdetails;
    if (accno in data) {
        data[accno].balance += Number(amt);
       
      //  this.saveDetails();
        return {
            status: true,
            statusCode: 200,
            message: "Deposited successfully. Available balance:" + data[accno].balance
        }
    }
    else {

        return  {
            status: false,
            statusCode: 404,
            message: "No user with this account number"
        }
    }

}

module.exports = {
    register,
    login,
    dash
}