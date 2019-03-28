function postResponse(formData, page) {
    var param = "";
    for (var propertis in formData) {
        param += param ? ("&" + propertis + "=" + encodeURIComponent(formData[propertis])) : (propertis + "=" + encodeURIComponent(formData[propertis]));
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", page, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) {
            var obj = JSON.parse(xhr.responseText);
            if (xhr.status == 200) {
                localStorage.setItem("token", obj.token);
                switch (page) {
                    case "/register" :
                        alert("Регистрация успешна");
                        break;
                    case "/input" :
                        alert("Вход успешен");
                        break
                }
                document.location.href = "/profile";
            }
            else
                alert(obj.error);

        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(param);
}

function postRequest(formData, page, del) {
    var param = "";
    for (var propertis in formData) {
        param += param ? ("&" + propertis + "=" + encodeURIComponent(formData[propertis])) : (propertis + "=" + encodeURIComponent(formData[propertis]));
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", page, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (del)
                    localStorage.removeItem("token");
                switch (page) {
                    case "/profile" :
                        alert("Данные изменены");
                        break;
                    case "/delete" :
                        alert("Профиль удален");
                        localStorage.removeItem("token");
                        document.location.href = "/register";
                        break;
                }
            }
            else
                alert(obj.eror);
        }
    }
    xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(param);
}