const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            failure('Connection Timeout :(')
        } else {
            success(`Here is your fake data from ${url}`)
        }
    },delay)
}
//It only expects you to pass in a url, it doesn't expect a success or a failure callback, it doesn't expect callbacks to be passed in
const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
           if (delay > 4000) {
            reject('Connection Timeout :(')
           } else {
            resolve(`Here is your fake data from ${url}`)
           }
        },delay)
    })
}
//The callback method requires us to nest stuff what a nightmare
fakeRequestCallback('books.com/page1',
 function (response) {
    console.log("IT WORKED!!!!")
    console.log("response")
    fakeRequestCallback('books.com/page2',
 function (response) {
    console.log("IT WORKED AGAIN!!!!")
    console.log("response")
    fakeRequestCallback('books.com/page3',
 function (response) {
    console.log("IT WORKED AGAIN (3rd time)!!!!")
    console.log("response")

}, function (err) {
    console.log("ERROR!!! (3rd req)", err)
})
},
function (err) {
    console.log("ERROR!!! (2nd req)", err)
})
 },
 function (err) {
    console.log("ERROR!!!", err)
 })






//This is better but still requires nesting
fakeRequestPromise('yelp.com/api/coffee/page1').then(() => {
    console.log("IT WORKED!!(page 1)")
    fakeRequestPromise('yelp.com/api/coffee/page2')
    .then(() => {
        console.log("IT WORKED (page 2)")
        fakeRequestPromise('yelp.com/api/coffee/page3')
    .then(() => {
        console.log("IT WORKED (page 3)")
    })
    })
}).catch(() => {
    console.log("PROMISE REJECTED!")
    console.log("OH NO, ERROR!!!")
})


//with return we dont need to nest anything and our code looks a lot neater when making requests
fakeRequestPromise('yelp.com/api/coffee/page1')
//if it were a real request we would want the data
//the data argument retrieves data from the function above
.then((data) => {
    console.log("IT WORKED!! (page 1)")
    console.log(data)
    return fakeRequestPromise('yelp.com/api/coffe/page2')
})
.then((data) => {
    console.log("IT WORKED!! (page 2)")
    console.log(data)
    return fakeRequestPromise('yelp.com/api/coffe/page3')
})
.then((data) => {
    console.log("IT WORKED!! (page 3)")
    console.log(data)
})
.catch((err) => {
    console.log("Oh no a request failed!")
    console.log(err)
})