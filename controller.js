const poll = require('./db');
const axios = require('axios');

const getData = async (req, res) => {


    const count =  await poll.query("SELECT COUNT(*) FROM demo");

    if(count.rows[0].count == 0){
        try {
            const response = await axios("https://api.wazirx.com/api/v2/tickers");
    
            const data = response.data;
            const result = Object.entries(data);
    
            result.sort((a, b) => a.volume - b.volume);
    
            const topTenResult = result.slice(0, 10);
    
            topTenResult.forEach((idx) => {
                poll.query(`INSERT INTO "demo" ("name",last,buy,sell,volume,"base_unit") VALUES ($1,$2,$3,$4,$5,$6)`,[idx[1].name,idx[1].last,idx[1].buy,idx[1].sell,idx[1].volume,idx[1].base_unit]);
            });
    
            
        } catch (error) {
            console.log(error);
        }
    }

    poll.query("SELECT * FROM demo", (error, result) => {
        if (error) throw error;
        res.render("index",{data:result.rows});
    })
}

module.exports = {
    getData
}