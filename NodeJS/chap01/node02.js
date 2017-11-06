// argv로 전달된 파라미터 갯수 확인하기
console.log('argv 속성의 파라미터 수 : %d', process.argv.length);

// argv로 전달된 파라미터 확인하기
console.dir(process.argv);

// 환경 변수 확인하기
console.dir(process.env);
console.log('OS 환경 변수의 값 : %s', process.env['OS']);