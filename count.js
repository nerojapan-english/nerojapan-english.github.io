var dbName = 'sampleDB6';
var dbVersion = '1';
var storeName  = 'counts';
var count = 0;
//　DB名を指定して接続
var openReq  = indexedDB.open(dbName, dbVersion);

var wordList = new Array(0);


// エラー時
openReq.onerror = function (event) {
    // 接続に失敗
    console.log('db open error');
}

//DBのバージョン更新(DBの新規作成も含む)時のみ実行
openReq.onupgradeneeded = function (event) {
    var db = event.target.result;
    const objectStore = db.createObjectStore(storeName, {keyPath : 'id'})
    objectStore.createIndex("id", "id", { unique: true });
    objectStore.createIndex("cnt", "cnt", { unique: false });

	
//	var trans = db.transaction(storeName, "readwrite");
//    var store = trans.objectStore(storeName);
	
	var wordNum = getMasterListNum();

	for (let i = 0; i < wordNum; i++) {
		objectStore.put({
	        id:i,
	        cnt:0
	    });
	}
    console.log('db upgrade');
}

//onupgradeneededの後に実行。更新がない場合はこれだけ実行
openReq.onsuccess = function (event) {
    var db = event.target.result;
    var trans = db.transaction(storeName, 'readonly');
    var store = trans.objectStore(storeName);


//    var getReq = store.get(1);
//
//    getReq.onerror = function (event) {
//        count = 0;
//        console.log('取得失敗');
//    }
//    getReq.onsuccess = function (event) {
//        console.log('取得成功');
//        if (typeof event.target.result === 'undefined') {
//            count = 0;
//        } else {
//            count = event.target.result.cnt;
//            console.log(count);
//        }
//        document.getElementById('countDisplay').innerHTML = count;
//    }

	// 選択状態の値(value)を取得 (1が選択状態なら"1"が返る)
	makeList(store,Number("0"));
	


	// Lv設定のカラーボタン 押下
    document.getElementById('btn1').addEventListener('click', function () {
        updateDb(db, storeName,wordList[getNum()] , 1);
//        document.getElementById('countDisplay').innerHTML = 1;
    });

    document.getElementById('btn2').addEventListener('click', function () {
        updateDb(db, storeName,wordList[getNum()] , 2);
//        document.getElementById('countDisplay').innerHTML = 2;
    });
    document.getElementById('btn3').addEventListener('click', function () {
        updateDb(db, storeName,wordList[getNum()] , 3);
//        document.getElementById('countDisplay').innerHTML = 3;
    });
    document.getElementById('btn4').addEventListener('click', function () {
        updateDb(db, storeName,wordList[getNum()] ,  4);
//        document.getElementById('countDisplay').innerHTML = 4;
    });

	// reset 押下
    document.getElementById('countReset').addEventListener('click', function () {
        count = 0;
        var putReq = updateDb(db, storeName,wordList[getNum()], count);

        putReq.onsuccess = function (event) {
            console.log('更新成功');
            document.getElementById('countDisplay').innerHTML = count;
        }
        putReq.onerror = function (event) {
            console.log('更新失敗');
        }
    });



	// next 押下
    document.getElementById('next').addEventListener('click', function () {
		increNum();
//		init();

		updateDisplay(getNum());
		


//		var db = event.target.result;
//	    var trans = db.transaction(storeName, "readwrite");
//	    var store = trans.objectStore(storeName);
//		var level = 0;
//
//		// testdbデータベースオープン
//		var request = store.get(getNum());
//		request.onsuccess = function(event) {
//			// 取得が成功した場合の関数宣言（event.target.result にデータが返る）
//			level = event.target.result.cnt;
//		};
	});


	// Lv選択のラジオボタン 押下
    document.getElementById('radioGroup').addEventListener('click', function () {
		var db = event.target.result;
	    var trans = db.transaction(storeName, "readwrite");
	    var store = trans.objectStore(storeName);
		var element = document.getElementById( "radioGroup" ) ;
		// form要素内のラジオボタングループ(name="hoge")を取得
		var radioNodeList = element.chk ;
		// 選択状態の値(value)を取得 (Bが選択状態なら"b"が返る)
		var a = radioNodeList.value ;
		makeList(store,Number(a));
//		init();
    });

}



const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


async function makeList(store,lv) {

	// 全体の単語数
	var wordNum = getMasterListNum();
	var level = 0;
	
	// 配列のクリア
	wordList.splice(0);

//	var request = store.getAll();
//	request.onsuccess = function(event) {
//		const rows = event.target.result;
//		for (var i = 0; i < wordNum; i++) {
//			
//				// 取得が成功した場合の関数宣言（event.target.result にデータが返る）
//				level = rows[i];
//				if (Number(num) == level.cnt) {
//						wordList.push(arrayTest4[i]);
//				} else {
//				}
//				
//		}
//		setWordList(wordList);
//
//
//
//	}

// 0の場合はすべてではなく、Lv0のものだけ表示する
//	if (Number(num) == 0) {
//		setWordList(arrayTest4);
//		return;
//	}

	let compFlg = 0;
	let request = store.openCursor();

	// カーソルで見つかった各本に対して呼び出されます
	request.onsuccess = function() {
		let cursor = request.result;
  		if (cursor) {
    		let value = cursor.value.cnt; // book オブジェクト
			if (lv == value) {
//				wordList.push(arrayTest4[cursor.value.id]);
				wordList.push(cursor.value.id);

			}

    		cursor.continue();
  		} else {
			setWordList(wordList);
			compFlg = 1;
  		}
	};

	while(compFlg == 0){
await _sleep(100);

	}
	changeLevel();


//	for (var i = 0; i < wordNum; i++) {
//		var request = store.get(i);
//		request.onsuccess = function(event) {
//			// 取得が成功した場合の関数宣言（event.target.result にデータが返る）
//			level = event.target.result.cnt;
//			if (Number(num) == level) {
//				document.getElementById('countDisplay').innerHTML = "Yes";
//					let w1 = arrayTest3[i][0];
//					let w2 = arrayTest3[i][1];
//					wordList.push([w1,w2]);
//					wordList.push(["abc","123"]);
//			} else {
//				document.getElementById('countDisplay').innerHTML = "No";
//			}
//			
//		}
//	}
//	setWordList(wordList);
}




function updateDb (db, store_name,index, lv) {
    var trans = db.transaction(store_name, "readwrite");
    var store = trans.objectStore(store_name);
//	var num = getNum();

	store.put({
	    id:index,
	    cnt:lv
	});
}


function getWordFromWordList(index) 
{
	var retStr;
	retStr = "&nbsp;&nbsp;"+arrayTest4[wordList[index]][0];
	return retStr;
}

function getansFromWordList(index) 
{
	var retStr;
	retStr = "&nbsp;&nbsp;"+arrayTest4[wordList[index]][1];
	return retStr;
}

function getWordIndexFromWordList(index) 
{
	var retIndex;
	retIndex = wordList[index];
	return retIndex;
}


