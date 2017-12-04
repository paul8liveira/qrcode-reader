app.controllers = {
  indexPage: function(page) {
    // app.services.tasks.getList().forEach(function(data) {
    //     app.services.tasks.create(data);
    // });                                 
    
    page.querySelector('ons-toolbar .center').innerHTML = 'QR Code Reader';

    Array.prototype.forEach.call(page.querySelectorAll('[component="button/ler-qr-code"]'), function(element) {
      element.onclick = function() {
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            ons.notification.alert( "Text: " + result.text + "\n" +
                                    "Format: " + result.format + "\n" +
                                    "Cancelled: " + result.cancelled); 
                                      
          },
          function (error) {
            ons.notification.alert("Error: " + error);
          },
          {
            showTorchButton : true, 
            prompt : "Coloque o QR Code dentro da area de escaneamento", 
            formats : "QR_CODE",
          }
        );        
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });    
  },    
};