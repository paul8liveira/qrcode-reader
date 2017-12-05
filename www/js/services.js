app.services = {
    tasks: {
        create: function(data) { 
            var itemList = ons.createElement(
                '<ons-list-item tappable>' +
                '<div class="center">' +
                data.text +
                '</div>' +
                '<div class="right">' +
                '<ons-icon style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
                '</div>' +                
                '</ons-list-item>'
            );
    
            //guarda o objeto de dados no elemento
            itemList.data = data;

            itemList.querySelector('.right').onclick = function() {
                app.services.tasks.delete(itemList);
            };            
    
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

            var list = document.querySelector('#list');
            list.insertBefore(itemList, list.firstChild);
        }, 
        update: function(element, data) {
            if (data.text !== element.data.text) {
                element.querySelector('.center').innerHTML = data.text;
            }               
            element.data = data;
            app.sqlite.update(data);
        },          
        delete: function(item) {
            app.services.animators.remove(item, function() {
              item.remove();
              app.sqlite.delete(item.data.id);
            });
        },                
    },  
    animators: {        
        swipe: function(listItem, callback) {
            var animation = (listItem.parentElement.id === 'pending-list') ? 'animation-swipe-right' : 'animation-swipe-left';
            listItem.classList.add('hide-children');
            listItem.classList.add(animation);

            setTimeout(function() {
            listItem.classList.remove(animation);
            listItem.classList.remove('hide-children');
            callback();
            }, 950);
        },
        remove: function(listItem, callback) {
            listItem.classList.add('animation-remove');
            listItem.classList.add('hide-children');

            setTimeout(function() {
            callback();
            }, 750);
        }
    },    
};