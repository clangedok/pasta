function getRandomInt(max, seed) {
    if (!seed) seed = Math.random().toString();
    const myrng = new Math.seedrandom(seed);
    return Math.abs(myrng.int32()) % max;
}
/*
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
pics = 5;

console.log(getRandomInt(pics, today));
console.log(getRandomInt(pics, today));*/

document.addEventListener('DOMContentLoaded', (event) => {
    // url = window.location.pathname;
    const repoName = 'dotfiles';
    const userName = 'runarsf';
    const apiUrl = `https://api.github.com/repos/${userName}/${repoName}/contents`;
    url = '/dotfiles/.config/hypr/'
    url = url.replace(`/${repoName}`, '');
    const getPathParts = () => url.split('/').filter(Boolean);
    // const folder = getPathParts()[getPathParts().length - 1]
    // console.log(folder)

    const redirectToImage = async () => {
        const parts = getPathParts();

        try {
            const res = await fetch(`${apiUrl}/${parts[0]}`);
            const data = await res.json();
            const isFolder = data.filter(item => item.type === 'dir' && item.path === parts.join('/')).length > 0;
            // const images = data.filter(item => item.type === 'file');

            if (parts.length === 0 || parts[0].toLowerCase() === 'random') {
                console.log('random shit') 
            } else if (isFolder) {
                console.log("IT IS FOLDER " + parts)
            } else {
                console.log(parts + " is not a folder")  //when remove hypr from url
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    redirectToImage();
});
