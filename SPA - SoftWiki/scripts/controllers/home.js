import { getAllData } from "../data.js"

export async function getHome() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        noArticlesPartial: await this.load('../templates/articles/noArticlesPartial.hbs'),
        articleJsPartial: await this.load('../templates/articles/articleJsPartial.hbs'),
        articleCSharpPartial: await this.load('../templates/articles/articleCSharpPartial.hbs'),
        articleJavaPartial: await this.load('../templates/articles/articleJavaPartial.hbs'),
        articlePythonPartial: await this.load('../templates/articles/articlePythonPartial.hbs'),

    }
    if (this.app.userData.isLoggedIn) {
        const articles = await getAllData();
        const articlesJs = articles.filter(a => a.category.toLowerCase() === 'javascript');
        const articlesJava = articles.filter(a => a.category.toLowerCase() === 'java');
        const articlesCSharp = articles.filter(a => a.category.toLowerCase() === 'csharp');
        const articlesPython = articles.filter(a => a.category.toLowerCase() === 'python');


        if (articlesJs !== []) {
            this.app.userData.articlesJs = articlesJs;
        }
        if (articlesJava !== []) {
            this.app.userData.articlesJava = articlesJava;
        }
        if (articlesCSharp !== []) {
            this.app.userData.articlesCSharp = articlesCSharp;
        }
        if (articlesPython !== []) {
            this.app.userData.articlesPython = articlesPython;
        }

        const ctx = Object.assign(this.app.userData, localStorage)

        this.partial('../templates/home/home.hbs', ctx)

    } else {
        const ctx = Object.assign(this.app.userData, localStorage)

        this.partial('../templates/home/home.hbs', ctx)
    }

}

