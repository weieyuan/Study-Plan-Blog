var port;
this.onmessage = function (event) {
    if (event.data == "init") {
        port = event.ports[0];
        port.onmessage = function (event) {
            console.log("Worker2 receive message from port: " + event.data);
        }
    }
};