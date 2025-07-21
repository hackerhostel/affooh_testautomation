const { get } = require("http");
const MailosaurClient = require("mailosaur");
const serverId = "temnjvgp"; 
const mailosaur = new MailosaurClient("SvVSgPbirXKsZnfSkUnRHYPEjDkdGtFu");

async function main() {
  const result = await mailosaur.servers.list();
  console.log(`Inbox name is ${result.items[0].name}`);
}

async function getInboxname(){
  console.log("Fetching inbox name...");
    const result = await mailosaur.servers.list();
      return result.items[0].name;
      console.log(`Inbox name is ${result.items[0].name}`);     
}
async function getEmail() {
  const result = await mailosaur.messages.list(serverId);
  const latestMessage = result.items[0];
  console.log(`Latest message ID: ${latestMessage.summary}`);
  return latestMessage;
}
async function getOtP(){
  const latestMessage = await getEmail();
  const email = latestMessage.summary;
  const regex = /(\d{6})/; // Assuming OTP is a 6-digit number
  const match = email.match(regex);
  if(match){
    const otp = parseInt(match[0], 10); // Convert string to integer
    console.log('hi mail' + otp);
    return otp;  
  }
  else {
    console.error('OTP not found in the email content');
    return null;
  }
}

async function waitForEmail(timeout = 60000) {
  const result = await mailosaur.messages.waitFor(serverId, { timeout });
  return result;
}

getEmail();
getOtP();
module.exports = {
  mailosaur,
  getInboxname,
  getEmail,
  getOtP,
};