var path = require ('path'); //path 모듈을 불러옴.

var directories = ['users','ojh','docs'];
var docDirectory = directories.join(path.sep);
        // join을 이용해서 배열 원소를 합칠때 path.sep을 이용하여 사이사이에 /를 넣어줌.

console.log('디렉토리 명 : %s', docDirectory); // users/ojh/docs 출력.

// 디렉토리 이름과 파일 이름 합치기
var curPath = path.join(__dirname, 'test.txt');
console.log('파일 Path : %s', curPath);

// 파일 Path에서 디렉토리, 파일 이름, 확장자 구별하기
var filename = curPath;
var dirname = path.dirname(filename);
var basename = path.basename(filename);
var extname = path.extname(filename);

console.log('디렉토리 : %s, 파일이름 : %s, 확장자 : %s',
                    dirname, basename,extname);