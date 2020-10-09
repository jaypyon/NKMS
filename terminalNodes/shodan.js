/**
 * SHODAN
 * 정보보호 19-4기 
 * 박재용 <scorpion@dgu.ac.kr>
*/

//API Key: 

const util  = require('util');
const client = require('shodan-client');
const apiKey = 'API 키를 입력해주세요.';
const sites = require('../sites');

var inquire = function (index){
	var p = new Promise(function(resolve,reject){
		client
					.host(String(sites[0].sites[index].ip),apiKey)
					.catch(function(err){})
					.then(res=>(resolve(res)))
	})
	return p;
}
module.exports = inquire;




/*const searchOpts = {
  facets: 'ip_str:61.161.232.171',
  // minify: false,
};
*/

/*client
  .host("61.161.232.171",apiKey).then(res=>{console.log(res)})
  //.search('asterisk ip_str:61.161.232.171', apiKey, searchOpts)
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });
*/