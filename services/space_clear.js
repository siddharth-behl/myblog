export function space_rem(obj) {
    let new_data = ''
    obj.html_data.split('').forEach(element => {
        if (element != '\n') {
            new_data += element
        }

    });

    obj.html_data = new_data.trim()
    return obj


}
