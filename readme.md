0) Enlaces https://atmospherejs.com/

github
…or create a new repository on the command line


echo "# rocket-shop" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/amartelr/rocket-shop.git
git push -u origin master

---


```
mkdir server; mkdir client; mkdir public; mkdir lib
touch settings.json
touch settings.development.json
mkdir client/stylesheets; mkdir client/templates; mkdir client/scripts; mkdir client/app
```

* [/lib] - access everywhere
* [/server] - no access from browser
* [/client] - can't run on server
* [/public] - images and assets (though not neccesary stylesheets)

```
touch client/templates/app/layout.html
touch client/stylesheets/app.css
```
Le pegamos el fuente html de la página http://getbootstrap.com/examples/starter-template/ y eliminamos fuente de más y
el css


> https://github.com/twbs/bootstrap

meteor add twbs:bootstrap
```
mkdir client/templates/_partials
touch client/templates/_partials/nav.html
```

2) iron-router

> https://github.com/iron-meteor/iron-router

```
meteor add iron:router
```

```
touch lib/router.js
```
> Couldn't find a template named "layout" or "layout". Are you sure you defined it?
> tenemos que poner las directivas de template en layout.html y eliminar head y body
> el titulo lo ponemos en otro fichero

```
touch client/main.html
```

3) iron-router 2

```
touch client/templates/app/404.html
```
> copiamos de http://bootsnipp.com/snippets/featured/simple-404-not-found-page
> excluimos el primer div <div class="container"> y añadimos el css sin el body

```
touch client/templates/app/loading.html
```
> En lugar de copiar una plantilla vamos a https://atmospherejs.com/

meteor add pcel:loading

```
touch client/templates/app/loading.js
```
Que lo copiamos de su ejemplo además de css

Ahora tenemos que poner en el layout {{>yield}} por el div de starter-template
y definimos las rutas en router.js.
    

```
mkdir client/templates/home
touch client/templates/home/index.html
```

>Probamos la funcionalidad de data de iron-route
>Añadimos el resto de rutas

```
touch client/templates/home/about.html
touch client/templates/home/contact.html
```

> Tenemos que corregir los link del navegador con la instrucción {{pathFor 'homeIndex'}}

4) favicon en : 
http://www.danstools.com/
http://www.favicon-generator.org/
y los ponemos en la carpeta de icon

```
mkdir public/images
mkdir public/images/icon
```

```
mkdir public/images/products
mkdir public/images/splash
mkdir public/images/vendors
```

5) favicon 2

```
touch client/favicons.html
```

>Con el fichero generado por la página web con esta ruta href="/images/icon/apple-icon-57x57.png">
> Este fichero será injectado en main.html


6) HomePage
https://github.com/robconery/meteor-shop
https://github.com/robconery/meteor-shop/tree/master/pluralsight/snippets
> Arreglamos la página de index copiado de github y añadimos css

```
touch client/stylesheets/home.css
touch client/stylesheets/product-tile.css
```

7) Datos

```
mkdir lib/collections
touch lib/collections/products.js
touch lib/collections/users.js
touch client/templates/home/index.js
```

8) Accounting.js para formatear
http://openexchangerates.github.io/accounting.js/
http://momentjs.com/
MARKDOWN HTML https://github.com/showdownjs/showdown

> incluir las librerías javascript en /client/scripts

accounting.min.js
knockout-3.3.0.js
moment.min.js
showdown.min.js
stripe_checkout.js

```
touch client/main.js
touch client/templates/_partials/product_tile.html
```

9) Product Page

```
mkdir client/templates/products
touch client/templates/products/show.html
```

Como uno de los registro tiene codigo markdown lo registramos en main.js


UI.registerHelper("markdown", function(text){
    var converter = new showdown.Converter();
    return converter.makeHtml(text);
});

<p class="lead">{{{markdown description}}}</p>
