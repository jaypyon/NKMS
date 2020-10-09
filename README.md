# NKMS
해당 사이트의 현재 상태를 표시하고, 쇼단으로부터 해당 아이피의 정보를 가져온다. 또 이를 문서화한다.

# DETAILS
시작 후 ON을 누르면 정보를 수집하기 시작하고, 늦으면 5분 빠르면 2분안에 정보를 표시하기 시작합니다.
<div>
<img src="https://user-images.githubusercontent.com/72537190/95575447-afab1200-0a69-11eb-90f4-31c91d9f9c83.PNG" width="90%"></img>
</div>

마우스 버튼을 노드 위에 올리면 현재 어떤 노드 위에 마우스가 위치하는지 알 수 있도록 색이 바뀝니다.  
<div>
<img src="https://user-images.githubusercontent.com/72537190/95575463-b6398980-0a69-11eb-97ee-b5ffa1f5a84f.jpg" width="90%"></img>
</div>


해당 노드를 클릭하면 쇼단에서 가져온 정보를 보여줍니다. 
쇼단 정보를 이용하기 위해서는 API 키가 필요합니다. 반드시 API키를 terminalModules/shodan.js 파일에 입력해주세요.
<div>
<img src="https://user-images.githubusercontent.com/72537190/95575477-b9347a00-0a69-11eb-9c92-6a4ddb2fffdc.PNG" width="90%"></img>
</div>

노드의 색상은 현재 연결 가능 여부를 뜻합니다. 해당 서버가 열려있다면 파란색, 
그 외 모종의 이유로 정보를 수집할 수 없거나 스테이터스 코드가 200이 아닌경우에는 빨간색, 
최초기동 전 정보가 없을때는 회색으로 나타납니다.

해당 체계는 원래 사용되는 프로그램의 정보를 뺀 후 배포판으로 리패키징하여 배포하는 버전입니다.
