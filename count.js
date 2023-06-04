var dbName = 'sampleDB';
var dbVersion = '1';
var storeName  = 'counts';
var count = 0;
//�@DB�����w�肵�Đڑ�
var openReq  = indexedDB.open(dbName, dbVersion);

// �G���[��
openReq.onerror = function (event) {
    // �ڑ��Ɏ��s
    console.log('db open error');
}

//DB�̃o�[�W�����X�V(DB�̐V�K�쐬���܂�)���̂ݎ��s
openReq.onupgradeneeded = function (event) {
    var db = event.target.result;
    const objectStore = db.createObjectStore(storeName, {keyPath : 'id'})
    objectStore.createIndex("id", "id", { unique: true });
    objectStore.createIndex("cnt", "cnt", { unique: false });

    console.log('db upgrade');
}

//onupgradeneeded�̌�Ɏ��s�B�X�V���Ȃ��ꍇ�͂��ꂾ�����s
openReq.onsuccess = function (event) {
    var db = event.target.result;
    var trans = db.transaction(storeName, 'readonly');
    var store = trans.objectStore(storeName);
    var getReq = store.get(1);

    getReq.onerror = function (event) {
        count = 0;
        console.log('�擾���s');
    }
    getReq.onsuccess = function (event) {
        console.log('�擾����');
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
//            console.log('�X�V����');
            document.getElementById('countDisplay').innerHTML = 1;
//        }
//        putReq.onerror = function (event) {
//            console.log('�X�V���s');
//        }
    });

    document.getElementById('btn2').addEventListener('click', function () {
//        count--;
//        var putReq = updateDb(db, storeName, 2);
        updateDb(db, storeName, 2);

//        putReq.onsuccess = function (event) {
//            console.log('�X�V����');
            document.getElementById('countDisplay').innerHTML = 2;
//        }
//        putReq.onerror = function (event) {
//            console.log('�X�V���s');
//        }
    });
    document.getElementById('btn3').addEventListener('click', function () {
//        count--;
//        var putReq = updateDb(db, storeName, 3);
        updateDb(db, storeName, 3);

//        putReq.onsuccess = function (event) {
//            console.log('�X�V����');
            document.getElementById('countDisplay').innerHTML = 3;
//        }
//        putReq.onerror = function (event) {
//            console.log('�X�V���s');
//        }
    });
    document.getElementById('btn4').addEventListener('click', function () {
//        count--;
//        var putReq = updateDb(db, storeName, 4);
        updateDb(db, storeName, 4);

//        putReq.onsuccess = function (event) {
//            console.log('�X�V����');
            document.getElementById('countDisplay').innerHTML = 4;
//        }
//        putReq.onerror = function (event) {
//            console.log('�X�V���s');
//        }
    });

    document.getElementById('countReset').addEventListener('click', function () {
        count = 0;
        var putReq = updateDb(db, storeName, count);

        putReq.onsuccess = function (event) {
            console.log('�X�V����');
            document.getElementById('countDisplay').innerHTML = count;
        }
        putReq.onerror = function (event) {
            console.log('�X�V���s');
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
                // cursor.value��foo����̃L�[�lJavascript�I�u�W�F�N�g
                // memo�L�[�l���X�V
    			var level = cursor.value.cnt;
	            document.getElementById('countDisplay').innerHTML = get_level(level);
//                cursor.value.memo = memo;
//                let updateRequest = cursor.update(cursor.value);
//                updateRequest.onsuccess = function () {
//                    console.log("�X�V����", updateRequest.result);
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
                // cursor.value��foo����̃L�[�lJavascript�I�u�W�F�N�g
                // memo�L�[�l���X�V
//    			var level = cursor.value.cnt;

                cursor.value.cnt = cnt;
                let updateRequest = cursor.update(cursor.value);
                updateRequest.onsuccess = function () {
                   console.log("�X�V����", updateRequest.result);
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




    // testdb�f�[�^�x�[�X�I�[�v��

        // members�I�u�W�F�N�g�X�g�A����foo����̃��R�[�h���t�F�b�`
        let request = store.openCursor(IDBKeyRange.only(num));
        request.onsuccess = (event) => {
            let cursor = request.result;
            if (cursor) {
                // cursor.value��foo����̃L�[�lJavascript�I�u�W�F�N�g
                // memo�L�[�l���X�V
    			var level = cursor.value.cnt;

//                cursor.value.memo = memo;
//                let updateRequest = cursor.update(cursor.value);
//                updateRequest.onsuccess = function () {
//                    console.log("�X�V����", updateRequest.result);
//                };
//                cursor.continue();
            }
        }












	return level;
}





