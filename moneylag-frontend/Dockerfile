FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine

# Install envsubst
RUN apk add --no-cache gettext

# Copy build
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx template
COPY ../nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["/bin/sh", "-c", \
     "envsubst '$$BACKEND_SERVICE' \
      < /etc/nginx/templates/default.conf.template \
      > /etc/nginx/conf.d/default.conf && \
      nginx -g 'daemon off;'"]
