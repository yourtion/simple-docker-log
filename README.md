# simple-docker-log
Simple Docker logger, save docker log to file use syslog driver

## use

On docker-compose use `driver: syslog` to send log.

```yml
version: "3"

services:
  app:
    network_mode: bridge
    logging:
      driver: syslog
      options:
        syslog-address: "udp://xxx:514"
```
