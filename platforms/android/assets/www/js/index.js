document.addEventListener('init', function(event) {
    var page = event.target;
    if (page.matches('#index')) {
        
        page.querySelector('ons-toolbar .center').innerHTML = 'QR Code Reader';
        
        page.querySelector('ons-button').onclick = function() {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    ons.notification.alert( "Text: " + result.text + "\n" +
                                            "Format: " + result.format + "\n" +
                                            "Cancelled: " + result.cancelled);
                    x = result;
                },
                function (error) {
                    ons.notification.alert("Error: " + error);
                    x = error;
                },
                {
                    showTorchButton : true, 
                    prompt : "Coloque o QR Code dentro da area de escaneamento", 
                    formats : "QR_CODE",
                }
             );    
        };
    }
});