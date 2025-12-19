# 1단계: Build (AWS Public ECR 사용)
# ▼ 주소 변경: node:20 -> public.ecr.aws/docker/library/node:20
FROM public.ecr.aws/docker/library/node:20 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: Run (Nginx) (AWS Public ECR 사용)
# ▼ 주소 변경: nginx:alpine -> public.ecr.aws/docker/library/nginx:alpine
FROM public.ecr.aws/docker/library/nginx:alpine

# 빌드된 리액트 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 설정 파일 덮어쓰기
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]