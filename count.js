var dbName = 'sampleDB5';
var dbVersion = '2';
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
            console.log('�X�V����');
            document.getElementById('countDisplay').innerHTML = count;
        }
        putReq.onerror = function (event) {
            console.log('�X�V���s');
        }
    });




    document.getElementById('next').addEventListener('click', function () {

		init();
		var db = event.target.result;
	    var trans = db.transaction(storeName, "readwrite");
	    var store = trans.objectStore(storeName);
		var level = 0;

		// testdb�f�[�^�x�[�X�I�[�v��
		//var request = store.get({id:num});
		var request = store.get(getNum());
		request.onsuccess = function(event) {
			// �擾�����������ꍇ�̊֐��錾�ievent.target.result �Ƀf�[�^���Ԃ�j
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





