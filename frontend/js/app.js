/**
 * NKMS
 * 정보보호 19-4기 
 * 박재용 <scorpion@dgu.ac.kr>
*/

var requestFlag=false;
var sites_count=0;
var sites_log=[];
var shodan_log=[];
var sites_list=[];
var error_log=[];

function addZeroToNumber(num) { return num >= 10 ? num : '0' + num; }
function updateTime() {
	var dateTime = new Date();
	// KST 가 아니라면 타임존 보정
	if (dateTime.getTimezoneOffset() != -540) {
		dateTime = new Date(Date.now() + (540 + dateTime.getTimezoneOffset()) * 60000);
	}
	var year = dateTime.getFullYear();
	var month = dateTime.getMonth() + 1;
	var date = dateTime.getDate();
	var hour = addZeroToNumber(dateTime.getHours());
	var min = addZeroToNumber(dateTime.getMinutes());
	var sec = addZeroToNumber(dateTime.getSeconds());

	$('#datetime-date').text(year + '.' + month + '.' + date + '. KST');
	$('#datetime-time').text(hour + ':' + min + ':' + sec);
	setTimeout("updateTime()",900);
}

function createFrames(){
	var socket = io.connect();
	var text ="최초 프레임 생성...";
	socket.emit('frame',text)
	socket.on('kiso',function(sites){
		sites_list.push(sites);
		var div = document.querySelector('.status-container');
		sites_count=sites[0].sites.length; // 사이트 개수 전역저장.
		for(var i =0; i<sites[0].sites.length;i++){
		div.innerHTML +=
			`<div class="status-node-noinfo" id="node_${i}"><i class="fas fa-bullseye"></i><div class="inner-information"> ${sites[0].sites[i].name}<br>IP: ${sites[0].sites[i].ip}</div></div>`
		}
	})
							}
//http 요청을 전체적으로 한번 보낸다.
function totalRequest(){
	console.log("HTTP GET 요청완료...")
	var socket = io.connect(); 
	var text = 'web info is needed'
	socket.emit('web',text)
	socket.on('webinfo',function(status){
		
	sites_log.push(status);
	})
}	
//shodan 요청 한번만 날린다.
function onceShodan(index){
	console.log("Shodan 요청완료...")
	var socket = io.connect();
	socket.emit('shodan',index)
	socket.on('shodaninfo',function(status){
		try{
			if(shodan_log[index]==null||undefined){
				shodan_log[index]=status;
			}
			else {
				try{
					if(status!=null){
						if(shodan_log[index].last_update!=status.last_update){
							shodan_log[index]=status;
						}
					}
				}
				catch(e){
					error_log.push(e);console.log(e);
				}
			}
		}
		catch(e){
			console.log(e);error_log.push("Shodan 함수 에러 : ",index,e)
		}
			
	})
}
//shodan 요청하고 시간차를 두고 null 인것에 대해 또 요청하고 그렇게한다. Promise 사용하자.
function shodanRoutine(){
var first = function (){return new Promise(function(res,rej){
	for(var i=0; i<sites_count; i++){
		onceShodan(i);
	}
})}
var second = function (){return new Promise(function(res,rej){
	for(var i=0; i<sites_count; i++){
		if(shodan_log[i]==null||undefined){onceShodan(i)};
	}
})}

first()
	.then(setTimeout(second,10000))
	.then(setTimeout(second,20000))
	.then(setTimeout(second,35000))
	.then(setTimeout(second,55000))
	.then(setTimeout(tekiyou,56000))
	//.then(setTimeout(function(){alert("완료")},60000))
	//.then(alert("1분이 소요됩니다..."));
}

				
//노드 클릭시 표시되는 상세정보 업데이트 함수
function tekiyou(){
	console.log('Shodan 상세정보 갱신중 ... ');
	for(var i=0; i<sites_count;i++){
		var temp = "#node_"+i;
		
		$(temp).on("click", function(){
			var temp_num = Number(this.id.split("_")[1]);
			console.log(temp_num)
			var paragraph_contents =(shodan_log==null||shodan_log[temp_num]==null)?"No results found":"IP: "+String(shodan_log[temp_num].ip_str)+"<br><br>"+"국가 / 도시: "+String(shodan_log[temp_num].country_code)+" / "+String(shodan_log[temp_num].city)+"<br><br>"+"최종 업데이트 일자: "+String(shodan_log[temp_num].last_update)+"<br><br>"+"발견된 취약점: "+ (shodan_log[temp_num].vulns!=undefined?String(shodan_log[temp_num].vulns.length)+"<br><br>"+String(shodan_log[temp_num].vulns):"0")
			
			$('.status-container').fadeOut(300);
			$('.click-information p').html(paragraph_contents);
			$('.click-information').fadeIn(500);
			
			$('.click-information').on("click",function(){
				$('.click-information').fadeOut(300);
				$('.status-container').fadeIn(500);
				$('.click-information p').text("")
			})
		});
	}
	
}

//판단하는 함수
function handan(){
	console.log('접속가능여부 및 쇼단정보 업데이트...')
	
	if(sites_log.length>=3){
		for(var i=0;i<sites_count;i++){
			
			var handan_kijyun =0;
			for(var j=1;j<=3;j++){
				
				if(sites_log[sites_log.length-j][i]==null){
					handan_kijyun-=1;
				}
				else if(sites_log[sites_log.length-j][i].statusCode=="200"){
					handan_kijyun+=2;
				}
				else{
					handan_kijyun-=1;
				}
			}
			
			//정상일때 클라이언트에 보여주는 페이지 업데이트.
			var selectorString='#node_'+i;
			if(handan_kijyun>0){
				var update = document.querySelector(selectorString);
				update.className="status-node-normal"
			}else{
				var update = document.querySelector(selectorString);
				update.className="status-node-abnormal"
			}
		}
	}
	// if(requestFlag){setTimeout(handan,30000);}
	// else return; 
}
function mainloop(){
	if(requestFlag == true){
		//console.log('메인루프 돌아갑니다.')
		//메인루프 기동구현.
		var first = function (){return new Promise(function(res,rej){
			if(requestFlag == true){
				totalRequest();
				//console.log('메인루프내 토탈리퀘스트 돌아갑니다.')
			};
		})}
		var second = function (){return new Promise(function(res,rej){
			if(requestFlag == true){
				shodanRoutine();
				//console.log('메인루프내 쇼단루틴 돌아갑니다.')
			};
		})}
		var recursive = function (){return new Promise(function(res,rej){
			if(requestFlag == true){
				mainloop();
				//console.log('메인루프내 재귀루틴 돌아갑니다.')
			};
		})}
		
		second()
			.then(setTimeout(first,1000))
			.then(setTimeout(first,15000))
			.then(setTimeout(first,30000))
			.then(setTimeout(handan,60000))
			.then(setTimeout(first,80000))
			.then(setTimeout(handan,100000))
			.then(setTimeout(first,120000))
			.then(setTimeout(first,200000))
			.then(setTimeout(first,215000))
			.then(setTimeout(handan,230000))
			.then(setTimeout(first,300000))
			.then(setTimeout(first,331000))
			.then(setTimeout(handan,360000))
			.then(setTimeout(first,440000))
			.then(setTimeout(first,560000))
			.then(setTimeout(handan,570000))
			.then(setTimeout(recursive,600000))//10분마다 갱신.
	}
	else return;
}
// ON / OFF 스위치 동작 구현.
function button_kinou(){
	
	var yousei = document.querySelector('.yousei');
	yousei.onclick=function(){
		if(yousei.id=='kidou'){
			yousei.id='fukidou';
			yousei.value='OFF';
			requestFlag=false;


		}
		else{
			yousei.id='kidou';
			yousei.value='ON';
			requestFlag=true;
			mainloop();
			//handan();
			//startRequest();
			//startShodan();

		}
	}
	var shodanReq = $('#shodanReq');
		shodanReq.on('click',shodanRoutine);
	// var getReq = $('#getReq');
	// 	getReq.on('click',totalRequest);
	
	var getDocument = $('#getDocument');
		getDocument.on('click',downloadDocument);
	
	//if(document.querySelector('#node_0')!=null){}

	
}

function downloadDocument(){
	var doc=``
	for(var temp_num=0;temp_num<sites_count;temp_num++){ 
		doc+=(shodan_log==null||shodan_log[temp_num]==null)?"No information\n\n":
			"사이트: "+sites_list[0][0].sites[temp_num].name+"\n"+"URL: "+sites_list[0][0].sites[temp_num].url+"\n"+"IP: "+String(shodan_log[temp_num].ip_str)+"\n"+
				"국가 / 도시: "+String(shodan_log[temp_num].country_code)+" / "+String(shodan_log[temp_num].city)+"\n"+
				"최종 업데이트 일자: "+String(shodan_log[temp_num].last_update)+"\n"+
				"발견된 취약점: "+ (shodan_log[temp_num].vulns!=undefined?String(shodan_log[temp_num].vulns.length)+"\n"+String(shodan_log[temp_num].vulns)+"\n\n":"0\n\n")
	}
	
	blo1 = new Blob([doc],{type:'application/unknown'});
	furl=URL.createObjectURL(blo1);
	$(`<a href="${furl}" download="DPRK.csv"></a>`)[0].click();
}

window.onload = async function(){
	await createFrames();
	updateTime();
	button_kinou();
	
	}
