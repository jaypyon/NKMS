/**
 * HTTPGET
 * 정보보호 19-4기 
 * 박재용 <scorpion@dgu.ac.kr>
*/


'use strict';
const request = require('request');
const VERSION = require('../package.json').version;
const sites = require('../sites.js')


var inquire = function(){

	var Promises=[];
	var sendRequest = function (siteIp){
		return new Promise(function(resolve,reject){
			request({
			url: siteIp,
			timeout: 30000, time: true,
			headers: {
				"Accept": `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
				'Accept-Encoding': 'gzip, deflate',
				'Accept-Language': 'ko',
				'Cache-Control': 'max-age=0',
				'Connection': 'keep-alive',
				'Referer': 'http://www.example.com/',
				'Upgrade-Insecure-Requests': '1',
				'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36`
			},
			encoding: 'utf-8'
			}, function(error, resp, body) {

				resolve(resp);
			})
		})
	}

	for(var i=0; i<sites[0].sites.length;i++){
		var p = new Promise(function(resolve,reject){
			//sendRequest("http://"+sites[0].sites[i].ip+':'+sites[0].sites[i].port)
			sendRequest(sites[0].sites[i].url)
				.then(res=>{resolve(res)})
				.catch(res=>{})			
			
			})
		Promises.push(p)
		}
	return Promise.all(Promises)
}
module.exports=inquire;
