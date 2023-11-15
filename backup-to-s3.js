// //To use this script set the environment variables AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_BUCKET_NAME
// //Optionally you can include an environment variable where backup logs will be sent if there is any errors

// //Imports necessary modules
// const fs = require('fs');
// const path = require('path');
// const {execSync} = require('child_process');
// const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");

// //Creates the s3Client to upload files
// const s3Client = new S3Client({region: "us-east-1", credentials: {accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY}});

// try{
//     //Creates a child process to run the export command to make a back up of Strapi
//     execSync("npm run strapi export -- --no-encrypt");

//     //Sets the path where the backup is, and the extension to search for
//     const directoryPath = __dirname;
//     const extension = '.tar.gz';
        
//     //Finds the matching file names
//     const fileNames = fs.readdirSync(directoryPath); 
//     const matchingFileNames = fileNames.filter(file => path.extname(file) === extension);
        
//     for(let fileName of matchingFileNames){
            
//         //Sets the file that will be uploaded
//         const file = fs.readFileSync(path.join(__dirname, `/${fileName}`));
        
//         //Uploads the file to s3
//         const command = new PutObjectCommand({Bucket: process.env.AWS_BUCKET_NAME, Key: fileName, Body: file});
//         s3Client.send(command);

//         //Deletes the file from local after successful upload to the S3 bucket
//         fs.unlinkSync(path.join(__dirname, `/${fileName}`));   
//     }

// }catch(err){
//     if(process.env.BACKUP_NOTIFICATION_EMAIL){

//     }
// }

const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
  });
  transporter.sendMail({
    from: 'sender@example.com',
    to: 'brendengerber@gmail.com',
    subject: 'Test',
    text: 'I hope this message gets delivered!'
  }, (err, info) => {
    console.log(err)
    console.log(info)
  });




   
