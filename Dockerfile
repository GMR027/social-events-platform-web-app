FROM node:14-alpine
FROM nginx:1.21.3-alpine

ENV APP_FOLDER="social-event-platform-web-app" \
    REACT_APP_PRODUCTION="true" \
    PUBLIC_URL="" \
    REACT_APP_API_URL="https://api.social-events.iguzman.com.mx/v1/" \
    REACT_APP_BRANCH_NAME={branchName} \
    ENV={ENV} \
    REACT_APP_FACEBOOK_APP_ID="dwedwfj-facebook-id-test"

WORKDIR /home/app
COPY . ./
RUN ls -a

RUN npm i
RUN npm run build

RUN rm -rf node_modules
RUN ls -a
RUN npm i --production

RUN npm run prepare-index

CMD ["node", "/home/app/server/app.js"]
