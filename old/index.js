function getRandomInt(max, seed) {
    if (!seed) seed = Math.random().toString();
    const myrng = new Math.seedrandom(seed);
    return Math.abs(myrng.int32()) % max;
}

document.addEventListener('DOMContentLoaded', (event) => {

    // url = window.location.pathname;
    const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents`;
    // url = '/dotfiles/.config/hypr/'
    // url = url.replace(`/${repoName}`, '');
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

    // redirectToImage();
});
