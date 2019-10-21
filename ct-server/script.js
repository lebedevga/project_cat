//запускаем функцию получения и отправки номера каждую минуту
var myTimer = setTimeout(sendToCalltracking, 500);
//вызываем функцию получения и отправки номера каждую минуту
setInterval(sendToCalltracking, 1 * 60 * 1000);

function sendToCalltracking() {
  var ggg = getcookie("ct_user");
  var ccc = getcookie("phone");
  var gac = getcookie("_ga");

  if (
    typeof ggg === "undefined" ||
    ggg === null ||
    ccc === "undefined" ||
    ccc === null ||
    ccc.length < 1 ||
    ggg.length < 1 ||
    ccc === "" ||
    ggg === ""
  ) {
    //console.log('false');
    //console.log(ggg);
    generateuser_id();
    getNumberFirstTime();
  } else {
    //console.log('true');
    //console.log(ggg);
    //console.log(ccc);
    document.getElementById("calltracking").innerHTML = ccc;
    getNumberPeriodically();
  }
}

//генерим id  пользователя
function generateuser_id() {
  var ct_user_id = makeid(33);
  setcookie("ct_user", ct_user_id, new Date().getTime() + 60 * 60 * 1000); // час
  if (window.sessionStorage && window.localStorage) {
    //console.log('объекты sessionStorage и localtorage поддерживаются');
    var date = new Date();
    var mon = ("0" + (1 + date.getMonth())).replace(/.?(\d{2})/, "$1");
    var a = date
      .toString()
      .replace(
        /^[^\s]+\s([^\s]+)\s([^\s]+)\s([^\s]+)\s([^\s]+)\s.*$/gi,
        "$3-" + mon + "-$2 $4"
      );
    var ct_user_id2 = getcookie("ct_user");
    var obj = {
      phone: "user",
      arr: [ct_user_id2, a]
    };
    //Сериализуем его в '{'phone': 'id', 'arr': [ct_user_id2, a]}':
    var json = JSON.stringify(obj);
    //Запишем в localStorage с ключом obj:
    localStorage.setItem("obj", json);
    //Получим данные обратно из localStorage в виде JSON:
    var json = localStorage.getItem("obj");
    //Преобразуем их обратно в объект JavaScript:
    var obj = JSON.parse(json);
    //console.log(obj);
  } else {
    //console.log('объекты sessionStorage и localtorage не поддерживаются');
  }
}

//отправляем запрос на получение номера, после того, как мы первый раз сгенерировали отсутствующий id  пользователя
function getNumberFirstTime() {
  var method = "get_num_first";
  var ct_user = getcookie("ct_user");
  var gid = getcookie("_ga");
  var ref = document.referrer;
  var host = window.location.origin;
  var page = document.location.href;
  //var host = location.host;
  var xhr = new XMLHttpRequest();
  var body =
    "&method=" +
    encodeURIComponent(method) +
    "&page=" +
    encodeURIComponent(page) +
    "&ct_user=" +
    encodeURIComponent(ct_user) +
    "&ref=" +
    encodeURIComponent(ref) +
    "&host=" +
    encodeURIComponent(host) +
    "&gid=" +
    encodeURIComponent(gid);

  xhr.open("POST", "http://ct-server", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.withCredentials = true;
  xhr.send(body);
  xhr.onreadystatechange = function() {
    //console.log(xhr.responseText);
    var t = xhr.responseText;
    document.getElementById("calltracking").innerHTML = t;
    setcookie("phone", t, new Date().getTime() + 60 * 60 * 1000); // час
  };
}

//вариант с отправкой  json
function getNumberFirstTimeJson() {
  var xhr = new XMLHttpRequest();
  var method = "get_num";
  var ct_user = getcookie("phone2");
  var phone = getcookie("phone2");
  var gid = getcookie("_ga");
  var ref = document.referrer;
  var host = window.location.origin;

  var json = JSON.stringify({
    method: "get_num",
    host: host,
    ref: ref,
    gid: gid,
    ct_user: ct_user,
    phone: phone
  });

  xhr.open("POST", "http://ct-server/json.php", true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.withCredentials = true;
  xhr.onreadystatechange = function() {
    var t = xhr.responseText;
    document.getElementById("calltracking").innerHTML = t;
    setcookie("phone2", t, new Date().getTime() + 60 * 60 * 1000);
  };
  xhr.send(json);
}

//отправляем запрос на получение номера, по полученному  id  пользователя периодически
function getNumberPeriodically() {
  var method = "get_num";
  var ct_user = getcookie("ct_user");
  var phone = getcookie("phone");
  var gid = getcookie("_ga");
  var ref = document.referrer;
  var page = document.location.href;
  var host = window.location.origin;
  var xhr = new XMLHttpRequest();
  var body =
    "&method=" +
    encodeURIComponent(method) +
    "&page=" +
    encodeURIComponent(page) +
    "&ct_user=" +
    encodeURIComponent(ct_user) +
    "&ref=" +
    encodeURIComponent(ref) +
    "&host=" +
    encodeURIComponent(host) +
    "&phone=" +
    encodeURIComponent(phone) +
    "&gid=" +
    encodeURIComponent(gid);

  xhr.open("POST", "http://ct-server", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.withCredentials = true;
  xhr.send(body);
  xhr.onreadystatechange = function() {
    //console.log(xhr.responseText);
    var t = xhr.responseText;
    //document.getElementById('calltracking').innerHTML = t;
  };
}

//генерируем  id пользователя
function makeid(length) {
  var result = "";
  var user_id = "abcdefghijklmnopqrstuvwxyz0123456789";
  var user_idLength = user_id.length;
  for (var i = 0; i < length; i++) {
    result += user_id.charAt(Math.floor(Math.random() * user_idLength));
  }
  return result;
}

//задаем куку
function setcookie(phone, value, expires, path, domain, secure) {
  document.cookie =
    phone +
    "=" +
    escape(value) +
    (expires ? "; expires=" + new Date(expires) : "") +
    (path ? "; path=" + path : "") +
    (domain ? "; domain=" + domain : "") +
    (secure ? "; secure" : "");
}

//читаем куку
function getcookie(phone) {
  var cookie = " " + document.cookie;
  var search = " " + phone + "=";
  var setStr = null;
  var offset = 0;
  var end = 0;

  if (cookie.length > 0) {
    offset = cookie.indexOf(search);

    if (offset != -1) {
      offset += search.length;
      end = cookie.indexOf(";", offset);

      if (end == -1) {
        end = cookie.length;
      }

      setStr = unescape(cookie.substring(offset, end));
    }
  }

  return setStr;
}
