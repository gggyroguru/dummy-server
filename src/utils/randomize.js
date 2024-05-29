const randomize = () => {
    let randomize = '';
    while (randomize.length < 10) {
        const random = Math.floor(Math.random() * 123);
        if ((random >= 48 && random <= 57) || (random >= 65 && random <= 90) || (random >= 97 && random <= 122)) {
            randomize += String.fromCharCode(random);
        }
    }
    return randomize;
}

export default randomize;