/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    function addImage(images) {
        const firstImage = images.results[0];

        responseContainer.insertAdjacentHTML('afterbegin', `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`
        );
    }

    // 将新闻放入列表
    function addArticl(data) {
        let htmlContent = '<ul>' + data.response.docs.map(b => `<li class="article">
            <h2><a href="${b.web_url}">${b.headline.main}</a></h2>
            <p>${b.snippet}</p>
        </li>`).join('') + '</ul>';
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        // 调用相片API
        $.ajax({
            url: `https://api.unsplash.com/search/photos?query=${searchField.value}&client_id=557354770f65429aaac1de0985053a29dad393d2d87dc9021e27fc339a24c1a1`
        }).done(addImage);
        // 调用纽约时报API
        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchField.value}&api-key=s190ixVYfs7W8ddzklF90JndtEsKJiEt`
        }).done(addArticl);
    });
})();
