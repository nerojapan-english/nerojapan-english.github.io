var dbName = 'sampleDB5';
var dbVersion = '2';
var storeName  = 'counts';
var count = 0;
//�@DB�����w�肵�Đڑ�
var openReq  = indexedDB.open(dbName, dbVersion);

var wordList = new Array(0);


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
		var request = store.get(getNum());
		request.onsuccess = function(event) {
			// �擾�����������ꍇ�̊֐��錾�ievent.target.result �Ƀf�[�^���Ԃ�j
			level = event.target.result.cnt;
		};
	});


    document.getElementById('radioGroup').addEventListener('click', function () {
		var db = event.target.result;
	    var trans = db.transaction(storeName, "readwrite");
	    var store = trans.objectStore(storeName);
		var element = document.getElementById( "radioGroup" ) ;
		// form�v�f���̃��W�I�{�^���O���[�v(name="hoge")���擾
		var radioNodeList = element.chk ;
		// �I����Ԃ̒l(value)���擾 (B���I����ԂȂ�"b"���Ԃ�)
		var a = radioNodeList.value ;
		makeList(store,a);
    });

}





function makeList(store,num) {

	// �S�̂̒P�ꐔ
	var wordNum = getWordNum();
	var level = 0;
	
	// �z��̃N���A
	wordList.splice(0);

	var request = store.getAll();
	request.onsuccess = function(event) {
		const rows = event.target.result;
		for (var i = 0; i < wordNum; i++) {
			
				// �擾�����������ꍇ�̊֐��錾�ievent.target.result �Ƀf�[�^���Ԃ�j
				level = rows[i];
				if (Number(num) == level.cnt) {
//					document.getElementById('countDisplay').innerHTML = "Yes";
						let w1 = arrayTest4[i][0];
						let w2 = arrayTest4[i][1];
						wordList.push(arrayTest3[i]);
//						wordList.push(["abc","123"]);
				} else {
//					document.getElementById('countDisplay').innerHTML = "No";
				}
				
		}
		setWordList(wordList);



	}


//	for (var i = 0; i < wordNum; i++) {
//		var request = store.get(i);
//		request.onsuccess = function(event) {
//			// �擾�����������ꍇ�̊֐��錾�ievent.target.result �Ƀf�[�^���Ԃ�j
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




function updateDb (db, store_name, cnt) {
    var trans = db.transaction(store_name, "readwrite");
    var store = trans.objectStore(store_name);
	var num = getNum();

	store.put({
	    id:num,
	    cnt:cnt
	});
}





