FROM node:alpine AS build

WORKDIR /home/rick/Programs/Riu-Frontend-Ricard-Vidal

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /home/rick/Programs/Riu-Frontend-Ricard-Vidal/dist/riu-frontend-ricard-vidal /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]