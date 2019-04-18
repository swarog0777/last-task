export function authRequest(formData, page) {
    var param = "";
    for (var propertis in formData) {
        param += param ? ("&" + propertis + "=" + encodeURIComponent(formData[propertis])) : (propertis + "=" + encodeURIComponent(formData[propertis]));
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", page, false);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(param);
    var obj = JSON.parse(xhr.responseText);
    if (xhr.status == 200) {
        localStorage.setItem("token", obj.token);
        switch (page) {
            case "/register" :
                alert("Регистрация успешна");
                break;
            case "/login" :
                alert("Вход успешен");
                break
        }
        return true;
    }
    else {
        alert(obj.message);
        return false;
    }
}

export function userRequest(formData, method) {

    // makeRequest(method, "/user", formData,true,  function error(){}, function success(){});
    let param = "";
    for (let propertis in formData) {
        param += param ? ("&" + propertis + "=" + encodeURIComponent(formData[propertis])) : (propertis + "=" + encodeURIComponent(formData[propertis]));
    }
    var xhr = new XMLHttpRequest();
    xhr.open(method, "/user", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var obj = JSON.parse(xhr.responseText);
            console.log(typeof obj);
            if (xhr.status === 200) {
                switch (method) {
                    case "PUT" :
                        alert("Данные изменены");
                        break;
                    case "DELETE" :
                        alert("Профиль удален");
                        localStorage.removeItem("token");
                        return true;
                }
            }
            else
                alert(obj.message);
        }
    };
    xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (method === "PUT")
        xhr.send(param);
    else xhr.send();
}


export function userAuthorizationRequest(type) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/user", false);
    xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    switch (type) {
        case "route" :
            if (xhr.status === 200)
                return true;
            else
                return false;
        case "user" :
            if (xhr.status !== 200) {
                alert("Пожалуйста авторизуйтесь");
                return true;
            }
    }
}