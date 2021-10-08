const errorHandler = (error, res) => {
    //   Run if some field missing
    if (error == "Some field is missing") {
        res.send({
            status: 400,
            error: "Missing",
            errorMessage: "Some field are missing",
            fullMessage: error,
        });
    }
    //   Run if jwt error
    else if (error.name == "JsonWebTokenError") {
        res.send({
            status: 401,
            error: "Unauthorized",
            errorMessage: "Invalid signature",
            fullMessage: error,
        });
    }
    // Run if invalid email
    else if (error == "Invalid email") {
        res.send({
            status: 400,
            error: "Email",
            errorMessage: "Please enter valid email",
            fullMessage: error,
        });
    }
    // Run if user does not exist
    else if (error == "User does not exist") {
        res.send({
            status: 401,
            error: "Email",
            errorMessage: error,
            fullMessage: error,
        });
    }
    // Run if password does not match
    else if (error == "Password does not match") {
        res.send({
            status: 401,
            error: "Password",
            errorMessage: error,
            fullMessage: error,
        });
    }
    // Run if user does not exist
    else if (error == "User") {
        res.send({
            status: 401,
            error: "Email",
            errorMessage: "User does not exist",
            fullMessage: error,
        });
    }
    //   Run if don't like rror
    else if (error == "Don't like") {
        res.send({
            status: 200,
            error: "Not Liked",
            errorMessage: "User do not any doc",
            fullMessage: error,
        });
    }
    // Run if user does not exist
    else if (error == "Empty") {
        res.send({
            status: 404,
            error: "Empty",
            errorMessage: "Docs not found",
            fullMessage: error,
        });
    }
    //   Run if jwt error
    else if (error == "Docid not define") {
        res.send({
            status: 409,
            error: "docid",
            errorMessage: "Docid is not define",
            fullMessage: error,
        });
    }
    // Run if server error
    else {
        res.send({
            status: 500,
            error: "Server",
            errorMessage: "Internel server error",
            fullMessage: error,
        });
    }
};
// Exporting functon
module.exports = errorHandler;