import { checkNetworkConnection } from "../webService/NetworkCheck";

export default function graphQLRequest(variables, apiName, apiMethod, token) {
     const baseUrl = "http://192.168.0.1:3000/";
   
    //console.log("URL : " + baseUrl + apiName);

    return checkNetworkConnection().then((networkStatus) => {
        console.log("Network Status : " + networkStatus);
        if (networkStatus) {
            var init = apiMethod == "GET" ? {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': token ? "JWT " + token : ""
                },
            } :
                {
                    method: apiMethod,
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': token ? "JWT " + token : ""
                    },
                    body: JSON.stringify(variables)
                }
            console.log("api ", baseUrl + apiName);
            console.log("variables",variables);
            return fetch(baseUrl + apiName, init)
                .then(res => res.json()
                    .then(data => {

                        var apiData = {
                            status: res.status,
                            data: data
                        }

                        console.log("init   " + init.body + "api Name==>>" + apiName + "API Data ==>" + JSON.stringify(apiData));
                        return apiData;

                    }))
                // .then(response => response.json()
                //     .then(responseData => {
                //         //console.log("API response data===>", JSON.stringify(responseData))
                //         return responseData;
                //     }))
                .catch(err => {
                    return { "data": { "responseCode": 1000, responseMessage: "Server not responding. Please try again after some times." } }
                });

        } else {
            
            var init = apiMethod == "GET" ? {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': token ? "JWT " + token : ""
                },
            } :
                {
                    method: apiMethod,
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': token ? "JWT " + token : ""
                    },
                    body: JSON.stringify(variables)
                }
                console.log("api ", baseUrl + apiName);
                console.log("variables",variables);
            return fetch(baseUrl + apiName, init)
                .then(res => res.json()
                    .then(data => {

                        var apiData = {
                            status: res.status,
                            data: data
                        }

                        console.log("body   " + init.body + "api Name==>>" + apiName + "API Data ==>" + JSON.stringify(apiData));
                        return apiData;

                    }))
                .catch(err => {
                    return { "data": { "responseCode": 1000, responseMessage: "Network unavailable. Please connect to a Wi-Fi or cellular network." } }
                });
        }
    },
        reject => {
            alert("reject: " + reject);
        }
    ).catch((e) => {
        //console.log("Errorin Fetching Network status" + e)
    })

};




