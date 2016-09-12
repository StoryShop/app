# StoryShop - The Application

## Tests

End-to-end testing is powered in part by [BrowserStack](https://www.browserstack.com/), thanks to their support of Open Source projects.

## License

MIT

## API Repo

Though it is not a requirement in order to install & run the code in this frontend `app` repo, there is a backend `api` at [https://github.com/StoryShop/api](https://github.com/StoryShop/api) that should be installed & running first if one wants to spin up the _complete_ application.

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

Then run the following commands to install your dependencies and run the app in dev mode.

```bash
$ npm install
$ npm run dev
```

Then access the site on `dev.storyshopapp.com:8888`

## Contributing

Check out our [getting started guide](docs/getting_started_guide.md) to learn more about the file structure, routing, and component architecture.
