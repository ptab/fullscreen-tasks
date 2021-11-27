export function get(url, handleSuccess, handleError) {
    fetch(url, {
        method: "GET"
    })
        .then(toJson)
        .then(
            result => handleSuccess(result),
            error => onError(error, handleError)
        )
}

export function post(url, data, handleSuccess, handleError) {
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    })
        .then(toJson)
        .then(
            result => handleSuccess(result),
            error => onError(error, handleError)
        )
}

export function patch(url, data, handleSuccess, handleError) {
    fetch(url, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    })
        .then(toJson)
        .then(
            result => handleSuccess(result),
            error => onError(error, handleError)
        )
}

export function del(url, handleSuccess, handleError) {
    fetch(url, {
        method: "DELETE"
    })
        .then(
            result => handleSuccess(result),
            error => onError(error, handleError)
        )
}

function toJson(result) {
    if (result.status === 200) {
        return result.json()
    } else {
        console.error(`Received response with status ${result.status} ${result.statusText}`)
        return result
    }
}

function onError(error, handleError) {
    console.error(error)
    handleError(error)
}