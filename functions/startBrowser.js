const puppeteer=require('puppeteer');
const cookies=require("../cookie/cookies.json");
async function startBrowser()
{
	try
	{
		//lanuch the puppeteer 
		this.browser = await puppeteer.launch({ headless: false})
		this.page = await this.browser.newPage()
		//if cookies stored  in file use it else sigin to google account 

		//only for testing !
		if(Object.keys(cookies).length)
		{
			this.page.setCookie(...cookies);
			this.emit("openClass");
		}

		else
		{
			this.emit("siginGoogle");
		}

	}
	catch(error)
	{
		console.log("error is \n",error);
		this.emit("handleError",{msg:error.message});
	}
}

module.exports=startBrowser;