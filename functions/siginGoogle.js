const fs=require('fs');
const {MAIL_ID,PASSWORD}=require("../config/config");

async function siginGoogle() {
   try
   {
	  await this.page.goto('https://accounts.google.com/',{waitUntil:'networkidle0'});
	  //const waitForNavigation= await this.page.waitForNavigation();
	  await this.page.type('input[type="email"]', MAIL_ID);
	  console.log("Email entered");
	  await this.page.click('#identifierNext');
	
	  //await waitForNavigation;
	  await this.page.waitForSelector('input[type="password"]',{visible:true});
	  //await this.page.waitForTimeout(1000);
	  
	  await this.page.type('input[type="password"]', PASSWORD);
	  console.log("password entered");
	  
	  //await this.page.waitForTimeout(1000);
	  await this.page.waitForSelector('#passwordNext',{visible:true});

	  await this.page.click('#passwordNext');
	  
	  //await waitForNavigation;
	  await this.page.waitForNavigation();
	  
	 // await this.page.waitForTimeout(10000);
	 //get the cookie and store it on file 

	 let cookies=await this.page.cookies();
	 fs.writeFileSync(__dirname+"/../cookie/cookies.json",JSON.stringify(cookies));
	 
	 //open the  class
	 this.emit("openClass");
	 
	}
	catch(error)
	{
		console.log("error is \n",error);
		this.emit("handleError",{msg:error.message});
	}
}

module.exports=siginGoogle;