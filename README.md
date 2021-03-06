

### 1. css의 미디어 쿼리와 display: grid 속성을 사용하여 디바이스 가로폭에 맞춰 화면에 뜨는 사진 개수 조절하기


### 2. 미디어 쿼리를 통해 브라우저의 다크모드 사용여부를 파악하고 토글 버튼으로 자유롭게 사이트의 다크모드 사용 여부 변경 가능하게 하기

\- 사이트 전체의 background-color와 color 속성을 변경하더라도 색상이 변경되지 않는 엘리먼트(input, button)가 있어 css에서 변수를 정의하여 사용함.

\- 기본적으로 아무 것도 설정하지 않은 상태에서 `html.dark { ... }` 속성을 추가하는 식으로 다크모드를 구현했었으나 이대로는 제대로 다크모드가 구현되지 않았는데(배경색이 transparent로 설정된 일부 엘리먼트의 흰색 배경이 다크모드 변경 이후에도 흰색으로 남았음), 브라우저가 light 모드라면 `html.light {...}` 속성이 적용되게 하는 코드를 추가하니 잘 작동하는 것을 볼 수 있었음.

### 3. 미디어쿼리 통해 디바이스 가로폭 768px 이하에서 모달 가로폭이 100vw 되게 하기

### 4. ESC 누르거나 / x버튼 누르거나 / 모달 밖 누르면 모달 창 닫히게 하기

\- 개인적으로 느끼기에, (1)전체적인 웹페이지의 레이아웃을 index.html에 html 태그를 사용하여 일단 그리고 (2)대신 정적 엘리먼트에 대한 querySelector는 오직 클래스의 생성자 함수 내에서만 사용하는 방식이 웹페이지 레이아웃을 빠르고 편하게 구축하면서도 정적 엘리먼트에 대한 querySelector 남용으로 인해 생길 수 있는 문제점을 방지하는 데 효과적이기까지 하다고 생각하고 구현함.

\- 모달창이 화면에 떴을 때 모달창 바깥 부분 노드를 this.$imageInfo 변수에 저장했고, 여기에 Event Listener를 추가하여 이 부분 또는 모달창 내 x버튼에 대해 click이 발생했을 때 모달창이 닫히는 코드를 구현함.

\- addEventListener() 함수 호출이 클래스의 생성자 함수 내에 있으면 같은 이벤트리스너가 중복해 추가될 위험이 사라지므로 모든 addEventListener() 함수 호출은 클래스의 생성자 함수 안에 구현함.

### 5. 모달창이 열리면 해당 고양이의 성격, 태생 정보를 fetch() 함수로 호출해 렌더링하기

\- (1)일단 모달창이 뜨면 loading 메시지를 띄우고 (2)fetch() 함수 사용으로 에러 발생 시 에러 메시지를 띄우고 (3)제대로 정보를 로드해왔으면 loading 메시지를 지우고 불러온 정보를 렌더링하기까지 해야 해서 코드가 다소 길어질 수밖에 없었고, 따라서 이 부분을 위한 클래스를 새로 선언하고 상태 정보 획득 - 렌더링을 그 클래스의 setState() 함수와 render() 함수를 통해 구현함.


### 6. css의 transition 속성을 이용해 모달 열고 닫기에 fade in/out 적용

\- fade in/out 속성을 구현하는 방식이 여럿 있었으나 css의 transition 속성을 이용하는 것이 가장 간단하다고 보고 이를 이용해 구현함. 창이 뜰 땐 opacity를 1로, 창이 꺼질 땐 opacity를 0으로 해서 각 상태로 변경될 때 opacity가 변하도록 설정. (이렇게 할 경우 display:none으로 설정되면 안됨을 주의해야.)

### 7. input 태그에 autofocus 속성을 추가하여 페이지 진입 시 포커스가 input창에 가도록 처리

### 8. addEventListener("click", callback) 함수로 키워드가 입력돼 있을 때 input 창을 누르면 입력돼있던 키워드 지워지게 처리

### 9. 데이터 로드 중일 때 이를 알리는 메시지 창 띄우기

\- 단순히 '로딩 중' 메시지창만 띄울 게 아니라 fetch() 에러 시 '에러 발생했으니 다시 action하려면 이곳을 클릭하라'는 메시지가 뜨는 창도 함께 구현하고자 했기 때문에 기능이 다소 복잡해졌고, 이를 구현하기 위하여 새 클래스를 선언함.


### 10. 최근 검색 키워드 5개까지 띄우기

\- 구현 코드는 간단했으나, input 창에 관련된 처리를 해야 하는 SearchInput 클래스 안에 합쳐놓은 채로 둘 수는 없었기 때문에 새 클래스로 분리해 관리함. 단, 최근 키워드를 클릭했을 때 그 키워드로 검색하게 하는 부분은 마찬가지로 input 창 근처에 있는 랜덤 고양이 버튼과 함께 관리하는 게 event delegation 개념에도 부합한다고 보고 SearchInput 클래스 안에 구현함.


### 11. 페이지 새로고침 시 최근 검색 결과 뜨게 하기

\- sessionStorage.setItem(), .getItem() 메서드로 간단하게 구현 가능했음.

### 12. 랜덤 고양이 버튼 구현

### 13. IntersectionObserver 객체를 이용해 레이지로드 구현하기

\- this.$searchResult.innerHTML에 새 사진을 추가한 다음 곧바로 그 노드를 배열에 넣은 뒤에 lazyload() 함수를 호출하여 각 노드를 옵저버에 추가하는 코드를 구현했었으나 의도대로 작동하지 않아 이를 포기하고, this.$searchResult에 모든 사진이 추가된 그 다음에 lazyload() 함수를 호출하여 새로 추가된 노드들을 querySelectorAll() 함수로 추출하여 각 노드들을 옵저버에 추가하는 식으로 구현함.


### 14. addEventListener("mouseover", callback) 함수로, 검색결과 각 아이템 마우스 오버 시 고양이 이름 뜨게 하기

\- 마우스 오버가 된 아이템의 인덱스값을 추출하는 효과적인 방법이 떠오르지 않아 addEventListener의 콜백함수 안에서 `querySelectorAll("div").forEach((elem, idx) => if (elem === e.target) ...)` 하는 식의 코드를 구현했었으나 이러면 마우스를 살짝만 움직여도 루프를 수백번씩 추가로 도는 문제가 발생. div 태그의 속성명으로 idx라는 속성을 정의한 후 addEventListener의 콜백함수 안에서 '클릭된 태그가 div 태그라면 그 태그에 정의돼 있는 idx 값을 추출하라'는 코드를 구현하여 이 문제를 해결함. 


### 15. IntersectionObserver 객체를 이용해 스크롤 페이징 구현하기

\- this.$searchResult.innerHTML에 새 사진들을 추가한 다음 마지막으로 추가된 사진 노드를 옵저버에 추가하는 식으로 스크롤 페이징을 구현함.

### 16. 랜덤 고양이 배너 추가하기



### * 그 밖의 느낀 점들

\- 랜덤고양이 기능 구현이 너무 어렵게 느껴짐. 랜덤버튼 누를 때 / 랜덤고양이 검색결과 스크롤 내린 후 새로 검색된 결과들 추가할 때 / 랜덤 고양이 배너 띄울 때 모두 세 상황을 각각 다른 상황으로 보고 이를 구현해야 했는데, 얼핏 비슷해 보이지만 실제 구현으로 들어가면 각각 사용하는 기능들이 너무 달라 힘들었음. 그렇다고 기능이 다른만큼 함수를 무한정 늘릴 수도 없다 보니 할 수 없이 케이스를 구분하기 위해 함수가 받는 파라미터 수를 잔뜩 늘렸는데 적절한 선택이었다는 확신이 아직 잘 안 생김..

\- 함수 내에 fetch() 같은 비동기 함수 사용이 있을 시 그 함수를 호출하는 상위 클래스 모든 영역에 대해 이를 염두에 두고 await/async를 추가해야 하는데 비동기 프로그래밍이 아주 익숙해지지는 않아서인지 깜박할 때가 많았다는 점이 아쉬움.

\- '자바스크립트 내에서 정적 엘리먼트에 대해 querySelector()를 사용하는 일이 자칫 잘못하면 위험한 일일 수 있으므로 되도록이면 createElement()로 엘리먼트를 동적으로 생성해서 렌더링 해야 한다'는 이야길 들었는데 이번에 처음 들어본 이야기라서 많이 당황함. 일단 정적 엘리먼트를 querySelector를 하는 부분을 모두 클래스의 생성자 쪽으로만 몰아 넣었는데, 이렇게 하는 것과 상관 없이 정적 엘리먼트에 대한 querySelector()는 무조건 위험하다고 봐야 하는지 아직은 잘 모르겠음. 

\- 수십 개의 엘리먼트를 동적으로 생성하면서 각 엘리먼트에 모두 Event Listener를 추가하는 코드를 짜고 당황했던 적이 있는데 이번에 event delegation 개념을 제대로 배울 수 있었어서 만족함.

\- IntersectionObserver 라는 아주 간단한 개념으로 어렵게만 느껴졌던 레이지 로드와 무한 스크롤을 아주 쉽게 구현할 수 있어서 감탄함. 다만 레이지 로드 구현할 때 this.$searchResult.innerHTML에 막 추가한 엘리먼트 노드를 querySelector로 추출해 배열에 넣은 후 이들을 옵저버에 추가하는 코드를 썼었는데 작동이 안 됐던 이유는 아직 잘 모르겠음. IntersectionObserver의 작동 원리에 대한 디테일한 공부가 추가로 필요한 듯. 

\- 레이지로드, 무한 스크롤, 이벤트 델리게이션, 세션 스토리지, 미디어쿼리, display: grid, trasition 속성 등등 새로 배운 개념이 워낙 많았는데, 이 개념들을 새로 배우는 것보다도 개념적으로 어려울 거 없는 부분의 구현에 쓴 시간이 더 많았던 것 같은 느낌. 가장 마지막으로 구현하는 데 시간 많이 썼던 건 랜덤버튼/랜덤배너/랜덤 검색결과 스크롤 각 기능 확실히 구분하는 부분. 얼핏 보기에 유사해 보이는 것들 사이 차이점이 실제 구현으로 들어간 뒤에야 비로소 보이기 시작할 때가 있는데, 이 경우 이미 거기까지 구현하는 데 시간을 많이 쓰고 또 그 차이점을 깨닫기 위해 상당히 오랜 시간 동안 디버깅까지 시도했던 뒤인 경우가 많음. 다행히도 여태 구현한 코드를 많이 살리면서 각 기능 사이 차이점을 명확히 구분해 코드를 완성하는 경우도 있기는 한데, 처음부터 각각 차이가 있을 것임을 미리 알고 코드를 구현하기 시작했으면 디버깅에 시간을 많이 안 써도 됐을 것. 프로그램 한번 만들어보고 나면 이 지점이 늘 아쉬운데, 구현에 앞서 좀 더 깊이 생각해보는 습관을 가지려고 노력할 필요가 있어 보임.

\- 그밖에도, input창 주변의 엘리먼트들을 좀 더 비주얼적으로 깔끔해 보이게 하려고 html 코드와 css 속성을 고민한다거나 검색결과의 이미지들을 좀 더 가지런해 보이게 하려고 css 속성을 고민한다거나 하는 데도 많은 시간을 사용. html/css를 다뤄본 경험이 절대적으로 적으니 시간이 오래 걸릴 때가 있다는 점은 어쩔 수 없다고 생각. 

\- img 태그는 확실히 div에 background-image 속성을 준 것보다 다루기 어렵다고 생각. (고정된 크기의 box 내에 이미지를 넣고 거기서 삐져나온 부분을 자르게 한다든지 하는 디자인을 img로 쉽게 구현할 방법이 있는지.) 디자인 요소로 다루는 경우에는 img 태그의 사용을 피할 필요가 있다고 생각.
