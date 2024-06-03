# autobalta_cleaner

A CLI application to clean up expired data in an OpenCart-based shop.

This real-world application demonstrates the capabilities of the Tequila Framework for developing backend applications.

This application connects to MySQL/MariaDB and cleans expired data from the following tables:

* oc_latakko_api_log
* oc_latakko_api_queue
* oc_latakko_log
* oc_session

A cron job runs the application daily.

## Installation

```shell
$ git clone https://github.com/flancer64/autobalta_cleaner.git
$ cd autobalta_cleaner
$ npm install
```

## Configuration

```shell
$ cd ./cfg
$ cp init.json local.json
$ nano local.json
{
  "@teqfw/db": {
    "client": "mysql",
    "connection": {
      "database": "...",
      "host": "127.0.0.1",
      "password": "...",
      "user": "..."
    }
  },
  "@teqfw/core": {
    "devMode": false
  }
}
```

## Usage

```shell
$ ./bin/tequila.mjs app-clean

```