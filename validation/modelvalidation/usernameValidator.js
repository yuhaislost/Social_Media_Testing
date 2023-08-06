import validator from "validator";

const characterSet = new Set("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789._");

//Chekcs for usernames contianing only a-z or A-Z, 0-9, . and _
function validateUserName(username){
    /// underscores and periods cannot be the first character, and periods cannot be last character
    if (username[0] === '.' || username[0] === '_' || username[username.length - 1] === '.')
    {
        // False means validation failed
        return false;
    }

    for (let i = 0; i < username.length; i++)
    {
        if (!characterSet.has(username[i]))
        {
            return false;
        }
    }
    
    return true;
}

export default validateUserName;