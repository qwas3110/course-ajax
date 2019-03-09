(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText,
        articleText;
    // 使用Promise 创建XHR
    function get(url) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', url);
            req.onload = () => {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = () => {
                reject(Error('Network Error'));
            };
            req.send();
        });
    }
    // 将新闻放入列表
    function addArticl(data) {
        let htmlContent = '<ul>' + data.response.docs.map(b => `<li class="article">
            <h2><a href="${b.web_url}">${b.headline.main}</a></h2>
            <p>${b.snippet}</p>
        </li>`).join('') + '</ul>';
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }
    // 页面事件
    const responseContainer = document.querySelector('#response-container');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = `https://api.unsplash.com/search/photos?query=${searchField.value}&client_id=557354770f65429aaac1de0985053a29dad393d2d87dc9021e27fc339a24c1a1`;
        articleText = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchField.value}&api-key=s190ixVYfs7W8ddzklF90JndtEsKJiEt`;
        // 相片API
        get(searchedForText)
            .then((data) => JSON.parse(data))
            .then((url) => {
                const image = url.results[0];
                let html = `<figure>
                    <img src="${image.urls.regular}" alt="the author is ${image.user.name}">
                    <figcaption>Image author is ${image.user.name}</figcaption>
                </figure>`;
                responseContainer.insertAdjacentHTML('afterbegin', html);
            })
            .catch((error) => {
                console.log(error);
                let html = `<h1>No search!</h1>`;
                responseContainer.insertAdjacentHTML('afterbegin', html);
            });
        // 纽约新闻API
        get(articleText)
            .then((data) => JSON.parse(data))
            .then(addArticl)
            .catch((error) => {
                console.log(error);
                let html = `<h1>No search!</h1>`;
                responseContainer.insertAdjacentHTML('beforeend', html);
            });
    });
})();
