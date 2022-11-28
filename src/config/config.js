const config = {
    baseUrl: process.env.REACT_APP_BASEURL,
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD,
    grant_type: process.env.REACT_APP_GRANT_TYPE,
    auth: {
        username: process.env.REACT_APP_AUTH_USERNAME,
        password: process.env.REACT_APP_AUTH_PASSWORD
    }
}

export default config