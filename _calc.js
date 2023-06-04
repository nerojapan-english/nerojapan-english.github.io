

var arrayTest = new Array(10);
//var arrayTest2 = new Array("ans_no0","ans_no1","ans_no2","ans_no3","ans_no4","ans_no5","ans_no6","ans_no7","ans_no8","ans_no9");
var arrayTest2 = [
                   [ "fm_no0", "ans_no0" ],
                   [ "fm_no1", "ans_no1" ],
                   [ "fm_no2", "ans_no2" ],
                   [ "fm_no3", "ans_no3" ],
                   [ "fm_no4", "ans_no4" ],
                   [ "fm_no5", "ans_no5" ],
                   [ "fm_no6", "ans_no6" ],
                   [ "fm_no7", "ans_no7" ],
                   [ "fm_no8", "ans_no8" ],
                   [ "fm_no9", "ans_no9" ],
];


// ------------------------------------------------------------------------
//    描画更新系処理
// ------------------------------------------------------------------------

function init()
{
    updateFormula();
    updateAnswer();
}

function updateFormula() 
{
  for (let i = 0; i < arrayTest2.length; i++){
      document.getElementById(arrayTest2[i][0]).innerHTML = get_test(i);
  }
}

function updateAnswer() 
{
  var str = "x = ?"
  for (let i = 0; i < arrayTest2.length; i++){
      document.getElementById(arrayTest2[i][1]).innerHTML = str;
  }
}

// ------------------------------------------------------------------------
//    内部処理
// ------------------------------------------------------------------------

// 問題と答え(xの値)を配列に設定
function get_test(index) 
{
    var num1=0
    var num2=0
    var num3 = 0;

    var min = Math.ceil(-9);
    var max = Math.floor(9);
  
    while (num1==0) {
        num1= Math.floor(Math.random() * (max - min) + min);
    }

    min = 1;

    while (num2==0 || Math.abs(num2)==Math.abs(num1)) {
        num2= Math.floor(Math.random() * (max - min) + min);
    }
    num3 = Math.floor(Math.random() * (max - min) + min);
    num4 = num1*num3 + num2*num3

    var str;
    if (num1>=0) {
        str = "&nbsp;&nbsp;" + `${num1}x + ${num2}x = ${num4}`+"&nbsp;&nbsp;&nbsp;";
    } else {
        str = "&nbsp;" + `${num1}x + ${num2}x = ${num4}`+"&nbsp;&nbsp;&nbsp;";

    }
    arrayTest[index]=num3;

    return str
}


// 指定されたNoの答えを、問題作成時に作った配列から取得
function get_ans(num){
    var str = `x = ${ arrayTest[num]}`;
	return str
}


// ------------------------------------------------------------------------
//    クリックイベント
// ------------------------------------------------------------------------
function onClickNext() {
  init();
};


function onClickAns(textNo) {
  var id = arrayTest2[textNo][1]
  document.getElementById(id).innerHTML = get_ans(textNo);
};






