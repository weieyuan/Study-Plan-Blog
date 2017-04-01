/**
 * Created by Administrator on 2017/4/1.
 */
require('../css/app.css');
const module1 = require('./module1.js');
document.getElementById("test").innerText = module1.getInfo();
