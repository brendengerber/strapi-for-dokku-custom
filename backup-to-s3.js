//Script to backup strapi server to s3 and send email in case of error
//See README.md for instructions to configure environment variables

//Imports necessary modules
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');
const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");
const nodemailer = require('nodemailer');
require('dotenv').config();


//Creates the s3Client to upload files
const s3Client = new S3Client({region: "us-east-2", credentials: {accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY}});

try{
    //Creates a child process to run the export command to make a back up of Strapi
    execSync("npm run strapi export -- --no-encrypt");

    //Sets the path where the backup is, and the extension to search for
    const directoryPath = __dirname;
    const extension = '.gz';
        
    //Finds the matching file names
    const fileNames = fs.readdirSync(directoryPath); 
    const matchingFileNames = fileNames.filter(file => path.extname(file) === extension);

    //Throws an error if the strapi backup failed to complete
    if(matchingFileNames.length < 1){
        throw new Error('Strapi backup failed to complete!')
    };
        
    for(let fileName of matchingFileNames){
            
        //Sets the file that will be uploaded
        const file = fs.readFileSync(path.join(__dirname, `/${fileName}`));
        
        //Uploads the file to s3
        const command = new PutObjectCommand({Bucket: process.env.AWS_BUCKET_NAME, Key: fileName, Body: file});
        s3Client.send(command);

        //Deletes the file from local after successful upload to the S3 bucket
        fs.unlinkSync(path.join(__dirname, `/${fileName}`));   
    }

}catch(err){    
    //Sends an email in case of failure if email credentials have been configured in environment variables
    if(process.env.BACKUP_NOTIFICATION_SENDER_EMAIL){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.BACKUP_NOTIFICATION_SENDER_EMAIL,
                pass: process.env.BACKUP_NOTIFICATION_EMAIL_SENDER_PASSWORD
            }
        });

        let mailOptions = {
            from: {
                name: process.env.BACKUP_NOTIFICATION_SENDER_NAME || ' ',  
                address: process.env.BACKUP_NOTIFICATION_ALTERNATE_SENDER_EMAIL || process.env.BACKUP_NOTIFICATION_SENDER_EMAIL
            },
            to: process.env.BACKUP_NOTIFICATION_DESTINATION_EMAIL,
            subject: `Error backing up to ${process.env.AWS_BUCKET_NAME} S3 bucket`,
            text: err.message
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log("error here", error);
            }else{
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
