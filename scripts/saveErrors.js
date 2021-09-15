// 
// 
// 
// 
// 


const sortErrors = (message) => {
  const output = {
    inputErrors : [],
    dbErrors : [],
    dbError : false
  }  
  const messages = message.split(',');
  messages.forEach(message => {
    if (message.includes("(input)")) {
      output.inputErrors.push(message.replace("Validation error: (input)",""));
    } else {
      output.dbErrors.push(message);
      output.dbError = true;
    }
  })
  console.log(output);
  return output;
}

module.exports.sortErrors = sortErrors;