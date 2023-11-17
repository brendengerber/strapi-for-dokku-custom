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
---

## **Setup**
Link to medium articles here. One on setting up DO. One on setting up Strapi on DO.

## **Features**
1. Zero downtime deoploys (Dokku builds a new container of the updated build before destroying the previous).
2. Seemless integration with git builds the production or testing site when changes are pushed to the remote Github repo.
3. Strapi headless CMS for content management.
4. Custom script run with a cron job to automatically save backups for 30 days in an Amazon s3 bucket and send email notification on a failed backup attempt.

