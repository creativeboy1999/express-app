CURRENT_DIR=$(shell pwd)

APP=$(shell basename ${CURRENT_DIR})

-include .env

POSTGRESQL_URL='postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?sslmode=disable'


run:
	yarn dev


build-prod:
	git checkout main && \
	git pull origin main && \
	docker compose --env-file .env.prod --project-name mohirdev -f "docker-compose.yml" up -d --build 

down-prod:
	docker compose --env-file .env.prod --project-name mohirdev -f "docker-compose.yml" down

build-dev:
	git checkout dev && \
	git pull origin dev && 
	docker compose --env-file .env.dev --project-name dev-mohirdev -f "docker-compose.yml" up -d --build 

docker-prune:

.DEFAULT_GOAL:=run
