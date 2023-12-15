# Strapi Configured for Dokku
## **Desctiption**

See www.blgerber.com for an example in action. The server for this website is built using a self hosted Headless CMS (Strapi) deployed on Digital Ocean using Dokku. It allows content management for the photos in the galleries and the text in the about section. The frontend was built using React and Tailwind by my awesome wife [Thu Smiley](https://github.com/thusmiley).

## **Technologies**
1. Strapi (Headless CMS)
2. Digital Ocean Droplet (VPS)
3. Dokku (self hosted paas built on Docker and Nginx)
4. Let's Encrypt (SSL)
5. Node.js (for backup script)
6. Amazon S3 (for backup storrage)
7. Cron jobs (for scheduling backups)
8. Git and Github (for seamless pushes from local to testing and production)

## **Setup**
For information on setting up a fresh Digital Ocean Droplet with Dokku, see [this](https://medium.com/@brenden-naughty-cat/how-to-set-up-a-digital-ocean-droplet-for-dokku-123633536a17) article.

For information on setting up this strapi project on Dokku, see [this](https://medium.com/@brenden-naughty-cat/how-to-set-up-strapi-headless-cms-using-dokku-b71e6467b8b9) article.

## **Features of Strapi**
1. Headless CMS allows for simple content management without sacrificing the frontend which can be built using any technologies you wish.
2. Selfhosted version is free and open source.

## **Features of Dokku**
1. Leverages buildpacks to automatically set up your environment based on the technologies you built the app with.
2. Deploys sites with zero downtime by automatically creating a new container with the updated build before destroying the previous.
3. Allows for hosting multiple sites on a single VPS.
4. Makes configuring an Nginx reverse proxy trivial.
5. Supports Let's Encrypt auto renewal for SSL.

## **Features of this Strapi Configuration**
1. Integrates with Github using Github actions builds the site whenever changes are pushed to the remote Github repo.
2. Takes advantage of pm2 to ensure crashed processes are restarted.
3. Uses a custom script run with a pre configured cron job to automatically save backups for 30 days in an AWS S3 bucket with support for email notifications in the event of any errors/failures.
4. Connects to a postgres database to store your content types etc.



