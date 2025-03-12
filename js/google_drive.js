function fetchGoogleDriveFile(folder_id, file_name) {
    return new Promise(async resolve => {
        const url = `https://www.googleapis.com/drive/v3/files?q='${folder_id}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.files) {
                data.files.forEach(file => {
                    if (file.name == file_name) {
                        if (file.mimeType.startsWith('image/')) {
                            resolve(`https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`);
                        } else {
                            console.log('Unsupported file type: ', file.mimeType);
                            resolve(null);
                        }
                    }
                });
            } else {
                console.error("No files found.");
                resolve(null);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
            resolve(null);
        }
    })
}

async function fetchGoogleDriveImages(folder_id, dom_id) {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folder_id}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.files) {
            const container = document.getElementById(dom_id);
            data.files.forEach(file => {
                if (file.mimeType.startsWith('image/')) {
                    const imgUrl = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = file.name;
                    const div = document.createElement('div');
                    div.appendChild(img);
                    container.appendChild(div);
                }
            });
        } else {
            console.error("No files found.");
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

function loadPhotoGallery() {
    let folder_id = '1zSbU9BMo5zlS8GNjIEo3oAQHrdfpBZbk';
    let dom_id = 'photo-gallery'
    fetchGoogleDriveImages(folder_id, dom_id);
}

function loadPhoto(file_name, dom_id) {
    let folder_id = '1ZamP8zVV8LO_MdTLz0Kg0nJPh5aVXYST';
    fetchGoogleDriveFile(folder_id, file_name).then(url => {
        console.log(url)
        document.getElementById(dom_id).src = url;
    })
}