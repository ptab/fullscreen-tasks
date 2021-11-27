export function add(arr, data) {
    let copy = arr
    copy.unshift(data)
    return copy
}

export function remove(arr, id) {
    return [
        arr.find(t => t.id === id),
        arr.filter((t) => t.id !== id)
    ]
}