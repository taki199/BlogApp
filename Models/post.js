const { json } = require('express');
const fs = require('fs');
const path = require('path');

const readUserData = (filePath) => {
    try {
        console.log('Reading file from path:', filePath);
        const data = fs.readFileSync(filePath, 'utf-8');
        console.log('Read data:', data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}
const readUser =(filePath)=>{
    try{
        const data=fs.readFileSync(filePath,'utf-8');
        return JSON.parse(data);

    }catch(error){
        console.log(error)
    }
}

const AddData = (userData, filePath) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
    } catch (error) {
        console.error('Error writing user data:', error);
    }
}

//AddData(userData, 'path/to/Blog.json');


module.exports = {readUserData,
AddData,
readUser};




// Check if userData is logged
// fs.readFile("../Blog.json", (err, data) => {
//     if (err) { 
//         console.log("Error Reading File:", err);
//     } else {
//         console.log(data.toString());
//     }
// });



     


