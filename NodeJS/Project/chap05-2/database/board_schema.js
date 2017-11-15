/*
만약 board 기능을 추가한다면?

1. /database/board_schema.js 추가

2. config에 file,collection,shemaName,modelName 추가.

3. /routes/board.js 추가 후 기능 구현

4. config/route_loader에 board.js 추가


모듈화를 함으로써
중간 역할의 route_loader.js와 database.js, 최종 역할의 app.js는 건들 필요가 없다.

기능에 맞게 schema와 route function구현부분을 추가하고,
초기 설정부분인 config 만 고치면 실행 됨.
*/