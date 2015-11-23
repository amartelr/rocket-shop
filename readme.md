A) 

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

10) deploy

https://www.meteor.com/account-settings

```
meteor deploy mi-rocket-shop
```

B) AUTHENTICATION

1) Setup

https://atmospherejs.com/

```
meteor add ian:accounts-ui-bootstrap-3
meteor add accounts-password
```

añadimos la plantilla de login
```
<ul class="nav navbar-nav navbar-right">
            {{> loginButtons}} <!-- here -->
</ul>
```

> nos da el error No login services configured

```
meteor add accounts-password
```

Ahora podemos ver desde la consola del navegado una vez logeo 
Meteor.user()

2) Configuration 
Accounts
http://docs.meteor.com/#/full/accounts_api
Accounts Config
http://docs.meteor.com/#/full/accounts_config

```
mkdir client/config
touch client/config/accounts.js
```


3) github, google auth

# meteor add accounts-github
meteor add accounts-google

> https://console.developers.google.com/

First, you'll need to get a Google Client ID. Follow these steps:

Visit https://console.developers.google.com/
"Create Project", if needed. Wait for Google to finish provisioning.
On the left sidebar, go to "APIs & auth" and, underneath, "Consent Screen". Make sure to enter an email address and a product name, and save.
On the left sidebar, go to "APIs & auth" and then, "Credentials". "Create New Client ID", then select "Web application" as the type.
Set Authorized Javascript Origins to: http://localhost:3000/
Set Authorized Redirect URI to: http://localhost:3000/_oauth/google
Finish by clicking "Create Client ID".

4) Role Authorization
>update failed: Access denied


```
meteor mongo
db.users.remove({_id:"n5tuAYQbky4RDhJ5j"});
db.users.remove({_id:"gBLvcrntAFyf6wwra"});
```

meteor add alanning:roles
meteor remove autopublish

Desde la consola
```
meteor mongo
db.users.update({_id : "KKs4ZAakZjrSftE82"}, {$set : {roles : ["Administrator"]}})
```

C) 



1)   Product Collections

https://www.discovermeteor.com/blog/meteor-and-security

```
touch server/seeds.js
```

Products.featured().fetch()


2) Restricting Fields

Clean Mongo
```
meteor reset
```
We want to hide cost and iventory fields
```
Products.featured = function(){
    var featuredSkus = ["honeymoon-mars","johnny-liftoff","one-way-reentry"];
    return Products.find({sku : {$in : featuredSkus}},
        {fields : {inventory : false, cost : false}});
```
        
>from console: Products.featured().fetch()

> Debemos procurar que no cambien los datos por ejemplo 
Products.update({_id : "dFQR6vMDCNYaC3jN5"}, {$set : {price : 100}})
        
3) Using Allow (inherent security issues)
http://docs.meteor.com/#/full/allow

```
touch lib/permissions.js
```

from console test y comprobamos que no tenemos usuarios:
```
isAdmin();
Meteor.users.find().fetch();
```
Para ello pondremos usuarios por defecto en seeds.js, para ello 
reiniciaremos meteor.

```
meteor reset
```
4) The insecure Package (insecure, autopublish)
 

Default packages list
```
meteor list
meteor remove insecure
```
5) Adding Vendors

```
touch lib/collections/vendors.js
mkdir client/templates/vendors
touch client/templates/vendors/show.html
touch client/templates/vendors/show.js
```
> Hay que cargarlos por el fichero seed.js


meteor reset

> añadimos a la plantilla

```
  {{#with vendor}}
                <p><a href="{{pathFor 'vendor'}}">{{name}}</a></p>
  {{/with}}
```  
    
6) ORM

https://github.com/jagi/meteor-astronomy
https://github.com/Exygy/minimongoid
https://github.com/dburles/meteor-collection-helpers
https://github.com/emmerge/graviton

7) Namespacing in Meteors is hard.
http://info.meteor.com/blog/meteor-065-namespacing-modularity-new-build-system-source-maps
https://medium.com/meteor-js/meteor-managing-the-global-namespace-5a50080a05ea#.w60tnzfzm
Each app or package gets its own namespace. Use global variables as much as you want: Meteor generates a wrapper around your code so that they are "global" only to the app or package that defined them


```
touch lib/init.js
```

Load Order:
 /lib
 /server
 /client
 /Meteor.startup()
 *main*
 
 
 D) TESTING
 
 1) Testing Setup
 
 https://github.com/meteor-velocity/velocity
 https://github.com/mad-eye/meteor-mocha-web/
 
 ```
 meteor add mike:mocha
 ```
 [velocity] You can see the mirror logs at: tail -f .meteor/local/log/mocha.log
 
 >Click Add moka simple test from website
 > this create a 2 test folder into de proyect (client/server)
 
 
 
 