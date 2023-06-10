var dbName = 'sampleDB5';
var dbVersion = '2';
var storeName  = 'counts';
var count = 0;
//　DB名を指定して接続
var openReq  = indexedDB.open(dbName, dbVersion);

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
	
	var wordNum = getWordNum();

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
    var getReq = store.get(1);

    getReq.onerror = function (event) {
        count = 0;
        console.log('取得失敗');
    }
    getReq.onsuccess = function (event) {
        console.log('取得成功');
        if (typeof event.target.result === 'undefined') {
            count = 0;
        } else {
            count = event.target.result.cnt;
            console.log(count);
        }
        document.getElementById('countDisplay').innerHTML = count;
    }


    document.getElementById('btn1').addEventListener('click', function () {
        updateDb(db, storeName, 1);
        document.getElementById('countDisplay').innerHTML = 1;
    });

    document.getElementById('btn2').addEventListener('click', function () {
        updateDb(db, storeName, 2);
        document.getElementById('countDisplay').innerHTML = 2;
    });
    document.getElementById('btn3').addEventListener('click', function () {
        updateDb(db, storeName, 3);
        document.getElementById('countDisplay').innerHTML = 3;
    });
    document.getElementById('btn4').addEventListener('click', function () {
        updateDb(db, storeName, 4);
        document.getElementById('countDisplay').innerHTML = 4;
    });

    document.getElementById('countReset').addEventListener('click', function () {
        count = 0;
        var putReq = updateDb(db, storeName, count);

        putReq.onsuccess = function (event) {
            console.log('更新成功');
            document.getElementById('countDisplay').innerHTML = count;
        }
        putReq.onerror = function (event) {
            console.log('更新失敗');
        }
    });




    document.getElementById('next').addEventListener('click', function () {

		init();
		var db = event.target.result;
	    var trans = db.transaction(storeName, "readwrite");
	    var store = trans.objectStore(storeName);
		var level = 0;

		// testdbデータベースオープン
		//var request = store.get({id:num});
		var request = store.get(getNum());
		request.onsuccess = function(event) {
			// 取得が成功した場合の関数宣言（event.target.result にデータが返る）
			level = event.target.result.cnt;
			document.getElementById('countDisplay').innerHTML = level;
		};
	});




}

function updateDb (db, store_name, cnt) {
    var trans = db.transaction(store_name, "readwrite");
    var store = trans.objectStore(store_name);
	var num = getNum();

	store.put({
	    id:num,
	    cnt:cnt
	});
}





