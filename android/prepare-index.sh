#! /bin/bash

sed -i 's/\/static/static/g' app/www/index.html
sed -i 's/\/assets/assets/g' app/www/index.html

sed -i 's/{{seo.title}}/title/g' app/www/index.html
sed -i 's/{{seo.og_description}}/og_description/g' app/www/index.html
sed -i 's/{{seo.keywords}}/keywords/g' app/www/index.html
sed -i 's/{{seo.og_site_name}}/og_site_name/g' app/www/index.html
sed -i 's/{{seo.url}}/url/g' app/www/index.html
sed -i 's/{{seo.img_og_picture}}/img_og_picture/g' app/www/index.html
sed -i 's/{{{escapeJS data}}}//g' app/www/index.html

cat app/www/index.html

echo 'Index ready!'
