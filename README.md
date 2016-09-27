# StoryShop - The Application

## Tests

End-to-end testing is powered in part by [BrowserStack](https://www.browserstack.com/), thanks to their support of Open Source projects.

## License

MIT

## Installation

First you need to update your `/etc/hosts` file to include `dev.storyshopapp.com`, like so:

```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1       localhost dev.storyshopapp.com
255.255.255.255 broadcasthost
::1             localhost
```

Update the in your API `fixtures/users.json` file to include yourself. Make sure you include a unique ID. Also go ahead and add yourself as the owner of a world.

Then run the following commands to install your dependencies, seed the database, and run the app in dev mode.

```bash
$ npm install
$ npm run dev
```

Then access the site on `dev.storyshopapp.com:8888`

## Contributing

Check out our [getting started guide](docs/getting_started_guide.md) to learn more about the file structure, routing, and component architecture.
