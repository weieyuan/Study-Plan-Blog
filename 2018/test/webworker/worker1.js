var port;
this.onmessage = function (event) {
    if (event.data == "init") {
        port = event.ports[0];
    }
    else if (event.data == "send") {
        //do sth
        port.postMessage("Message from worker1");
    }
};