class Comments {
    author;
    avatarUrl;
    createAt;
    content;

    constructor(author, avatarUrl, createAt, content) {
        this.author = author;
        this.avatarUrl = avatarUrl;
        this.createAt = createAt;
        this.content = content;
    }


    setAuthor(author) {
        this.author = author;
    }

    getAuthor() {
        this.author;
    }

    setCreateAt(createAt) {
        this.createAt = createAt;
    }

    getCreateAt() {
        this.createAt;
    }


    setContent(content) {
        this.content = content;
    }

    getContent() {
        this.content;
    }
}