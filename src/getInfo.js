const axios = require('axios') ;

const getInfo = async (handle) => {
    const data = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`).then(res => res.data.result[0]) ; 
    const res = {
        'Name' : `${data.firstName} ${data.lastName}` ,
        'Rating' : data.rating , 
        'Rank' : data.rank , 
        'Max Rating' : data.maxRating ,
        'Max Rank' : data.maxRank ,
        'profilePic' : data.titlePhoto
    }
    return res ; 
};

module.exports = getInfo ; 