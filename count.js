var dbName = 'sampleDB';
var dbVersion = '1';
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
//        count++;
//        var putReq = updateDb(db, storeName, 1);
        updateDb(db, storeName, 1);

//        putReq.onsuccess = function (event) {
//            console.log('更新成功');
            document.getElementById('countDisplay').innerHTML = 1;
//        }
//        putReq.onerror = function (event) {
//            console.log('更新失敗');
//        }
    });

    document.getElementById('btn2').addEventListener('click', function () {
//        count--;
//        var putReq = updateDb(db, storeName, 2);
        updateDb(db, storeName, 2);

//        putReq.onsuccess = function (event) {
//            console.log('更新成功');
            document.getElementById('countDisplay').innerHTML = 2;
//        }
//        putReq.onerror = function (event) {
//            console.log('更新失敗');
//        }
    });
    document.getElementById('btn3').addEventListener('click', function () {
//        count--;
//        var putReq = updateDb(db, storeName, 3);
        updateDb(db, storeName, 3);

//        putReq.onsuccess = function (event) {
//            console.log('更新成功');
            document.getElementById('countDisplay').innerHTML = 3;
//        }
//        putReq.onerror = function (event) {
//            console.log('更新失敗');
//        }
    });
    document.getElementById('btn4').addEventListener('click', function () {
//        count--;
//        var putReq = updateDb(db, storeName, 4);
        updateDb(db, storeName, 4);

//        putReq.onsuccess = function (event) {
//            console.log('更新成功');
            document.getElementById('countDisplay').innerHTML = 4;
//        }
//        putReq.onerror = function (event) {
//            console.log('更新失敗');
//        }
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
//	            document.getElementById('countDisplay').innerHTML = get_level(num1);
		var db = event.target.result;
	    var trans = db.transaction(store_name, "readwrite");
	    var store = trans.objectStore(store_name);

        let request = store.openCursor(IDBKeyRange.only(num1));
        request.onsuccess = (event) => {
            let cursor = request.result;
            if (cursor) {
                // cursor.valueはfooさんのキー値Javascriptオブジェクト
                // memoキー値を更新
    			var level = cursor.value.cnt;
	            document.getElementById('countDisplay').innerHTML = get_level(level);
//                cursor.value.memo = memo;
//                let updateRequest = cursor.update(cursor.value);
//                updateRequest.onsuccess = function () {
//                    console.log("更新成功", updateRequest.result);
//                };
//                cursor.continue();
            }
        }


	  });




}

function updateDb (db, store_name, cnt) {
    var trans = db.transaction(store_name, "readwrite");
    var store = trans.objectStore(store_name);
//    return store.put({
//        id:num1,
//        cnt: cnt
//    });


        let request = store.openCursor(IDBKeyRange.only(num1));
        request.onsuccess = (event) => {
            let cursor = request.result;
            if (cursor) {
                // cursor.valueはfooさんのキー値Javascriptオブジェクト
                // memoキー値を更新
//    			var level = cursor.value.cnt;

                cursor.value.cnt = cnt;
                let updateRequest = cursor.update(cursor.value);
                updateRequest.onsuccess = function () {
                   console.log("更新成功", updateRequest.result);
                };
                cursor.continue();
            }
        }




}


function get_level(num){

    var db = event.target.result;
    var trans = db.transaction(storeName, 'readonly');
    var store = trans.objectStore(storeName);
//    var level = event.target.result.cnt;




    // testdbデータベースオープン

        // membersオブジェクトストアからfooさんのレコードをフェッチ
        let request = store.openCursor(IDBKeyRange.only(num));
        request.onsuccess = (event) => {
            let cursor = request.result;
            if (cursor) {
                // cursor.valueはfooさんのキー値Javascriptオブジェクト
                // memoキー値を更新
    			var level = cursor.value.cnt;

//                cursor.value.memo = memo;
//                let updateRequest = cursor.update(cursor.value);
//                updateRequest.onsuccess = function () {
//                    console.log("更新成功", updateRequest.result);
//                };
//                cursor.continue();
            }
        }












	return level;
}





