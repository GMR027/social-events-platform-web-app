#! /bin/bash

file_name="";
file_name_alone="";

echo "Enter DNS (www.example.com):";
read dns;
if [ ! -n "$dns" ]
then
	echo "Error: DNS variable not provided, i.e.: www.example.com";
    exit 1;
fi

echo "Enter Folder name (my-web-app):";
read folder;
if [ ! -n "$folder" ]
then
	echo "Error: folder variable not provided, i.e.: my-web-app";
    exit 1;
fi

echo "Enter API port (4010):";
read port;
if [ ! -n "$port" ]
then
	echo "Error: api port variable not provided, i.e.: 4030";
    exit 1;
fi

echo "Enter environment (staging):";
read envt;
if [ ! -n "$envt" ]
then
	echo "Error: environtment not provided, i.e.: staging";
    exit 1;
fi

echo "Enter API DNS (api.example.com):";
read api;
if [ ! -n "$api" ]
then
	echo "Error: environtment not provided, i.e.: api.example.com";
    exit 1;
fi

process_name=$folder"-"$envt;

# ============ Functions ============
# $1 type -> nginx / supervisor
PopulateFile () {
    file_name="deploy/$dns.$1.conf";
    file_name_alone="$dns.$1.conf";
    if [ "$1" == "env" ]
    then
        file_name="deploy/$folder-$envt.env";
    fi
    cp "deploy/$1.conf" $file_name;
    chmod 775 $file_name;
    sed -i "s/PORT_/$port/g" $file_name;
    sed -i "s/DNS/$dns/g" $file_name;
    sed -i "s/ENVT/$envt/g" $file_name;
    sed -i "s/FOLDER/$folder/g" $file_name;
    sed -i "s/API_URL_/$api/g" $file_name;
    sed -i "s/PROCESS_NAME/$process_name/g" $file_name;
}

echo "Create Nginx configuration? (y/n)";
read create;

if [ "$create" == "y" ]
then
	PopulateFile "nginx";
    echo "======================================";
    echo "$file_name:";
    cat $file_name;
    echo "======================================";
    echo "Deploy Nginx configuration? (y/n)";
    read deploy;
    if [ "$deploy" == "y" ]
    then
        sudo cp ./$file_name /etc/nginx/sites-available/;
        sudo ln -s /etc/nginx/sites-available/$file_name_alone /etc/nginx/sites-enabled/;
        sudo nginx -t;
        sudo service nginx restart;
    fi
    echo "Delete Nginx configuration? (y/n)";
    read delete_file;
    if [ "$delete_file" == "y" ]
    then
        rm "$file_name";
    fi
fi

echo "Create Supervisor configuration? (y/n)";
read create;
if [ "$create" == "y" ]
then
    PopulateFile "supervisor";
    echo "======================================";
    echo $file_name;
    cat $file_name;
    echo "======================================";
    echo "Deploy Supervisor configuration? (y/n)"
    read deploy;
    if [ "$deploy" == "y" ]
    then
        sudo cp $file_name /etc/supervisor/conf.d/;
        sudo supervisorctl reread;
        sudo supervisorctl update;
        sudo supervisorctl status;
    fi
    echo "Delete supervisor configuration? (y/n)";
    read delete_file;
    if [ "$delete_file" == "y" ]
    then
        rm $file_name;
    fi
fi

echo "Done";
exit 0;
