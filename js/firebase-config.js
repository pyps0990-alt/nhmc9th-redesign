// =============================================
// Firebase 設定 - 統一設定檔
// 所有頁面共用此設定，避免重複初始化
// =============================================

const firebaseConfig = {
  apiKey: "AIzaSyBLsMAvPcpKBoeIfAA-hF2UGrrU5RRS7t4",
  authDomain: "nhmc9th-672f6.firebaseapp.com",
  databaseURL: "https://nhmc9th-672f6-default-rtdb.firebaseio.com",
  projectId: "nhmc9th-672f6",
  storageBucket: "nhmc9th-672f6.appspot.com",
  messagingSenderId: "470057381540",
  appId: "1:470057381540:web:d5e0881cb540a7a58a0031"
};

// 防止重複初始化
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.database();
