// This function create response object
const createResponseObject = (token, message, user) => {
    const responseObject = {
        status: 200,
        error: null,
        message: message,
        token: token,
        username: user.result[0].username,
        useremail: user.result[0].useremail,
        userid: user.result[0].id,
        joined: user.result[0].joined,
        profession: user.result[0].profession,
        phone: user.result[0].phone,
        address: user.result[0].address,
        site: user.result[0].site,
        birthday: user.result[0].birthday,
        gender: user.result[0].gender,
        bio: user.result[0].bio,
        skills: user.result[0].skills,
        profileimage: user.result[0].profileimage,
    };
    return responseObject;
};
// Exporting function 
module.exports = createResponseObject;