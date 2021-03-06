//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require('axios');
const dot = require('dotenv')
dot.config()
axios.defaults.baseURL = 'http://localhost:3001';
var local = "";
if(process.env.PORT == 3001){
  local = "http://localhost:3001";
}else{
  local = "https://vgame-api.herokuapp.com/";
}



// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('\x1b[33m%s\x1b[0m', 'server listening at 3001');
  });
});
