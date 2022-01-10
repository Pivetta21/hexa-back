# Hexa Back-end

## Utilizando o [Docker](https://www.docker.com/get-started)   
  \
  Para iniciar a API e o banco de dados, rode:

    docker-compose up

  \
  Para listar os containers ativos, use:
    
    docker ps

  \
  Para executar comandos dentro de algum container, use:

    docker exec -it <container_id_or_name> bash

## Migrations com [TypeORM](https://typeorm.io/#/)

  \
  Para rodar as migrations utilize dentro do container da API o seguinte comando:

    npm run migration:run

  \
  Para gerar uma migration utilize dentro do container da API o seguinte comando:

    npm run migration:generate -n <migration_name>

## Outros
  \
  IMPORTANTE! No Linux antes de iniciar o docker, rode:
  
    mkdir storage
    chown <your_user> ./storage

  \
  Para acessar o postgres do container na sua máquina local, utilize  Beekeeper Studio ou DBeaver com a seguinte url:

    postgres://user:password@localhost:35000/db

  \
  Para acessar o OpenAPI (Swagger) na sua máquina local acesse:

    localhost:8080/api

<br />

> ATENÇÃO! Link para o <a href="https://github.com/Pivetta21/hexa-front">repositório</a> do front-end.