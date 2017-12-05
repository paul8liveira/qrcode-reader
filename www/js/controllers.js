app.controllers = {
  indexPage: function(page) {
    page.querySelector('ons-toolbar .center').innerHTML = 'StartMeUp - MVP Manut.';

    Array.prototype.forEach.call(page.querySelectorAll('[component="button/ler-qr-code"]'), function(element) {
      element.onclick = function() {
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            if(result.cancelled === false) {
              var data = { text: result.text };
              app.sqlite.create(data);
            }   
          },
          function (error) {
            ons.notification.alert( "Falha no escanemento: " + error);             
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

  details: function(page) {
    var element = page.data.element;
    page.querySelector('#text-input').value = element.data.text;

    page.querySelector('[component="button/save-info"]').onclick = function() {
      var newText = page.querySelector('#text-input').value;

      if (newText) {
        ons.notification.confirm(
          {
            title: 'Salvar mudan&ccedil;as?',
            message: 'Os dados atuais ser&atilde;o sobrescritos.',
            buttonLabels: ['Descartar', 'Salvar']
          }
        )
        .then(function(buttonIndex) {
          if (buttonIndex === 1) {
            app.services.tasks.update(element,
              {
                id: element.data.id,
                text: newText
              }
            );

            document.querySelector('#navigator').popPage();
          }
        });
      } 
      else {
        ons.notification.alert('Informe um t&iacute;tulo corretamente.');
      }
    };
  }  
};