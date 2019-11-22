import { checkNetworkConnection } from "../webService/NetworkCheck";

export default function graphQLRequest(variables, apiName, apiMethod, token) {
     const baseUrl = "http://192.168.0.1:3000/";
    // const baseUrl = "http://Ac4-le902-793026-1A6M2-65.vp-1.compute.amazonaws.com:3000/"
    // const baseUrl = "http:/12312222222.20:300/"    // New staging url
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

















// export default function graphQLRequest(variables, method, apiMethod, token) {
//     const siteUrl = "http://172.16.6.11:8090/";
//     // const siteUrl = "http://ec2-52-76-162-65.ap-southeast-1.compute.amazonaws.com:8090/"
//     var init = apiMethod == "GET" ? {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': token ? "JWT " + token : ""
//         },
//     } :
//         {
//             method: apiMethod,
//             headers: {
//                 'Content-Type': "application/json",
//                 'Authorization': token ? "JWT " + token : "",
//             },
//             body: JSON.stringify(variables)
//         }

//     //console.log("URL ==> " + siteUrl + method + JSON.stringify(variables))

//     return fetch(siteUrl + method, init)
//         .then(res => res.json().then(data => {
//             //console.log("API Data ==>" + JSON.stringify(data));
//             // if (res.status == 200 || res.status == 201) {
//             var apiData = { 
//                 status: res.status,
//                 data: data
//             }
//             return apiData;

//         }))
//         .catch(err => {
//             //console.log("err" + JSON.stringify(err))
//             //alert("server not responding. Please try again.");
//             return error = { "data": { "responseCode": 1000 } }

//         });
// };