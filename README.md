# File Server

The structure of "Monolithic Repositors" is being used. It is a file service for handling files while maintaining low connectivity with API servers using Kafka.

## Before Start

.yarn: Use "yarn berry"(v3.8.1) to use monorepo

```bash
# install dependencies
$ yarn install

# Kafka container start
$ docker-compose -f ./docker/docker-compose.dev.yml up -d
```

## Running

```bash
# Main server
$ yarn storage {command}

# Resizing server
$ yarn resize {command}

# Cache server
$ yarn file:cache {command}

# Docker Dev Server
$ docker compose -f docker/apps/docker-compose.dev.yml up -d
```

## Features

- Upload/Delete/Get Image
- Resizing Image
- Caching Image
- To be added,,,

## TODO

### Image

- [x] Upload, Get, Delete -> app folder
- [x] Caching -> cache folder
- [x] Resizing -> resize folder

### Video

- [ ] Upload, Get, Delete
- [ ] Caching
- [ ] Resizing
- [ ] Streaming(Not sure)

### ETC

- [ ] If there is any additional service you want to implement, please write it in the Issue tab.

## Document

Please refer to the Notion link below for explanations such as architecture and trial and error.(Language: 한국어)

Notion: <https://stormy-lighter-fb5.notion.site/File-Server-a01136fb954b4a8180b33ed483e61a2d?pvs=4>
