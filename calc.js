

//var arrayTest = new Array(10);
//var arrayTest2 = new Array("ans_no0","ans_no1","ans_no2","ans_no3","ans_no4","ans_no5","ans_no6","ans_no7","ans_no8","ans_no9");



let num1 = 0;
let numAnswer = 0;
let status = 0;
let level = 0;

//let words = arrayTest2;
let words = arrayTest4;
let wordsListNum = 0;




// ------------------------------------------------------------------------
//    描画更新系処理
// ------------------------------------------------------------------------

function init()
{
	num1=0;
    updateFormula(0);
    updateAnswer();
}

function changeLevel()
{
	num1=0;
    updateFormula(0);
    updateAnswer();
}



function updateDisplay(index)
{
    updateFormula(index);
    updateAnswer();
}


// 指定したindexのWordを表示
function updateFormula(index) 
{
//  for (let i = 0; i < arrayTest2.length; i++){
//      document.getElementById("fm_no0").innerHTML = get_test2(0);
//  }
	document.getElementById("fm_no0").innerHTML = getWordFromWordList(index);
	document.getElementById('countDisplay').innerHTML = getWordIndexFromWordList(index)+1;

}

function updateAnswer() 
{
  var str = "&nbsp;"+"?????"
//  for (let i = 0; i < arrayTest2.length; i++){
      document.getElementById("ans_no0").innerHTML = str;
//  }
}

// ------------------------------------------------------------------------
//    内部処理
// ------------------------------------------------------------------------


function get_test2(index) 
{
//    var num1=0
//    var num2=0
//    var num3 = 0;
//
    var min = 0;
    var max = 0;
	var retStr;
  if ( status == 0 ) {
    max = words.length;
  } else {
    max = arrayTest4.length;
	}

	// 単語の配列のlenの中から、ランダムな数字を出す
	// その数字を覚えておく
//    num1= Math.floor(Math.random() * (max - min) + min);



  if ( status == 0 ) {
    retStr =  "&nbsp;"+words[num1][0];
  } else {
    retStr = "&nbsp;"+arrayTest4[num1][0];
	}
	numAnswer = num1;
//	num1 = num1 + 1;
//	if (num1 >= max) {
//		num1=0;
//	}
	return retStr;

}

// 指定されたNoの答えを、問題作成時に作った配列から取得
function get_ans2(num){
//    var str = `x = ${ arrayTest[num]}`;
  if ( status == 0 ) {
	return "&nbsp;"+words[numAnswer][1];
  } else {
	return "&nbsp;"+arrayTest4[numAnswer][1];
	}
	
}


function getNum(){
	return num1;
	
}

function increNum(){

	num1 = num1 + 1;
	if (num1 >= words.length) {
		num1=0;
	}
}





function getMasterListNum(){
	return arrayTest4.length;
	
}


function getWordNum(){
	return wordsListNum;
	
}

function setWordList(newList){
	words = newList;
	num1=0;
	wordsListNum = words.length;
}




// ------------------------------------------------------------------------
//    クリックイベント
// ------------------------------------------------------------------------
//function onClickNext() {
//  init();
//	            document.getElementById('countDisplay').innerHTML = get_level(num1);
//
//}



function onClickAns(textNo) {
//  var id = arrayTest2[textNo][1]
  document.getElementById("ans_no0").innerHTML = getansFromWordList(getNum());
};






