class AppError extends Error {
    constructor() {
        super();
    }

    create(appResponse, status) {
        this.appResponse = appResponse;
        this.status = status;
        return this;
    }
}

export default new AppError();
