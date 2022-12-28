function generateCode(length) {
    const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "0123456789";
    let code = "";
    for (let i = 0; i < length - 1; i++) {
        code += character.charAt(Math.floor(Math.random() * character.length));
    }

    return `${code}${number.charAt(Math.floor(Math.random() * number.length))}`;
}

export default generateCode;
