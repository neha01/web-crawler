# website-crawler
A Node JS program to crawl a website and fetch all its hyperlinks recursively and store it in db

# Installation
Clone the repository and install dependencies by running below command
git clone https://github.com/neha01/website-crawler.git && cd website-crawler && npm i

Install Mongodb and run it on localhost.

# Running the program
npm start
Above command will start scraping the website whose Url is provided in config file and will open up maxConnections set in config file.(default is set to 5 max connections and website: https://medium.com/ )