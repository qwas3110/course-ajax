(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    // 使用Promise 监听 XHR，成功失败做出响应
    function get(url) {
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open('GET',url);
            req.setRequestHeader('Authorization', 'Client-ID 557354770f65429aaac1de0985053a29dad393d2d87dc9021e27fc339a24c1a1');
            req.onload = function () {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function () {
                reject(Error('Network Error'));
            };
            req.send();
        });
    }

    // 获取数据后，加入页面
    function addImage(data) {
        const firstImage = data.results[0];
        const htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by of ${firstImage.user.name}</figcaption>
        </figure>`;
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }


    const responseContainer = document.querySelector('#response-container');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = `https://api.unsplash.com/search/photos?query=${searchField.value}`;
        console.log(searchedForText);
        get(searchedForText)
            .then((data) => {
                return JSON.parse(data);
            })
            .then((url) => {
                addImage(url);
            })
            .catch((error) => {
                console.log(error);
                responseContainer.innerHTML = 'No Search';
            });

    });
})();
