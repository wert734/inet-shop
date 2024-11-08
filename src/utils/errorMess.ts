export function errorMess(error:any, type?: string): string {
    let response = error.response?.data;
    // console.log(response);
    let text = '';
    for (const key in response) {
       if(key) {
        if (type == 'login') {
            text += ' ' + response[key]
        } else {
            text += ' ' + response[key][0]            
        }
       }
    }
    return text
}