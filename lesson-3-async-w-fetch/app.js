(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText,articleText;
    const responseContainer = document.querySelector('#response-container');
    // 使用相片API数据中 第一张照片
    function addImage(data) {
        let htmlContent = '';
        const firstImage = data.results[0];

        if (firstImage) {
            htmlContent = `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
        } else {
            htmlContent = 'Unfortunately, no image was returned for your search.'
        }

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    // 将新闻放入列表
    function addArticl(data) {
        let htmlContent = '<ul>' + data.response.docs.map(b => `<li class="article">
            <h2><a href="${b.web_url}">${b.headline.main}</a></h2>
            <p>${b.snippet}</p>
        </li>`).join('') + '</ul>';
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }
    // 定义错误响应
    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        articleText = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchField.value}&api-key=s190ixVYfs7W8ddzklF90JndtEsKJiEt`;
        // 使用fetch 链接 相片API
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID 557354770f65429aaac1de0985053a29dad393d2d87dc9021e27fc339a24c1a1'
            }
        }).then(response => response.json())
            .then(addImage)
            .catch(event => requestError(event,'image'));
        // 使用fetch API 链接 纽约时报API
        fetch(articleText)
            .then(response => response.json())
            .then(addArticl)
            .catch(e => requestError(e,'article'));
    });
})();
