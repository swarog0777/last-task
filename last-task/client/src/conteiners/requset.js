export function makeRequest(formData, method, path, type, successful, error) {//auth-запрос c токеном, type-вопрос
    if (type === undefined) {
        var param = "";
        for (let propertis in formData) {
            if (formData[propertis] === "")
                continue;
            param += param ? ("&" + propertis + "=" + encodeURIComponent(formData[propertis])) : (propertis + "=" + encodeURIComponent(formData[propertis]));
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open(method, path, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (path === "/user")
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
    if (type || (method === "DELETE"))
        xhr.send();
    else xhr.send(param);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            if (type !== undefined) {
                switch (type) {
                    case "route" :
                        if (xhr.status === 200)
                            successful();
                        else
                            error();
                    case "user" :
                        if (xhr.status !== 200) {
                            successful();
                        }
                        else error();
                }
            }
            else {
                let obj = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    if (path === "/user") {
                        switch (method) {
                            case "PUT" :
                                successful();
                            case "DELETE" :
                                localStorage.removeItem("token");
                                successful(true);
                        }
                    }
                    else {
                        localStorage.setItem("token", obj.token);
                        successful(true);
                    }
                }
                else {
                    error(obj.message);
                }
            }
        }
    }
}
