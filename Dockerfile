FROM node:alpine AS build

WORKDIR /path/to/Riu-Frontend-Ricard-Vidal

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build dist/riu-frontend-ricard-vidal /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]