import fetch from 'isomorphic-fetch'

export const FetchUtil = {
    checkStatus(response){
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            //Response {type: "basic", url: "http://localhost:8080/login", status: 404, ok: false, statusText: "Not Found"…}
            var error = new Error('Code ' + response.status + ' / ' + response.statusText)
            error.response = response
            throw error
        }
    },
    parseJSON(response) {
        return response.json()
    }
}