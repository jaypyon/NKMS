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

# CONFIGURATIONS
파일 sites.js, config.js 은 설정을 위하여 사용되는 파일입니다. 개인이 관제하고자 하는 사이트를 추가하기 위해서는 sites.js에 양식에 맞추어 url과 ip를 입력하면 됩니다.
또 config.js는 로컬에서 서버를 열 경우 사용할 포트를 지정할 수 있는 설정파일입니다.
그 외에도 terminalNodes/shodan.js 파일은 개인의 Shodan API Key를 입력하는 변수가 있습니다. 정상적인 이용을 위해서는 API KEY가 필요하니 꼭 입력해주시기 바랍니다.

해당 체계는 원래 사용되는 프로그램의 정보를 뺀 후 배포판으로 리패키징하여 배포하는 버전입니다.

# ENGLISH

# NKMS
Display the current status of the sites and bring information from the shodan for that IP. You can document its information by using a button which is subsumed in this system.

# DETAILS
Press ON after startup to start collecting information, and if it is late, it starts to display information in 5 minutes at the earliest, 2 minutes.
<div>
<img src="https://user-images.githubusercontent.com/72537190/95575447-afab1200-0a69-11eb-90f4-31c91d9f9c83.PNG" width="90%"></img>
</div>


When you place the mouse button on a node, the color changes to tell you which node the mouse is currently placed.
<div>
<img src="https://user-images.githubusercontent.com/72537190/95575463-b6398980-0a69-11eb-97ee-b5ffa1f5a84f.jpg" width="90%"></img>
</div>



Click on the appropriate node to show you the information from the shodan.
API key is required to use Shodan information. Please enter API key in terminalModules/shodan.js file.
<div>
<img src="https://user-images.githubusercontent.com/72537190/95575477-b9347a00-0a69-11eb-9c92-6a4ddb2fffdc.PNG" width="90%"></img>
</div>

The color of the node indicates its current status. If the server is open, blue,
If information cannot be collected for any other reason or if the http status code is not 200, red,
It's gray when there's no information before the initial start.

# CONFIGURATIONS
sites.js, config.js are files used for configutation. To add sites that you want to monitor, you can write url and ip in sites.js according to the form.
config.js is also a configuration file that allows you to specify which port to use when opening a server locally.
In addition, the terminalNodes/shodan.js file has variables that enter the individual Shodan API key. API key is required for normal use, so please fill it in.

This program I commited is a version for distribution. I subtracted some information from the original program and repackaged it in order to distribute it.

# 日本語
# NKMS
当該サイトの現在の状態を表示し、Shodanから当該IPの情報を取得する。 また、これを文書化する。

# DETAILS
開始後、ONを押すと情報収集を開始し、遅ければ5分、早ければ2分以内に情報を表示し始めます。
<div>
<img src="https://user-images.githubusercontent.com/72537190/95575447-afab1200-0a69-11eb-90f4-31c91d9f9c83.PNG" width="90%"></img>
</div>

マウスボタンをノード上に置くと、現在どのノードの上にマウスが位置するのかがわかるように色が変わります。
<div>
<img src="https://user-images.githubusercontent.com/72537190/95575463-b6398980-0a69-11eb-97ee-b5ffa1f5a84f.jpg" width="90%"></img>
</div>


該当ノードをクリックすると、Shodanから読み込んだ情報を表示します。
Shodan情報を利用するためには、APIのキーが必要です。 必ずAPIキーをterminalModules/shodan.jsに入力してください。
<div>
<img src="https://user-images.githubusercontent.com/72537190/95575477-b9347a00-0a69-11eb-9c92-6a4ddb2fffdc.PNG" width="90%"></img>
</div>

ノードの色は、現在接続可能かどうかを意味します。 該当サーバーが開いている場合は青色、
その他何らかの理由で情報を収集できなかったり、ステータスコードが200でない場合には赤、
最初の起動前に情報がない場合は、灰色で表示されます。

# CONFIGURATIONS
ファイル sites.js、config.js は、設定のために使用されるファイルです。 個人が管制しようとするサイトを追加するためには、sites.jsに様式に合わせてurlとipを入力すればできます。
また、config.jsは、ローカルでサーバーを開く場合に使用するポートを指定する設定ファイルです。
その他にも、terminalNodes/shodan.jsファイルは個人のShodanAPIKeyを入力する変数があります。 正常な利用のためにはAPIKEYが必要ですので入力してください。

このシステムは、もともと使用されているプログラムで機密情報を抜いた後、配布版としてリパッケージングして配布するバージョンです。
