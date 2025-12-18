
# 1단계: Build
FROM node:20 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: Run (Nginx)
FROM nginx:alpine
# 빌드된 리액트 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# ⭐️ [추가된 부분] Nginx 설정 파일 덮어쓰기
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]