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