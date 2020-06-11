# notification-homepage

## Steps for changing the homepage

Any changes to the [Notify homepage](https://notification.alpha.canada.ca/) should be made here first. The process for making an update is as follows:

1. `npm install`, `npm start`
2. make your edits to src/index.html, src/style.css, src/main.js, etc.
3. preview your changes [locally](http://localhost:8080/)
4. once you are happy, run `npm build`
5. copy the new style file over to notification-admin: `cp src/style.css ../notification-admin/app/assets/stylesheets/homepage.css`
6. copy your new markdown over into the file notification-admin/app/templates/views/signedout.html (don't replace the file, just modify it... I think)
7. make sure your changes work in admin by running it locally
8. submit PRs to both notification-homepage and notification-admin


## Steps to change the signed in nav

The styles for this can be found in a certain branch - ask timarney.