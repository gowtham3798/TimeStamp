import * as fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 9000;


app.get("/",(request, response)=>{
    response.send(`<h1>Type "<span style="color:blue">timestamp</span>" in the URL</h1>`)
});

const timeStamp = Date.now();
const currentDateTime = new Date(timeStamp);
const date = currentDateTime.getDate();
const month = currentDateTime.getMonth();
const year = currentDateTime.getFullYear();
const Hrs = currentDateTime.getHours();
const Mins = currentDateTime.getMinutes();
const Secs = currentDateTime.getSeconds();


const DateAndTime = (("0"+date).slice(-2))+"/"+(("0"+month+1).slice(-2))+"/"+year+"-"+Hrs+":"+("0"+Mins).slice(-2)+":"+Secs;

const backupPath = `./backup/${timeStamp}.txt`;
app.get("/timestamp",(request, response)=>{
    fs.writeFile(backupPath,(""+DateAndTime),(err)=>{
        if(err){
            console.log(err);
        }
        console.log("completed");
    })
    response.send(`<div style="background-color: #59504e;">
                       <h1 style="padding:10vh;color:#adaaaa">File name :
                        <span style="color:white">${timeStamp}.txt</span> </br> 
                        Date & Time :
                        <span style="color:white">${""+DateAndTime}</span> </br> 
                         Backup directory :
                        <span style="color:white">${backupPath}</span></h1>
                   </div>`);
                   });


app.listen(port,()=>console.log("server started at",port));
