app.services = {
    tasks: {
        create: function(data) { 
            var itemList = ons.createElement(
                '<ons-list-item tappable>' +
                '<div class="center">' +
                data.title +
                '</div>' +
                '</ons-list-item>'
            );
    
            //guarda o objeto de dados no elemento
            itemList.data = data;
    
            //adiciona funcionalidade de push page no item da lista para exibir os detalhes
            itemList.querySelector('.center').onclick = function() {
                document.querySelector('#navigator')
                .pushPage(
                    'html/details.html',
                    {
                        animation: 'lift',
                        data: {
                            element: itemList
                        }
                    }
                );
            };
    
            // Insert urgent tasks at the top and non urgent tasks at the bottom.
            var list = document.querySelector('#list');
            list.insertBefore(itemList, list.firstChild);
        },
        getList: function() {            
            var list = 
            [
                {
                    title: 'QR Code 1',
                },
                {
                    title: 'QR Code 2',
                },
                {
                    title: 'QR Code 3',
                },
                {
                    title: 'QR Code 4',
                },
                {
                    title: 'QR Code 5',
                },
                {
                    title: 'QR Code 6',
                },
                {
                    title: 'QR Code 7',
                },
                {
                    title: 'QR Code 8',
                },
                {
                    title: 'QR Code 9',
                },
                {
                    title: 'QR Code 10',
                },
                {
                    title: 'QR Code 11',
                },
                {
                    title: 'QR Code 12',
                },
                {
                    title: 'QR Code 13',
                },
                {
                    title: 'QR Code 14',
                },
                {
                    title: 'QR Code 15',
                },                                                                                                                
            ];
            return list;
        },        
    },  
};