
*Compilar o projeto*
gulp build

*Criar container nginx*
docker run -it --name siteCFC -p 80:80 -v $PWD/dist/:/usr/share/nginx/html/ zalari/nginx-html5

