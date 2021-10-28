const errorHandler = (error, res) => {
    //   Run if some field missing
    if (error == "Some field is missing") {
        res.status(400).send({
            status: 400,
            error: "Missing",
            errorMessage: "Some field are missing",
        });
    }
    //   Run if jwt error
    else if (error.name == "JsonWebTokenError") {
        res.status(401).send({
            status: 401,
            error: "Unauthorized",
            errorMessage: error,
        });
    }
    // Run if invalid email
    else if (error == "Invalid email") {
        res.status(400).send({
            status: 400,
            error: "Email",
            errorMessage: "Please enter valid email",
        });
    }
    // Run if user does not exist
    else if (error == "User does not exist") {
        res.status(401).send({
            status: 401,
            error: "Email",
            errorMessage: "User does not exist",
        });
    }
    //   Run if user exits
    else if (error == "User exist") {
        res.status(401).send({
            status: 401,
            error: "Email",
            errorMessage: "User does not exist",
        });
    }
    // Run if password does not match
    else if (error == "Password does not match") {
        res.status(401).send({
            status: 401,
            error: "Password",
            errorMessage: error,
        });
    }
    //   Run if don't like rror
    else if (error == "Don't like") {
        res.status(200).send({
            status: 200,
            error: "Not Liked",
            errorMessage: "User do not any doc",
        });
    }
    // Run if user does not exist
    else if (error == "Empty") {
        res.status(404).send({
            status: 404,
            error: "Empty",
            errorMessage: "Docs not found",
        });
    }
    //   Run if jwt error
    else if (error == "Docid not define") {
        res.status(400).send({
            status: 409,
            error: "docid",
            errorMessage: "Docid is not define",
        });
    }
    //   Run if jwt error
    else if (error == "Not base64 string") {
        res.status(400).send({
            status: 400,
            error: "Base64",
            errorMessage: "Not base64 string",
        });
    }
    // Run if server error
    else {
        res.status(500).send({
            status: 500,
            error: "Server",
            errorMessage: "Internel server error",
        });
    }
};
// Exporting functon
module.exports = errorHandler;